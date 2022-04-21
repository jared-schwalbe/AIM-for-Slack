import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import RecycleBin from './ReycleBin';
import AIMSignIn from './aim/SignIn';
import AIMBuddyList from './aim/BuddyList';
import AIMChat from './aim/Chat';
import Notepad from './Notepad';
import Paint from './Paint';
import iePaper from '../../assets/windowsIcons/ie-paper.png';
import ie from '../../assets/windowsIcons/ie.png';
import mine from '../../assets/minesweeper/mine-icon.png';
import error from '../../assets/windowsIcons/897(16x16).png';
import computer from '../../assets/windowsIcons/676(16x16).png';
import computerLarge from '../../assets/windowsIcons/676(32x32).png';
import notepad from '../../assets/windowsIcons/327(16x16).png';
import paint from '../../assets/windowsIcons/680(16x16).png';
import aim from '../../assets/windowsIcons/aim.png';
import aimBuddyList from '../../assets/windowsIcons/aimBuddyList.png';
import aimChat from '../../assets/windowsIcons/aimChat.png';
import recycleBin from '../../assets/windowsIcons/recycle-bin(16x16).png';
import recycleBinLarge from '../../assets/windowsIcons/recycle-bin.png';

const randomPos = (max, min) => Math.round(Math.random() * (max - min)) + min;
const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();
export const defaultAppState = [
  {
    header: {
      icon: aim,
      title: "Sign On",
    },
    component: AIMSignIn,
    defaultSize: {
      width: 190,
      height: 254,
    },
    defaultOffset: {
      x: (window.innerWidth / 2) - (190 / 2),
      y: ((window.innerHeight / 2) - (254 / 2)) * 0.5,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex(),
  },
];

export const defaultIconState = [
  {
    id: 0,
    icon: computerLarge,
    title: 'My Computer',
    component: MyComputer,
    isFocus: false,
  },
  {
    id: 1,
    icon: ie,
    title: 'Internet Explorer',
    component: InternetExplorer,
    isFocus: false,
  },
  {
    id: 2,
    icon: aim,
    isShortcut: true,
    title: 'AOL Instant Messenger',
    getComponent: () => window.aimForSlack.signedIn ? AIMBuddyList : AIMSignIn,
    isFocus: false,
  },
  {
    id: 3,
    icon: recycleBinLarge,
    title: 'Recycle Bin',
    component: RecycleBin,
    isFocus: false,
    style: {
      position: 'fixed',
      bottom: '35px',
      right: '20px',
    }
  },
];

export const appSettings = {
  'Internet Explorer': {
    header: {
      icon: iePaper,
      title: 'Internet Explorer',
    },
    component: InternetExplorer,
    defaultSize: {
      width: 700,
      height: 500,
    },
    defaultOffset: {
      x: 140,
      y: 30,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Minesweeper: {
    header: {
      icon: mine,
      title: 'Minesweeper',
    },
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 190,
      y: 180,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Error: {
    header: {
      icon: error,
      title: 'C:\\',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 0,
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'My Computer': {
    header: {
      icon: computer,
      title: 'My Computer',
    },
    component: MyComputer,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 260,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  'Recycle Bin': {
    header: {
      icon: recycleBin,
      title: 'Recycle Bin',
    },
    component: RecycleBin,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 270,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  Notepad: {
    header: {
      icon: notepad,
      title: 'Untitled - Notepad',
    },
    component: Notepad,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 270,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Paint: {
    header: {
      icon: paint,
      title: 'Untitled - Paint',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 280,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  AIMSignIn: {
    header: {
      icon: aim,
      title: "Sign On",
    },
    component: AIMSignIn,
    defaultSize: {
      width: 190,
      height: 254,
    },
    defaultOffset: {
      x: (window.innerWidth / 2) - (190 / 2),
      y: ((window.innerHeight / 2) - (254 / 2)) * 0.5,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  AIMBuddyList: {
    header: {
      icon: aimBuddyList,
      title: "Jared Schwalbe's Buddy List",
    },
    component: AIMBuddyList,
    constraintSize: {
      width: 170,
      height: 355,
    },
    defaultSize: {
      width: 210,
      height: window.innerHeight * 0.8,
    },
    defaultOffset: {
      x: window.innerWidth - 210,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  AIMChat: {
    header: {
      icon: aimChat,
      title: "Instant Message",
    },
    component: AIMChat,
    constraintSize: {
      width: 390,
      height: 340,
    },
    defaultSize: {
      width: 475,
      height: 415,
    },
    defaultOffset: {
      x: (window.innerWidth / 2) - (500 / 2),
      y: (window.innerHeight / 2) - (400 / 2),
    },
    randomOffset: () => {
      const centerX = (window.innerWidth / 2) - (500 / 2);
      const centerY = (window.innerHeight / 2) - (400 / 2);
      return {
        x: randomPos(centerX - 200, centerX + 200),
        y: randomPos(centerY - 90, centerY + 90),
      };
    },
    resizable: true,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
};

export { InternetExplorer, Minesweeper, ErrorBox, MyComputer, RecycleBin, Notepad, AIMBuddyList, AIMChat };
