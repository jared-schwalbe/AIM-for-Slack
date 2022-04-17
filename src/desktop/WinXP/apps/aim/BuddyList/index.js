import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ADD_APP } from '../../../constants/actions';
import { appSettings } from '../../';

import { WindowDropDowns } from '../../../../components';
import dropDownData from './dropDownData';
import banner from '../../../../assets/aim/banner_sharp.png';
import buddyListOptions from '../../../../assets/aim/buddy_list_options.png';
import background from '../../../../assets/aim/background.png';
import actions_top from '../../../../assets/aim/actions_top_sharp.png';
import actions_bottom from '../../../../assets/aim/actions_bottom_sharp.png';
import ticker from '../../../../assets/aim/ticker_sharp.png';

function BuddyList({ onClose, isFocus, dispatch }) {
  const [, rerender] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => rerender(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [active, setActive] = useState();

  const profileEl = document.querySelector('.p-ia__nav__user__button');
  const username = profileEl && profileEl.getAttribute('aria-label').replace('User menu: ', '');

  const openChat = c => dispatch({
    type: ADD_APP,
    payload: {
      ...appSettings.AIMChat,
      props: {
        headerTitle: `${c.name} - Instant Message`,
        openMessages: () => c.element.click(),
        name: c.name,
      }
    },
  });

  function onClickOptionItem(item) {
    switch (item) {
      case 'Close':
        onClose();
        break;
      default:
    }
  }

  function getGroups() {
    const groups = [];
    const items = document.getElementsByClassName('p-channel_sidebar__static_list__item');
    Array.from(items).forEach(item => {
      if (item.id && item.id.includes('sectionHeading')) {
        groups.push({
          element: item.querySelector('.p-channel_sidebar__section_heading_label_overflow'),
          title: item.getAttribute('aria-label'),
          expanded: item.getAttribute('aria-expanded') === 'true',
          children: [],
        });
      } else if (item.querySelector('.p-channel_sidebar__channel')) {
        const nameEl = item.querySelector('.p-channel_sidebar__name');
        groups[groups.length - 1].children.push({
          element: item.querySelector('.p-channel_sidebar__channel'),
          name: nameEl ? nameEl.textContent : '',
        });
      }
    });
    return groups;
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
          <img className="com__banner__image" src={banner} alt="" />
        </div>
        <div className="com__title">
          <div className="com__title__name">{`${username}'s Buddy List:`}</div>
          <div className="com__title__options">
            <img className="com__title__options__image" src={buddyListOptions} alt="" />
          </div>
        </div>
      </section>
      <div className="com__buddy-list">
        {getGroups().map(g => (
          <div className="com__buddy-list__group" key={g.title}>
            <div className={`com__buddy-list__group__title--${g.expanded ? 'expanded' : 'collapsed'}`}>
              <button
                className="com__buddy-list__group__expand"
                onClick={e => setActive(g.title)}
                onDoubleClick={() => g.element.click()}
              >
                <div className={`com__buddy-list__group__expand__icon--${g.expanded ? 'expanded' : 'collapsed'}`} />
                <span className={active === g.title ? 'com__buddy-list__active' : ''}>
                  {`${g.title} (${g.children.length}/${g.children.length})`}
                </span>
              </button>
            </div>
            <div className="com__buddy-list__group__items">
              {g.expanded && g.children.map(c => {
                let activeClass = '';
                if (active === c.name) {
                  activeClass = 'com__buddy-list__active';
                  if (isFocus) {
                    activeClass = 'com__buddy-list__active--focus';
                  }
                }
                return (
                  <button
                    key={c.name}
                    className="com__buddy-list__group__item"
                    onClick={e => setActive(c.name)}
                    onDoubleClick={() => openChat(c)}
                  >
                    <span>
                      <span className={activeClass}>
                        {c.name}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="com__actions">
        <div className="com__actions__top">
          <img className="com__actions__top__img" src={actions_top} alt="" />
        </div>
        <div className="com__actions__bottom">
          <img className="com__actions__bottom__img" src={actions_bottom} alt="" />
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
  .com__buddy-list__group__item > span > span {
    border: 1px dotted transparent;
    padding-left: 20px;
    padding-right: 1px;
    padding-top: 1px;
    padding-bottom: 1px;
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
