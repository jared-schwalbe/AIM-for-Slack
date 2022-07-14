import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { appSettings } from '../../';
import { ADD_APP } from '../../../constants/actions';
import { WindowDropDowns } from '../../../components'
import { getHiddenCounts } from './utils';
import dropDownData from './dropDownData';

import banner from '../../../assets/aim/buddy-list/banner.png';
import options from '../../../assets/aim/buddy-list/options.png';
import background from '../../../assets/aim/buddy-list/background.png';
import actionsTop from '../../../assets/aim/buddy-list/actions-top.png';
import actionsBottom from '../../../assets/aim/buddy-list/actions-bottom.png';
import doorOpen from '../../../assets/aim/buddy-list/door-open.png';
import away from '../../../assets/aim/buddy-list/away.png';
import ticker from '../../../assets/aim/buddy-list/ticker.png';
import pointer from '../../../assets/cursor/pointer.png';

function BuddyList({ onClose, isFocus, dispatch }) {
  const counts = useRef({});
  const [groups, setGroups] = useState([]);

  function getGroupCount(group) {
    if (group.expanded) {
      return `(${group.children.length}/${group.children.length})`;
    } else if (counts.current[group.id]) {
      return `(${counts.current[group.id]}/${counts.current[group.id]})`;
    } else {
      return '(0/0)';
    }
  }

  function getChannelName(item) {
    const nameEl = item.querySelector('.p-channel_sidebar__name');
    const labelEl = nameEl.querySelector('.p-channel_sidebar__member_label');
    return nameEl?.textContent?.replace(labelEl?.textContent, ` (${labelEl?.textContent})`) ?? '';
  }

  function getGroups() {
    const groups = [];
    const items = document.getElementsByClassName('p-channel_sidebar__static_list__item');
    Array.from(items).forEach(item => {
      if (item.id && item.id.includes('sectionHeading')) {
        groups.push({
          id: item.id,
          sidebarGroup: item,
          element: item.querySelector('.p-channel_sidebar__section_heading_label_overflow'),
          title: item.getAttribute('aria-label'),
          expanded: item.getAttribute('aria-expanded') === 'true',
          children: [],
        });
      } else if (item.querySelector('.p-channel_sidebar__channel')) {
        groups[groups.length - 1].children.push({
          element: item.querySelector('.p-channel_sidebar__channel'),
          sidebarChannel: item,
          sidebarGroup: groups[groups.length - 1].sidebarGroup,
          name: getChannelName(item),
        });
      }
    });
    groups.forEach(g => {
      if (g.expanded) {
        counts.current[g.id] = g.children.length;
      }
    });
    setGroups(groups);
  }

  useEffect(() => {
    const updateCount = (groupId, count) => {
      counts.current[groupId] = count;
    };
  
    getGroups();
    getHiddenCounts(updateCount);

    const callback = function (mutationsList, observer) {
      let groupsModified = false;
      const allowExpansion = ![...mutationsList]
        .filter(m => m.type === 'attributes')
        .every(m => window.aimForSlack.ignoreNextExpansion[m.target.id]);
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes'
          && mutation.target.getAttribute('aria-expanded') === 'false'
          && window.aimForSlack.ignoreNextExpansion[mutation.target.id]) {
          delete window.aimForSlack.ignoreNextExpansion[mutation.target.id];
        }
        if (
          mutation.type === 'childList'
          && allowExpansion
          && (
            mutation.addedNodes?.[0]?.classList?.contains('p-channel_sidebar__static_list__item')
            || mutation.removedNodes?.[0]?.classList?.contains('p-channel_sidebar__static_list__item')
          )
        ) {
          groupsModified = true;
        }
      }
      if (groupsModified) {
        getGroups();
      }
    }

    const rebuildGroupsObserver = new MutationObserver(callback);

    const sidebarList = document.querySelector('.c-virtual_list__scroll_container');
    rebuildGroupsObserver.observe(sidebarList, {
      attributes: true,
      attributeFilter: ['aria-expanded'],
      childList: true,
      subtree: true,
    });

    return () => {
      rebuildGroupsObserver.disconnect();
    }
  }, []);

  const [active, setActive] = useState();

  const profileEl = document.querySelector('.p-ia__nav__user__button');
  const username = profileEl && profileEl.getAttribute('aria-label').replace('User menu: ', '');

  const openChat = c => dispatch({
    type: ADD_APP,
    payload: {
      ...appSettings.AIMChat,
      header: {
        ...appSettings.AIMChat.header,
        title: `${c.name} - Instant Message`,
      },
      props: {
        channelName: c.name,
        sidebarChannel: c.sidebarChannel,
        sidebarGroup: c.sidebarGroup,
      }
    },
  });

  function onClickOptionItem(item) {
    switch (item) {
      case 'Sign Off':
        new Audio(chrome.runtime.getURL("WinXP/assets/audio/doorslam.wav")).play().catch(() => {});
        window.aimForSlack.signedIn = false;
        onClose();
        break;
      case 'Report a Bug':
        window.open('https://github.com/jared-schwalbe/AIM-for-Slack/issues/new?assignees=&labels=bug&template=bug_report.md&title=', '_blank');
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
        </div>
      </section>
      <section className="com__header">
        <div className="com__banner">
          <a href="https://www.aol.com/" target="_blank" rel="noreferrer">
            <img className="com__banner__image" src={banner} alt="" />
          </a>
        </div>
        <div className="com__title">
          <div className="com__title__name">{`${username}'s Buddy List:`}</div>
          <div className="com__title__options">
            <img className="com__title__options__image" src={options} alt="" />
          </div>
        </div>
      </section>
      <div className="com__buddy-list">
        {groups.map(g => {
          let titleClass = '';
          if (active === g.title) {
            titleClass = 'com__buddy-list__active';
            if (isFocus) {
              titleClass = 'com__buddy-list__active--focus';
            }
          }
          return (
            <div className="com__buddy-list__group" key={g.title}>
              <div className={`com__buddy-list__group__title--${g.expanded ? 'expanded' : 'collapsed'}`}>
                <button
                  className="com__buddy-list__group__expand"
                  onClick={e => setActive(g.title)}
                  onDoubleClick={() => g.element.click()}
                >
                  <div className={`com__buddy-list__group__expand__icon--${g.expanded ? 'expanded' : 'collapsed'}`} />
                  <span className={titleClass}>
                    {`${g.title} ${getGroupCount(g)}`}
                  </span>
                </button>
              </div>
              <div className="com__buddy-list__group__items">
                {g.expanded && g.children.map(c => {
                  const online = c.element.querySelector('.c-presence--active');
                  const muted = c.element.classList.contains('p-channel_sidebar__channel--muted');
                  const unread = c.element.classList.contains('p-channel_sidebar__channel--unread');
                  let itemClass = '';
                  if (active === c.name) {
                    itemClass = 'com__buddy-list__active';
                    if (isFocus) {
                      itemClass = 'com__buddy-list__active--focus';
                    }
                  }
                  if (online) {
                    itemClass += itemClass ? ' online' : 'online';
                  }
                  if (muted) {
                    itemClass += itemClass ? ' muted' : 'muted';
                  }
                  if (unread) {
                    itemClass += itemClass ? ' unread' : 'unread';
                  }
                  return (
                    <button
                      key={c.name}
                      className="com__buddy-list__group__item"
                      onClick={e => setActive(c.name)}
                      onDoubleClick={() => {
                        openChat(c);
                      }}
                    >
                      <span>
                        <span className={itemClass}>
                          {online && <img src={doorOpen} alt="online" />}
                          {unread && !online && <img src={away} alt="unread" />}
                          {c.name}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="com__actions">
        <div className="com__actions__top">
          <img className="com__actions__top__img" src={actionsTop} alt="" />
        </div>
        <div className="com__actions__bottom">
          <img className="com__actions__bottom__img" src={actionsBottom} alt="" />
        </div>
      </div>
      <div className="com__ticker">
        <div className="com__ticker__top">
          <img className="com__ticker__icon" src={ticker} alt="" />
          <div className="com__ticker__container">
            <div className="com__ticker__wrapper">
              <div className="com__ticker__transition">
                <div className="com__ticker__text">
                  Unable to load ticker information. The ticker cannot recieve data if your internet connection uses a proxy server.
                </div>
                <div className="com__ticker__text">
                  Unable to load ticker information. The ticker cannot recieve data if your internet connection uses a proxy server.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="com__ticker__bottom">
          Prices delayed at least 15 min.
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  overflow: visible;
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
    height: 23px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1px 0 1px 2px;
    border-left: 0;
    flex: 1;
  }
  .com__banner {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fbfeea;
    width: 100%;
  }
  .com__banner a {
    cursor: url(${pointer}) 11 11, pointer;
  }
  .com__banner__image {
    margin-top: 4px;
    margin-bottom: 1px;
  }
  .com__title {
    display: flex;
    justify-content: space-between;
  }
  .com__title__name {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
    font-family: 'MS Sans Serif';
    font-size: 11px;
    align-items: center;
    flex-grow: 1;
    background: #ece9d8;
    border: 1px inset #fff;
    padding: 1px;
    margin: 0 0 1px 1px;
  }
  .com__title__options {
    height: 18px;
    margin: 0 1px 2px 4px;
  }
  .com__title__options__image {
    height: 18px;
  }
  .com__buddy-list {
    flex: 1;
    font-family: 'MS Sans Serif';
    -webkit-font-smoothing: subpixel-antialiased;
    border: 2px inset #b5b3a9;
    border-right: 1px inset #ddd;
    border-bottom: 1px inset #eee;
    font-family: 'MS Sans Serif';
    font-size: 11px;
    padding-left: 2px;
    padding-bottom: 2px;
    padding-top: 1px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff url(${background}) no-repeat 50% 25%;
  }
  .com__buddy-list__active {
    background: yellow;
  }
  .com__buddy-list__active--focus {
    background: yellow;
    border: 1px dotted black !important;
  }
  .com__buddy-list__group {
    margin-bottom: 1px;
  }
  .com__buddy-list__group__expand {
    all: unset;
    display: flex;
    align-items: center;
  }
  .com__buddy-list__group__expand > span {
    border: 1px dotted transparent;
    padding-right: 1px;
    padding-left: 1px;
    display: inline-block;
    white-space: nowrap;
  }
  .com__buddy-list__group__expand__icon {
    height: 5px;
    margin-right: 4px;
  }
  .com__buddy-list__group__expand__icon {
  }
  .com__buddy-list__group__expand__icon--expanded {
    width: 0;
    height: 0;
    margin-right: 4px;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #000 transparent transparent transparent;
  }
  .com__buddy-list__group__expand__icon--collapsed {
    width: 0;
    height: 0;
    margin-left: 4px;
    margin-right: 4px;
    border-style: solid;
    border-width: 4px 0 4px 4px;
    border-color: transparent transparent transparent #000;
  }
  .com__buddy-list__group__title--expanded {
    font-family: 'MS Sans Serif Bold';
  }
  .com__buddy-list__group__title--collapsed {
    font-family: 'MS Sans Serif';
    filter: none;
  }
  .com__buddy-list__group__items {
    display: flex;
    flex-direction: column;
  }
  .com__buddy-list__group__item {
    all: unset;
    margin-left: 10px;
    margin-bottom: 1px;
    height: 17px;
    width: calc(100%);
  }
  .com__buddy-list__group__item > span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(100% - 10px);
    height: 16px;
    display: inline-block;
  }
  .com__buddy-list__group__item > span > span.muted {
    color: #8a8a8a;
  }
  .com__buddy-list__group__item > span > span.unread img {
    height: 13px;
    padding-right: 6px;
    padding-bottom: 1px;
  }
  .com__buddy-list__group__item > span > span.online img {
    height: 13px;
    padding-right: 6px;
    padding-bottom: 1px;
  }
  .com__buddy-list__group__item > span > span:not(.unread):not(.online) {
    padding-left: 20px;
  }
  .com__buddy-list__group__item > span > span {
    align-items: center;
    border: 1px dotted transparent;
    display: flex;
    height: 13px;
    padding-right: 1px;
    padding-top: 1px;
  }
  .com__actions__top {
    text-align: center;
    padding: 3px 4px 0 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid #a4a39a;
    border-left: 1px solid #a4a39a;
  }
  .com__actions__top__img {
    height: 40px;
  }
  .com__actions__bottom {
    text-align: center;
    background: #fffbf0;
    padding: 3px 4px 0 4px;
    border-bottom: 1px solid #b3b2a8
  }
  .com__actions__bottom__img {
    height: 38px;
  }
  .com__ticker {
    font-family: 'MS Sans Serif';
    -webkit-font-smoothing: subpixel-antialiased;
    font-size: 11px;
    margin-bottom: 2px;
  }
  .com__ticker__top {
    display: flex;
    align-items: center;
  }
  .com__ticker__icon {
    height: 16px;
    margin: 2px;
  }
  .com__ticker__bottom {
    margin-left: 2px;
  }
  .com__ticker__container {
    width: 100%;
    overflow: hidden;
  }
  .com__ticker__wrapper {
    width: 100%;
    background-color: transparent;
  }
  @keyframes ticker {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }
  .com__ticker__transition {
    display: inline-block;
    white-space: nowrap;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: ticker;
    animation-duration: 30s;
  }
  .com__ticker__text {
    display: inline-block;
    margin-right: 6px;
  }
`;

export default BuddyList;
