import React, { useReducer, useRef, useCallback, useMemo, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useMouse from 'react-use/lib/useMouse';

import defaultCursor from '../assets/cursors/default.png';
import progressCursor from '../assets/cursors/progress.png';
import background from '../assets/xp-background.jpeg';

import { getUnreads, createNewMessageObserver } from './utils';

import {
  ADD_APP,
  DEL_APP,
  FOCUS_APP,
  MINIMIZE_APP,
  TOGGLE_MAXIMIZE_APP,
  FOCUS_ICON,
  SELECT_ICONS,
  FOCUS_DESKTOP,
  START_SELECT,
  END_SELECT,
  POWER_OFF,
  CANCEL_POWER_OFF,
  AIM_NEW_MESSAGE,
} from './constants/actions';
import { FOCUSING, POWER_STATE } from './constants';
import { defaultIconState, defaultAppState, appSettings } from './apps';
import Modal from './Modal';
import Footer from './Footer';
import Windows from './Windows';
import Icons from './Icons';
import { DashedBox } from '../components';

const initState = {
  apps: defaultAppState,
  nextAppID: defaultAppState.length,
  nextZIndex: defaultAppState.length,
  focusing: FOCUSING.WINDOW,
  icons: defaultIconState,
  selecting: false,
  powerState: POWER_STATE.START,
};
const reducer = (state, action = { type: '' }) => {
  switch (action.type) {
    case ADD_APP:
      const app = state.apps.find(
        _app => _app.component === action.payload.component,
      );
      if (action.payload.multiInstance || !app) {
        return {
          ...state,
          apps: [
            ...state.apps,
            {
              ...action.payload,
              id: state.nextAppID,
              zIndex: state.nextZIndex,
            },
          ],
          nextAppID: state.nextAppID + 1,
          nextZIndex: state.nextZIndex + 1,
          focusing: FOCUSING.WINDOW,
        };
      }
      const apps = state.apps.map(app =>
        app.component === action.payload.component
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    case DEL_APP:
      if (state.focusing !== FOCUSING.WINDOW) return state;
      return {
        ...state,
        apps: state.apps.filter(app => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? FOCUSING.WINDOW
            : state.icons.find(icon => icon.isFocus)
            ? FOCUSING.ICON
            : FOCUSING.DESKTOP,
      };
    case FOCUS_APP: {
      const apps = state.apps.map(app =>
        app.id === action.payload
          ? { ...app, zIndex: state.nextZIndex, minimized: false, hasNotification: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    }
    case MINIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, minimized: true } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case TOGGLE_MAXIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, maximized: !app.maximized } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case FOCUS_ICON: {
      const icons = state.icons.map(icon => ({
        ...icon,
        isFocus: icon.id === action.payload,
      }));
      return {
        ...state,
        focusing: FOCUSING.ICON,
        icons,
      };
    }
    case SELECT_ICONS: {
      const icons = state.icons.map(icon => ({
        ...icon,
        isFocus: action.payload.includes(icon.id),
      }));
      return {
        ...state,
        icons,
        focusing: FOCUSING.ICON,
      };
    }
    case FOCUS_DESKTOP:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
      };
    case START_SELECT:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
        selecting: action.payload,
      };
    case END_SELECT:
      return {
        ...state,
        selecting: null,
      };
    case POWER_OFF:
      return {
        ...state,
        powerState: action.payload,
      };
    case CANCEL_POWER_OFF:
      return {
        ...state,
        powerState: POWER_STATE.START,
      };
    case AIM_NEW_MESSAGE:
      const chatWindow = state.apps.find(app => app.props?.channel === action.payload.channel);
      if (chatWindow) {
        if (state.focusing === FOCUSING.WINDOW && chatWindow.zIndex === state.nextZIndex - 1) {
          // nothing to do if this chat is already open and focused
          return state;
        } else {
          // set hasNotification on the chat window so it blinks
          const apps = state.apps.map(app =>
            app.id === chatWindow.id ? { ...app, hasNotification: true } : app,
          );
          return { ...state, apps };
        }
      } else {
        // open new chat window
        return {
          ...state,
          apps: [
            ...state.apps,
            {
              ...appSettings.AIMChat,
              header: {
                ...appSettings.AIMChat.header,
                title: `${action.payload.channel} - Instant Message`,
              },
              props: {
                channel: action.payload.channel,
                sidebarElement: action.payload.sidebarElement,
              },
              id: state.nextAppID,
              zIndex: state.nextZIndex,
            },
          ],
          nextAppID: state.nextAppID + 1,
          nextZIndex: state.nextZIndex + 1,
          focusing: FOCUSING.WINDOW,
        };
      }
    default:
      return state;
  }
};
function WinXP({ onClose }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const focusedAppId = useMemo(() => {
    if (state.focusing !== FOCUSING.WINDOW) return -1;
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find(app => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }, [state.apps, state.focusing]);
  const onFocusApp = useCallback(id => {
    dispatch({ type: FOCUS_APP, payload: id });
  }, []);
  const onMaximizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: TOGGLE_MAXIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  const onMinimizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: MINIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  const onCloseApp = useCallback(
    id => {
      dispatch({ type: DEL_APP, payload: id });
    },
    [],
  );
  const onMouseDownFooterApp = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: MINIMIZE_APP, payload: id });
      } else {
        dispatch({ type: FOCUS_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  const onMouseDownIcon = useCallback(id => {
    dispatch({ type: FOCUS_ICON, payload: id });
  }, []);
  const onDoubleClickIcon = useCallback((id, component) => {
    const appSetting = Object.values(appSettings).find(
      setting => setting.component === component,
    );
    dispatch({ type: FOCUS_ICON, payload: id });
    dispatch({ type: ADD_APP, payload: appSetting });
  }, []);
  const onMouseDownFooter = useCallback(() => {
    dispatch({ type: FOCUS_DESKTOP });
  }, []);
  const onClickMenuItem = useCallback(o => {
    if (o === 'Internet')
      dispatch({ type: ADD_APP, payload: appSettings['Internet Explorer'] });
    else if (o === 'Minesweeper')
      dispatch({ type: ADD_APP, payload: appSettings.Minesweeper });
    else if (o === 'My Computer')
      dispatch({ type: ADD_APP, payload: appSettings['My Computer'] });
    else if (o === 'Recycle Bin')
      dispatch({ type: ADD_APP, payload: appSettings['Recycle Bin'] });
    else if (o === 'Notepad')
      dispatch({ type: ADD_APP, payload: appSettings.Notepad });
    else if (o === 'Paint')
      dispatch({ type: ADD_APP, payload: appSettings.Paint });
    else if (o === 'AOL Instant Messenger')
      dispatch({ type: ADD_APP, payload: appSettings.AIMBuddyList });
    else if (o === 'Log Off')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.LOG_OFF });
    else if (o === 'Turn Off Computer')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.TURN_OFF });
    else
      dispatch({
        type: ADD_APP,
        payload: {
          ...appSettings.Error,
          injectProps: { message: 'C:\\\nApplication not found' },
        },
      });
  }, []);
  const onMouseDownDesktop = useCallback(
    e => {
      if (e.target === e.currentTarget)
        dispatch({
          type: START_SELECT,
          payload: { x: mouse.docX, y: mouse.docY },
        });
    },
    [mouse.docX, mouse.docY],
  );
  const onMouseUpDesktop = useCallback(e => {
    dispatch({ type: END_SELECT });
  }, []);
  const onIconsSelected = useCallback(iconIds => {
    dispatch({ type: SELECT_ICONS, payload: iconIds });
  }, []);
  const onClickModalButton = useCallback(text => {
    onClose();
  }, [onClose]);
  const onModalClose = useCallback(() => {
    dispatch({ type: CANCEL_POWER_OFF });
  }, []);
  useEffect(() => {
    new Audio(chrome.runtime.getURL("audio/startup.mp3")).play().catch(() => {});
  }, []);
  useEffect(() => {
    document.body.style.cursor = `url(${progressCursor}) 11 11, auto`;
  
    let t1;
    let t2;
    let loaded = false;
    let timeElapsed = false;

    const setup = () => {
      document.body.style.cursor = `url(${defaultCursor}) 11 11, auto`;
      t2 = setTimeout(() => {
        setLoading(false);
        if (state.apps.length) {
          onFocusApp(state.apps[0].id);
        }
      }, 100);
    };
  
    t1 = setTimeout(() => {
      timeElapsed = true;
      if (loaded) {
        setup();
      }
    }, 1400);
  
    if (!document.querySelector('.p-client')) {
      document.addEventListener("DOMNodeInserted", (e) => {
        if (e.target.classList && e.target.classList.contains('p-client')) {
          loaded = true;
          if (timeElapsed) {
            setup();
          }
        }
      }, true);
    } else {
      loaded = true;
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let newMessageObserver;

    const onAimSignIn = () => {
      const unreads = getUnreads();
      const dispatchNewMessage = payload => {
        dispatch({
          type: AIM_NEW_MESSAGE,
          payload,
        });
      };

      newMessageObserver = createNewMessageObserver(unreads, dispatchNewMessage);

      const sidebarList = document.querySelector('.c-virtual_list__scroll_container');
      newMessageObserver.observe(sidebarList, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    }

    const onAimSignOut = () => {
      newMessageObserver.disconnect();
    }

    window.addEventListener('aimsignin', onAimSignIn);
    window.addEventListener('aimsignout', onAimSignOut);

    return () => {
      newMessageObserver.disconnect();

      window.removeEventListener('aimsignin', onAimSignIn);
      window.removeEventListener('aimsignout', onAimSignOut);
    }
  }, []);

  return (
    <Container
      ref={ref}
      id="winxp"
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      state={state.powerState}
    >
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === FOCUSING.ICON}
        appSettings={appSettings}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox startPos={state.selecting} mouse={mouse} />
      {!loading && (
        <Windows
          apps={state.apps}
          dispatch={dispatch}
          onMouseDown={onFocusApp}
          onClose={onCloseApp}
          onMinimize={onMinimizeWindow}
          onMaximize={onMaximizeWindow}
          focusedAppId={focusedAppId}
        />
      )}
      <Footer
        apps={state.apps}
        onMouseDownApp={onMouseDownFooterApp}
        focusedAppId={focusedAppId}
        onMouseDown={onMouseDownFooter}
        onClickMenuItem={onClickMenuItem}
      />
      {state.powerState !== POWER_STATE.START && (
        <Modal
          onClose={onModalClose}
          onClickButton={onClickModalButton}
          mode={state.powerState}
        />
      )}
    </Container>
  );
}

const powerOffAnimation = keyframes`
  0% {
    filter: brightness(1) grayscale(0);
  }
  30% {
    filter: brightness(1) grayscale(0);
  }
  100% {
    filter: brightness(0.6) grayscale(1);
  }
`;
const animation = {
  [POWER_STATE.START]: '',
  [POWER_STATE.TURN_OFF]: powerOffAnimation,
  [POWER_STATE.LOG_OFF]: powerOffAnimation,
};

const Container = styled.div`
  font-family: Tahoma, 'Noto Sans', sans-serif;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  animation: ${({ state }) => animation[state]} 5s forwards;
  *:not(input):not(textarea) {
    user-select: none;
  }
`;

export default WinXP;
