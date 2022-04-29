import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Balloon from '../../components/Balloon';
import FooterMenu from './FooterMenu';
import FooterWindow from './FooterWindow';

import startButton from '../../assets/icons/start.png';
import sound from '../../assets/icons/690(16x16).png';
import media from '../../assets/icons/846(16x16)_small.png';
import risk from '../../assets/icons/229(16x16).png';
import info from '../../assets/icons/info.png';

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = 'AM';
  let min = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = 'PM';
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = '0' + min;
  }
  return `${hour}:${min} ${hourPostFix}`;
};

const Footer = ({
  apps,
  focusedAppId,
  onClickMenuItem,
  onMouseDown,
  onMouseDownApp,
}) => {
  const [time, setTime] = useState(getTime);
  const [menuOn, setMenuOn] = useState(false);
  const menu = useRef(null);

  const toggleMenu = () => {
    setMenuOn(on => !on);
  }

  const _onMouseDown = () => {
    onMouseDown();
  }

  const _onClickMenuItem = (name) => {
    onClickMenuItem(name);
    setMenuOn(false);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTime();
      newTime !== time && setTime(newTime);
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  useEffect(() => {
    const target = menu.current;
    if (!target) {
      return;
    }
  
    const onMouseDown = (e) => {
      if (!target.contains(e.target) && menuOn) {
        setMenuOn(false);
      }
    }

    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [menuOn]);

  return (
    <Container onMouseDown={_onMouseDown}>
      <div className="footer__items left">
        <div ref={menu} className="footer__start__menu">
          {menuOn && <FooterMenu onClick={_onClickMenuItem} />}
        </div>
        <img
          src={startButton}
          alt="start"
          className="footer__start"
          onMouseDown={toggleMenu}
        />
        {[...apps].map(
          app =>
            !app.header.noFooterWindow && (
              <FooterWindow
                hasNotification={app.hasNotification}
                icon={app.header.icon}
                id={app.id}
                isFocus={focusedAppId === app.id}
                key={app.id}
                onMouseDown={onMouseDownApp}
                title={app.header.title}
              />
            ),
        )}
      </div>
      <div className="footer__items right">
        <img className="footer__icon" src={sound} alt="" />
        <img className="footer__icon" src={media} alt="" />
        <img className="footer__icon" src={risk} alt="" />
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          <Balloon
            imgHeaderSrc={risk}
            textHeader="Your computer might be at risk"
            textFirst="Antivirus software might not be installed"
            textSecond="Click this balloon to fix this problem."
            startAfter={3000}
            style={{ whiteSpace: 'nowrap', right: "-6px" }}
          />
          <Balloon
            imgHeaderSrc={info}
            textHeader="Take a tour of Windows XP"
            textFirst="To learn about the exciting new features in XP now, click here. To take the tour later, click All Programs on the Start menu, and then click Accessories."
            startAfter={22000}
            style={{ width: "345px", right: "11px" }}
          />
        </div>
        <div className="footer__time">{time}</div>
      </div>
    </Container>
  );
};

Footer.defaultProps = {
  focusedAppId: null,
};

Footer.propTypes = {
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      hasNotification: PropTypes.bool,
      id: PropTypes.number.isRequired,
      header: PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  focusedAppId: PropTypes.number,
  onClickMenuItem: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseDownApp: PropTypes.func.isRequired,
};

const Container = styled.footer`
  height: 30px;
  background: linear-gradient(
    to bottom,
    #1f2f86 0,
    #3165c4 3%,
    #3682e5 6%,
    #4490e6 10%,
    #3883e5 12%,
    #2b71e0 15%,
    #2663da 18%,
    #235bd6 20%,
    #2258d5 23%,
    #2157d6 38%,
    #245ddb 54%,
    #2562df 86%,
    #245fdc 89%,
    #2158d4 92%,
    #1d4ec0 95%,
    #1941a5 98%
  );
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  .footer__items.left {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
  .footer__items.right {
    background-color: #0b77e9;
    flex-shrink: 0;
    background: linear-gradient(
      to bottom,
      #0c59b9 1%,
      #139ee9 6%,
      #18b5f2 10%,
      #139beb 14%,
      #1290e8 19%,
      #0d8dea 63%,
      #0d9ff1 81%,
      #0f9eed 88%,
      #119be9 91%,
      #1392e2 94%,
      #137ed7 97%,
      #095bc9 100%
    );
    border-left: 1px solid #1042af;
    box-shadow: inset 1px 0 1px #18bbff;
    padding: 0 10px;
    margin-left: 10px;
  }
  .footer__items {
    display: flex;
    align-items: center;
  }
  .footer__start {
    height: 100%;
    margin-right: 10px;
    position: relative;
    &:hover {
      filter: brightness(105%);
    }
    &:active {
      pointer-events: none;
      filter: brightness(85%);
    }
  }
  .footer__start__menu {
    position: absolute;
    left: 0;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.5);
    bottom: 100%;
  }
  .footer__time {
    margin: 0 5px;
    color: #fff;
    font-size: 11px;
    font-weight: lighter;
    text-shadow: none;
  }
`;

export default Footer;
