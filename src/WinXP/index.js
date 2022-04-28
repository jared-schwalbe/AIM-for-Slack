import React, { useReducer, useRef, useCallback, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bemmit from 'bemmit';
import useMouse from 'react-use/lib/useMouse';

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
import { Windows, Icons, Footer, DashedBox, Modal } from './components';
import { defaultIconState, defaultAppState, appSettings } from './apps';
import { createNewMentionsObserver } from './apps/aim/observers';
import { playAudio } from './utils';

import progressCursor from './assets/cursor/progress.png';
import './styles.scss';

const c = bemmit('win-xp');

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
      const chatWindow = state.apps.find(app => app.props?.channelName === action.payload.channelName);
      if (chatWindow) {
        if (state.focusing === FOCUSING.WINDOW && chatWindow.zIndex === state.nextZIndex - 1) {
          // nothing to do if this chat is already open and focused
          return state;
        } else {
          // set hasNotification on the chat window so it blinks
          // also change the newMessage prop so we can play a sound
          const apps = state.apps.map(app =>
            app.id === chatWindow.id
              ? {
                ...app,
                props: {
                  ...app.props,
                  newMessage: Date.now(),
                },
                hasNotification: true,
              }
              : app,
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
                title: `${action.payload.channelName} - Instant Message`,
              },
              props: {
                newChat: true,
                channelName: action.payload.channelName,
                sidebarChannel: action.payload.sidebarChannel,
                sidebarGroup: action.payload.sidebarGroup,
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

const WinXP = ({ onClose }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const mouse = useMouse(ref);

  const focusedAppId = useMemo(() => {
    if (state.focusing !== FOCUSING.WINDOW) {
      return -1;
    }
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find(app => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }, [state.apps, state.focusing]);

  const onFocusApp = useCallback(id => {
    dispatch({ type: FOCUS_APP, payload: id });
  }, []);

  const onMaximizeWindow = useCallback(id => {
    if (focusedAppId === id) {
      dispatch({ type: TOGGLE_MAXIMIZE_APP, payload: id });
    }
  }, [focusedAppId]);

  const onMinimizeWindow = useCallback(id => {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    }
  }, [focusedAppId]);

  const onCloseApp = useCallback(id => {
    dispatch({ type: DEL_APP, payload: id });
  }, []);

  const onMouseDownFooterApp = useCallback(id => {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    } else {
      dispatch({ type: FOCUS_APP, payload: id });
    }
  }, [focusedAppId]);

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

  const onMouseDownDesktop = useCallback(e => {
    if (e.target === e.currentTarget)
      dispatch({
        type: START_SELECT,
        payload: { x: mouse.docX, y: mouse.docY },
      });
  }, [mouse.docX, mouse.docY]);

  const onMouseUpDesktop = useCallback(e => {
    dispatch({ type: END_SELECT });
  }, []);

  const onIconsSelected = useCallback(iconIds => {
    dispatch({ type: SELECT_ICONS, payload: iconIds });
  }, []);

  const onClickModalButton = useCallback(() => {
    onClose();
  }, [onClose]);

  const onModalClose = useCallback(() => {
    dispatch({ type: CANCEL_POWER_OFF });
  }, []);

  useEffect(() => {
    playAudio('audiostartup.mp3');
  }, []);

  useEffect(() => {
    const winXP = document.getElementById('win-xp');
    winXP.style.cursor = `url(${progressCursor}) 11 11, auto`;

    let loadingTimer;
    let slackLoaded = Boolean(document.querySelector('.p-client'));
    let timeElapsed = false;

    const doneLoading = () => {
      setLoading(false);
      winXP.style.removeProperty('cursor');
      if (state.apps.length) {
        onFocusApp(state.apps[0].id);
      }
    };

    if (!slackLoaded) {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.addedNodes?.[0]?.classList?.contains('p-client')) {
            slackLoaded = true;
            if (timeElapsed) {
              doneLoading();
            }
          }
        }
      });
      const slackContainer = document.querySelector('.p-client_container');
      observer.observe(slackContainer, { childList: true });
    }

    loadingTimer = setTimeout(() => {
      timeElapsed = true;
      if (slackLoaded) {
        doneLoading();
      }
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let newMentionsObserver;

    const onAimSignIn = () => {
      const dispatchNewMessage = payload => {
        dispatch({
          type: AIM_NEW_MESSAGE,
          payload,
        });
      };

      newMentionsObserver = createNewMentionsObserver(dispatchNewMessage);

      const sidebarList = document.querySelector('.p-channel_sidebar__list .c-virtual_list__scroll_container');
      newMentionsObserver.observe(sidebarList, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    };

    const onAimSignOut = () => {
      newMentionsObserver.disconnect();
    };

    window.addEventListener('aimsignin', onAimSignIn);
    window.addEventListener('aimsignout', onAimSignOut);

    return () => {
      newMentionsObserver.disconnect();
      window.removeEventListener('aimsignin', onAimSignIn);
      window.removeEventListener('aimsignout', onAimSignOut);
    }
  }, []);

  const powerOff = [POWER_STATE.LOG_OFF, POWER_STATE.TURN_OFF].includes(state.powerState);

  return (
    <div
      className={c('', [powerOff ? 'power-off' : ''])}
      id="win-xp"
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      ref={ref}
    >
      <Icons
        appSettings={appSettings}
        displayFocus={state.focusing === FOCUSING.ICON}
        icons={state.icons}
        onDoubleClick={onDoubleClickIcon}
        onMouseDown={onMouseDownIcon}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox mouse={mouse} startPos={state.selecting} />
      {!loading && (
        <Windows
          apps={state.apps}
          dispatch={dispatch}
          focusedAppId={focusedAppId}
          onClose={onCloseApp}
          onMaximize={onMaximizeWindow}
          onMinimize={onMinimizeWindow}
          onMouseDown={onFocusApp}
        />
      )}
      <Footer
        apps={!loading ? state.apps : []}
        focusedAppId={focusedAppId}
        onClickMenuItem={onClickMenuItem}
        onMouseDown={onMouseDownFooter}
        onMouseDownApp={onMouseDownFooterApp}
      />
      {state.powerState !== POWER_STATE.START && (
        <Modal
          mode={state.powerState}
          onClose={onModalClose}
          onClickButton={onClickModalButton}
        />
      )}
    </div>
  );
}

WinXP.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default WinXP;
