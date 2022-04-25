import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from '../../../../components';
import dropDownData from './dropDownData';

import formatting from '../../../../assets/aim/formatting.png';
import warn from '../../../../assets/aim/warn.png';
import block from '../../../../assets/aim/block.png';
import add_buddy from '../../../../assets/aim/add_buddy.png';
import talk from '../../../../assets/aim/talk.png';
import get_info from '../../../../assets/aim/get_info.png';
import send_disabled from '../../../../assets/aim/send_disabled.png';
import send_enabled from '../../../../assets/aim/send_enabled.png';

function Chat({ onClose, isFocus, sidebarElement, channel }) {
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
      if (sendBtn) {
        setTimeout(() => {
          sendBtn.click();
          setDraft('');
        }, 500);
      }
    }
  }

  function processListItem(element) {
    if (element.classList && element.classList.contains('c-virtual_list__item')) {
      const gutterRight = element.querySelector('.c-message_kit__gutter__right');
      if (gutterRight) {
        gutterRight.innerHTML = gutterRight.innerHTML.replace(/\&nbsp;/g, '');
      }
      if (gutterRight && !element.querySelector('.c-message_kit__sender')) {
        let cur = element;
        while (cur && !cur.querySelector('.c-message_kit__sender')) {
          cur = cur.previousElementSibling;
        }
        if (cur && cur.querySelector('.c-message_kit__sender')) {
          gutterRight.prepend(cur.querySelector('.c-message_kit__sender').cloneNode(true));
        }
      }
      if (gutterRight && element.querySelector('.c-message_kit__sender')) {
        if (element.querySelector('.c-message_kit__sender').getAttribute('data-stringify-text') === username) {
          element.querySelector('.c-message_kit__sender').style.color = 'red';
        } else {
          element.querySelector('.c-message_kit__sender').style.color = 'blue';
        }
      }
    }
  }

  useEffect(() => {
    if (isFocus) {
      setTimeout(() => {
        if (sidebarElement.className.includes('close_container')) {
          sidebarElement.firstChild.click();
        } else {
          sidebarElement.click();
        }

        const list = sidebarListRef.current;
        let body = document.querySelector('.p-workspace__primary_view_body');
        if (document.querySelector('#winxp-message-list')) {
          body = document.querySelector('#winxp-message-list');
        } else {
          body.id = 'winxp-message-list';
          body.addEventListener("DOMNodeInserted", (e) => {
            processListItem(e.target);
          }, true);
        }
        if (list && body) {
          body.querySelectorAll('.c-virtual_list__item').forEach(e => {
            processListItem(e);
          });
          while (list.childElementCount) {
            list.removeChild(list.lastChild);
          }
          list.appendChild(body);
        }
      }, 100);
    } else {
      const list = sidebarListRef.current;
      const body = list.querySelector('.p-workspace__primary_view_body');
      const scrollTop = body.querySelector('.c-scrollbar__hider').scrollTop;
      document.querySelector('.p-client_container').appendChild(body);
      const clone = document.querySelector('#winxp-message-list').cloneNode(true);
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
  }, [isFocus, sidebarElement, username]);

  useEffect(() => {
    const list = sidebarListRef.current;
    return () => {
      if (list.querySelector('.p-workspace__primary_view_body')) {
        const body = list.querySelector('.p-workspace__primary_view_body');
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
    <Div>
      <section className="com__toolbar">
        <div className="com__options">
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
          />
          <div className="com__warning-level">
            {`${channel}'s Warning Level: 0%`}
          </div>
        </div>
      </section>
      <section className="com__content">
        <div className="com__message-list" ref={sidebarListRef}></div>
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
            <img className="com__actions__img" src={add_buddy} alt="" />
            <img className="com__actions__img" src={talk} alt="" />
            <img className="com__actions__img" src={get_info} alt="" />
          </div>
          <div className="com__actions__right">
            <img className="com__actions__img--send" src={draft ? send_enabled : send_disabled} alt="" />
          </div>
        </div>
      </section>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: visible;
  flex-direction: column;
  background: #ece9d8;
  .drop-down__text span:nth-child(1) {
    display: inline-block;
    width: 25px;
  }
  .drop-down__text span:nth-child(2) {
    display: inline-block;
    width: 50px;
  }
  .drop-down__text span:nth-child(3) {
    padding-right: 30px;
  }
  .drop-down__row:hover > .drop-down__text span:nth-child(1) {
    filter: invert(100%);
    background: #1660e8; 
  }
  .com__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .com__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 23px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1px 0 1px 2px;
    border-left: 0;
    flex: 1;
  }
  .com__warning-level {
    font-family: 'MS Sans Serif';
    font-size: 12px;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  .com__content {
    font-size: 11px;
    font-family: Times New Roman;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .com__message-list {
    border-left: 1.5px solid #444;
    border-top: 1.5px solid #444;
    border-right: 1px solid #e4dec0;
    border-bottom: 1px solid #e4dec0;
    box-shadow: -0.5px -0.5px 0 0.5px #aaa, 1px 1px 0 0.5px #fff;
    background-color: #fff;
    flex-grow: 1;
    min-height: 90px;
    margin: 5px 5px;
    flex-direction: column;
    font-size: 14px;
    display: flex;
    padding-left: 3px;
  }
  .com__message-list__container {
    flex-shrink: 0;
  }
  .com__message-list__message {
  }
  .com__message-list__message__from--blue {
    color: blue;
    font-weight: bold;
    margin-right: 5px;
    display: inline;
  }
  .com__message-list__message__from--red {
    color: red;
    font-weight: bold;
    margin-right: 5px;
    display: inline;
  }
  .com__message-list__message__text {
    display: inline;
  }
  .com__message-list__message__text .c-mrkdwn__code {
    font-size: 11px;
  }
  .com__message-pane {
    flex-grow: 0;
    margin: 2px 5px 3px;
    display: inline-flex;
  }
  .com__formatting {
    border: 1px solid #bbb7a8;
    padding: 1px;
    text-align: center;
    margin: 1px 4px 1px;
    height: 20px;
  }
  .com__formatting__image {
    height: 17px;
  }
  .com__message-pane__input {
    background-color: #fff;
    padding: 3px;
    outline: none;
    resize: none;
    height: 70px;
    width: 100%;
    font-size: 15px;
    border-left: 1.5px solid #444;
    border-top: 1.5px solid #444;
    border-right: 1px solid #e4dec0;
    border-bottom: 1px solid #e4dec0;
    box-shadow: -0.5px -0.5px 0 0.5px #aaa, 1px 1px 0 0.5px #fff;
  }
  .com__typing {
    margin: 0 5px;
    font-family: 'MS Sans Serif';
    font-size: 11px;
    height: 16px;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  .com__actions {
    border-left: 1px solid white;
    border-top: 1px solid white;
    box-shadow: 0 0 0 1.5px #bbb7a8;
    height: 60px;
    margin: 2px 5px 5px;
    flex-grow: 0;
    display: flex;
    align-items: center;
  }
  .com__actions__img {
    height: 38px;
  }
  .com__actions__img--send {
    height: 54px;
  }
  .com__actions__left {
    height: 100%;
    display: flex;
    justify-content: space-between;
    width: 90px;
    padding: 0 8px;
    flex-grow: 0;
    align-items: center;
    border-right: 1px solid #bbb7a8;
    box-shadow: 1px 0 0 0.25px white;
  }
  .com__actions__middle {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 6% 0 12%;
    flex-grow: 1;
    align-items: center;
    border-right: 1px solid #bbb7a8;
    box-shadow: 1px 0 0 0.25px white;
  }
  .com__actions__middle img {
    padding: 0 8px;
  }
  .com__actions__right {
    height: 100%;
    display: flex;
    width: 62.5px;
    flex-grow: 0;
    align-items: center;
    justify-content: center;
  }

  .com__message-list #unreadDivider {
    display: none;
  }
  .com__message-list .c-virtual_list__sticky_container {
    display: none;
  }
  .com__message-list .c-virtual_list__item[role="presentation"] {
    display: none;
  }
  .com__message-list .c-virtual_list__item[aria-roledescription="separator"] {
    display: none;
  }
  .com__message-list .c-virtual_list__item:last-of-type {
    padding-bottom: 4px;
  }
  .com__message-list .c-message_kit__gutter {
    padding: 0;
  }
  .com__message-list .c-message_kit__gutter__left {
    display: none;
  }
  .com__message-list .c-timestamp {
    display: none;
  }
  .com__message-list .c-message_kit__attachments {
    display: none;
  }
  .com__message-list .c-message__actions {
    display: none;
  }
  .com__message-list .c-message_kit__background--hovered {
    background-color: white;
  }
  .com__message-list .c-message_kit__message {
    margin-bottom: 0 !important;
  }
  .com__message-list .c-message_kit__gutter__right {
    display: inline-block;
    padding: 0;
    margin: 0;
    line-height: 18px;
  }
  .com__message-list .c-message__sender_link {
    pointer-events: none;
  }
  .com__message-list .c-message_kit__sender {
    white-space: nowrap;
    margin-right: 5px;
  }
  .com__message-list .c-message_kit__sender a {
    color: inherit;
  }
  .com__message-list .c-message_kit__sender::after {
    content: ':';
  }
  .com__message-list .c-virtual_list__item {
    padding-bottom: 2px;
  }
  .com__message-list .c-message_kit__blocks--rich_text {
    display: inline;
    margin-bottom: 0;
  }
  .com__message-list .c-message_kit__blocks--rich_text * {
    display: inline;
  }
  .com__message-list .c-message_kit__text:after {
    height: 0;
  }
  .com__message-list .c-message_kit__gutter__right > br {
    display: none;
  }
  .com__message-list .p-message_pane__top_banners {
    display: none;
  }
  .com__message-list .c-message__edited_label {
    margin-left: 4px;
    font-size: 14px;
  }
  .com__message-list .c-message_kit__text .c-emoji__large {
    width: 16px;
    height: 16px;
    margin-top: 0;
  }
  .com__message-list .c-mrkdwn__pre {
    font-size: 10px;
    display: block;
  }
  .com__message-list .p-rich_text_block {
    line-height: 16px;
  }
  .com__message-list .c-message_kit__reaction_bar {
    display: none;
  }
  .com__message-list .c-message_kit__thread_replies {
    display: none;
  }
  .com__message-list .p-rich_text_section {
    display: inline;
  }
  .com__message-list .c-custom_status {
    display: none;
  }
  .com__message-list .c-files_container {
    display: none;
  }
  .com__message-list .p-image_block {
    display: none;
  }
  .com__message-list .p-context_block {
    display: none;
  }
  .com__message-list .c-member_slug--link {
    background: none;
  }
  .com__message-list .p-block_kit_renderer__block_wrapper > :not(.p-rich_text_block) {
    display: none;
  }
  .com__message-list .c-scrollbar__track {
    display: none;
  }
  .com__message-list .c-scrollbar__hider {
    right: 0;
  }
  .com__message-list .c-scrollbar__hider::before {
    top: unset !important;
  }
  .com__message-list .p-message_pane--classic-nav {
    top: 0;
  }
`;

export default Chat;
