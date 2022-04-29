import React, { useState, useRef, useEffect } from 'react';

import { WindowDropDowns } from '../../../components';
import dropDownData from './dropDownData';

import formatting from '../../../assets/aim/chat/formatting.png';
import warn from '../../../assets/aim/chat/warn.png';
import block from '../../../assets/aim/chat/block.png';
import addBuddy from '../../../assets/aim/chat/add-buddy.png';
import talk from '../../../assets/aim/chat/talk.png';
import getInfo from '../../../assets/aim/chat/get-info.png';
import sendDisabled from '../../../assets/aim/chat/send-disabled.png';
import sendEnabled from '../../../assets/aim/chat/send-enabled.png';
import './index.css';

function Chat({ onClose, isFocus, newChat, newMessage, channelName, sidebarChannel, sidebarGroup }) {
  useEffect(() => {
    if (newChat) {
      new Audio(chrome.runtime.getURL("WinXP/assets/audioring.wav")).play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (newMessage) {
      new Audio(chrome.runtime.getURL("WinXP/assets/audioimrcv.wav")).play().catch(() => {});
    }
  }, [newMessage]);

  const sidebarListRef = useRef();
  const [draft, setDraft] = useState('');

  const profileEl = document.querySelector('.p-ia__nav__user__button');
  const username = profileEl && profileEl.getAttribute('aria-label').replace('User menu: ', '');

  const typingHint = document.querySelector('.p-notification_bar__section--left')
    ? document.querySelector('.p-notification_bar__section--left').textContent
    : '';

  function sendDraft() {
    const editor = document.querySelector('.ql-editor p');
    if (editor) {
      editor.innerHTML = draft;
      const sendBtn = document.querySelector('.c-icon_button[data-qa="texty_send_button"]');
      if (sendBtn && sendBtn.getAttribute('aria-disabled') !== 'true') {
        setTimeout(() => {
          sendBtn.click();
          new Audio(chrome.runtime.getURL("WinXP/assets/audioimsend.wav")).play().catch(() => {});
          setDraft('');
        }, 500);
      }
    }
  }

  function processListItem(element, inserted) {
    if (element.classList && element.classList.contains('c-virtual_list__item')) {
      // open files in a new tab
      if (element.querySelector('.p-file_image_thumbnail__wrapper')) {
        const thumbnailLinks = element.querySelectorAll('.p-file_image_thumbnail__wrapper');
        Array.from(thumbnailLinks).forEach(a => a.setAttribute('target', '_blank'));
      }
      // remove non-breaking spaces
      const gutterRight = element.querySelector('.c-message_kit__gutter__right');
      if (gutterRight) {
        gutterRight.innerHTML = gutterRight.innerHTML.replace(/\&nbsp;/g, '');
      }
      // look for sender in previous messages
      if (gutterRight && !element.querySelector('.c-message_kit__sender')) {
        let cur = element;
        while (cur && !cur.querySelector('.c-message_kit__sender')) {
          cur = cur.previousSibling;
        }
        if (cur && cur.querySelector('.c-message_kit__sender')) {
          gutterRight.prepend(cur.querySelector('.c-message_kit__sender').cloneNode(true));
        }
      }
      if (gutterRight && element.querySelector('.c-message_kit__sender')) {
        // add colon next to sender
        if (!element.querySelector('.c-message_kit__sender .colon')) {
          const colon = document.createElement('span');
          colon.className = 'colon';
          colon.textContent = ': ';
          element.querySelector('.c-message_kit__sender').append(colon);
        }
        // set color of the sender
        // then play a sound if this element was inserted as the last sibling
        if (element.querySelector('.c-message_kit__sender').getAttribute('data-stringify-text') === username) {
          element.querySelector('.c-message_kit__sender').style.color = 'red';
        } else {
          element.querySelector('.c-message_kit__sender').style.color = 'blue';
          const timestampElement = element.querySelector('.c-timestamp');
          const timestamp = timestampElement ? Number(timestampElement.getAttribute('data-ts')) * 1000 : 0;
          const isNew = Math.abs(timestamp - Date.now()) < 1000;
          if (inserted && !element.nextSibling && isNew) {
            new Audio(chrome.runtime.getURL("WinXP/assets/audioimrcv.wav")).play().catch(() => {});
          }
        }
        // if the next element does not have a sender, its because we could not find it earlier
        // but now we know that it is this person
        let cur = element.nextSibling;
        while (cur && cur.querySelector('.c-message_kit__gutter__right') && !cur.querySelector('.c-message_kit__sender')) {
          cur.querySelector('.c-message_kit__gutter__right').prepend(element.querySelector('.c-message_kit__sender').cloneNode(true));
          cur = cur.nextSibling;
        }
      }
    }
  }

  useEffect(() => {
    if (isFocus) {
      setTimeout(() => {
        // CLICK ON THE CHANNEL
        // IF IT'S NOT VISIBLE THEN EXPAND THE GROUP, CLICK IT, AND COLLAPSE THE GROUP
        if (sidebarGroup.getAttribute('aria-expanded') === 'true') {
          sidebarChannel.querySelector('.p-channel_sidebar__channel').click();
        } else {
          const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
              if (mutation.addedNodes?.[0]?.classList?.contains('p-channel_sidebar__static_list__item')) {
                const channel = mutation.addedNodes[0].querySelector('.p-channel_sidebar__name');
                if (channel.textContent === channelName) {
                  mutation.addedNodes[0].querySelector('.p-channel_sidebar__channel').click();
                  break;
                }
              }
            }
            sidebarGroup.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
            observer.disconnect();
          }

          const groupUnreadsObserver = new MutationObserver(callback);

          const sidebarList = document.querySelector('.c-virtual_list__scroll_container');
          groupUnreadsObserver.observe(sidebarList, {
            childList: true,
            subtree: true,
          });

          window.aimForSlack.ignoreNextExpansion[sidebarGroup.id] = true;
          sidebarGroup.querySelector('.p-channel_sidebar__section_heading_label_overflow').click();
        }

        const list = sidebarListRef.current;
        let body = document.querySelector('.p-workspace__primary_view_body');
        if (document.querySelector('#aim-message-list')) {
          body = document.querySelector('#aim-message-list');
        } else {
          body.id = 'aim-message-list';

          const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
              if (mutation.addedNodes?.[0]?.classList?.contains('c-virtual_list__item')) {
                processListItem(mutation.addedNodes?.[0], true);
              }
            }
          }

          const messageObserver = new MutationObserver(callback);
          
          const messageList = body.querySelector('.c-virtual_list__scroll_container');
          messageObserver.observe(messageList, { childList: true });
        }
        if (list && body) {
          body.querySelectorAll('.c-virtual_list__item').forEach(e => {
            processListItem(e);
          });
          if (list.childElementCount > 1) {
            list.removeChild(list.firstChild);
          }
          list.appendChild(body);
          if (list.childElementCount === 1) {
            // I don't think this is working...
            list.querySelector('.c-scrollbar__hider').scrollTo(0, 999999);
          }
        }
      }, 100);
    } else {
      const list = sidebarListRef.current;
      const body = list.querySelector('#aim-message-list');
      const scrollTop = body.querySelector('.c-scrollbar__hider').scrollTop;
      document.querySelector('.p-client_container').appendChild(body);
      const clone = document.querySelector('#aim-message-list').cloneNode(true);
      clone.id = '';
      Array.from(clone.querySelectorAll('*')).forEach(e => {
        for (let i = 0; i < e.attributes.length; i++) {
          if (e.attributes[i].name !== 'class' && e.attributes[i].name !== 'style' && e.attributes[i].name !== 'src') {
            e.removeAttributeNode(e.attributes[i]);
          }
        }
      });
      list.appendChild(clone);
      clone.querySelector('.c-scrollbar__hider').scrollTo(0, scrollTop);
      clone.style['pointer-events'] = 'none';
    }
  }, [isFocus]);

  useEffect(() => {
    const list = sidebarListRef.current;
    return () => {
      if (list.querySelector('#aim-message-list')) {
        const body = list.querySelector('#aim-message-list');
        document.querySelector('.p-client_container').appendChild(body);
      }
    }
  }, [])

  function onClickOptionItem(item) {
    switch (item) {
      case 'Close':
        onClose();
        break;
      default:
    }
  }

  return (
    <div className="com__aim-chat">
      <section className="com__toolbar">
        <div className="com__options">
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
          />
          <div className="com__warning-level">
            <div className="com__warning-level__channel">{channelName}</div>
            's Warning Level: 0%
          </div>
        </div>
      </section>
      <section className="com__content">
        <div className="com__message-list" ref={sidebarListRef}>
          {/* <Placeholder /> */}
        </div>
        <div className="com__formatting">
          <img className="com__formatting__image" src={formatting} alt="" />
        </div>
        <div className="com__message-pane">
          <textarea
            className="com__message-pane__input"
            name="aim-message"
            id="aim-message"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendDraft();
              }
            }}
          />
        </div>
        <div className="com__typing">
          {typingHint}
        </div>
        <div className="com__actions">
          <div className="com__actions__left">
            <img className="com__actions__img" src={warn} alt="" />
            <img className="com__actions__img" src={block} alt="" />
          </div>
          <div className="com__actions__middle">
            <img className="com__actions__img" src={addBuddy} alt="" />
            <img className="com__actions__img" src={talk} alt="" />
            <img className="com__actions__img" src={getInfo} alt="" />
          </div>
          <div className="com__actions__right">
            <img className="com__actions__img--send" src={draft ? sendEnabled : sendDisabled} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Chat;
