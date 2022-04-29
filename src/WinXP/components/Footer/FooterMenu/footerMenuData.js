import empty from '../../../assets/empty.png';
import backup from '../../../assets/icons/23(16x16).png';
import keyboard from '../../../assets/icons/58(16x16).png';
import cmd from '../../../assets/icons/56(16x16).png';
import calculator from '../../../assets/icons/74(16x16).png';
import utility from '../../../assets/icons/119(16x16).png';
import volume from '../../../assets/icons/120(16x16).png';
import characterMap from '../../../assets/icons/127(16x16).png';
import cleanDisk from '../../../assets/icons/128(16x16).png';
import wordPad from '../../../assets/icons/153(16x16).png';
import winExplorer from '../../../assets/icons/156(16x16).png';
import MSN from '../../../assets/icons/159(16x16).png';
import sync from '../../../assets/icons/182(16x16).png';
import security from '../../../assets/icons/214(16x16).png';
import access from '../../../assets/icons/227(16x16).png';
import wireless from '../../../assets/icons/234(16x16).png';
import accessibility from '../../../assets/icons/238(16x16).png';
import connection from '../../../assets/icons/309(16x16).png';
import update from '../../../assets/icons/322(16x16).png';
import notepad from '../../../assets/icons/327(16x16).png';
import networkAssistance from '../../../assets/icons/357(16x16).png';
import menu from '../../../assets/icons/358(16x16).png';
import transfer from '../../../assets/icons/367(16x16).png';
import defragmenter from '../../../assets/icons/374(16x16).png';
import catalog from '../../../assets/icons/392(16x16).png';
import networkConnection from '../../../assets/icons/404(16x16).png';
import info from '../../../assets/icons/505(16x16).png';
import address from '../../../assets/icons/554(16x16).png';
import connectionWizard from '../../../assets/icons/663(16x16).png';
import networkSetup from '../../../assets/icons/664(16x16).png';
import hyperCmd from '../../../assets/icons/669(16x16).png';
import painter from '../../../assets/icons/680(16x16).png';
import sound from '../../../assets/icons/690(16x16).png';
import recent from '../../../assets/icons/716(16x16).png';
import compatibility from '../../../assets/icons/747(16x16).png';
import magnifier from '../../../assets/icons/817(16x16).png';
import mediaPlayer from '../../../assets/icons/846(16x16).png';
import tour from '../../../assets/icons/853(32x32).png';
import outlook from '../../../assets/icons/887(16x16).png';
import spade from '../../../assets/icons/888(16x16).png';
import reversi from '../../../assets/icons/889(16x16).png';
import onlineHeart from '../../../assets/icons/890(16x16).png';
import checker from '../../../assets/icons/891(16x16).png';
import backgammon from '../../../assets/icons/892(16x16).png';
import movieMaker from '../../../assets/icons/894(16x16).png';
import ie from '../../../assets/icons/896(16x16).png';
import messenger from '../../../assets/icons/msn.png';
import spider from '../../../assets/icons/spider.png';
import freecell from '../../../assets/icons/freecell.png';
import heart from '../../../assets/icons/heart.png';
import rdp from '../../../assets/icons/rdp.png';
import solitaire from '../../../assets/icons/solitaire.png';
import narrator from '../../../assets/icons/narrator.png';
import pinball from '../../../assets/icons/pinball.png';
import restore from '../../../assets/icons/restore.png';
import mine from '../../../assets/minesweeper/mine-icon.png';

export const MyRecentDocuments = [
  {
    type: 'item',
    icon: empty,
    text: '(Empty)',
  },
];

export const ConnectTo = [
  {
    type: 'item',
    icon: MSN,
    text: 'MSN',
  },
  {
    type: 'item',
    icon: connection,
    text: 'Show all connections',
  },
];

export const AllPrograms = [
  {
    type: 'item',
    icon: access,
    text: 'Set Program Access and Defaults',
  },
  {
    type: 'item',
    icon: catalog,
    text: 'Windows Catalog',
  },
  {
    type: 'item',
    icon: update,
    text: 'Windows Update',
  },
  {
    type: 'separator',
  },
  {
    type: 'menu',
    icon: menu,
    text: 'Accessories',
    items: [
      {
        type: 'menu',
        icon: menu,
        text: 'Accessibility',
        bottom: 'initial',
        items: [
          {
            type: 'item',
            icon: accessibility,
            text: 'Accessibility Wizard',
          },
          {
            type: 'item',
            icon: magnifier,
            text: 'Magnifier',
          },
          {
            type: 'item',
            icon: narrator,
            text: 'Narrator',
          },
          {
            type: 'item',
            icon: keyboard,
            text: 'On-Screen Keyboard',
          },
          {
            type: 'item',
            icon: utility,
            text: 'Utility Manager',
          },
        ],
      },
      {
        type: 'menu',
        icon: menu,
        text: 'Communications',
        bottom: 'initial',
        items: [
          {
            type: 'item',
            icon: hyperCmd,
            text: 'HyperTerminal',
          },
          {
            type: 'item',
            icon: networkConnection,
            text: 'Network Connections',
          },
          {
            type: 'item',
            icon: networkSetup,
            text: 'Network Setup Wizard',
          },
          {
            type: 'item',
            icon: connectionWizard,
            text: 'New Connection Wizard',
          },
          {
            type: 'item',
            icon: wireless,
            text: 'Wireless Network Setup Wizard',
          },
        ],
      },
      {
        type: 'menu',
        icon: menu,
        text: 'Entertainment',
        bottom: 'initial',
        items: [
          {
            type: 'item',
            icon: sound,
            text: 'Sound Recorder',
          },
          {
            type: 'item',
            icon: volume,
            text: 'Volume Control',
          },
          {
            type: 'item',
            icon: mediaPlayer,
            text: 'Windows Media Player',
          },
        ],
      },
      {
        type: 'menu',
        icon: menu,
        text: 'System Tools',
        bottom: 'initial',
        items: [
          {
            type: 'item',
            icon: backup,
            text: 'Backup',
          },
          {
            type: 'item',
            icon: characterMap,
            text: 'Character Map',
          },
          {
            type: 'item',
            icon: cleanDisk,
            text: 'Disk Cleanup',
          },
          {
            type: 'item',
            icon: defragmenter,
            text: 'Disk Defragmenter',
          },
          {
            type: 'item',
            icon: transfer,
            text: 'Files and Settings Transfer Wizard',
          },
          {
            type: 'item',
            icon: recent,
            text: 'Scheduled Tasks',
          },
          {
            type: 'item',
            icon: security,
            text: 'Security Center',
          },
          {
            type: 'item',
            icon: info,
            text: 'System Information',
          },
          {
            type: 'item',
            icon: restore,
            text: 'System Restore',
          },
        ],
      },
      {
        type: 'item',
        icon: address,
        text: 'Address Book',
      },
      {
        type: 'item',
        icon: cmd,
        text: 'Command Prompt',
      },
      {
        type: 'item',
        icon: notepad,
        text: 'Notepad',
      },
      {
        type: 'item',
        icon: painter,
        text: 'Paint',
      },
      {
        type: 'item',
        icon: calculator,
        text: 'Calculator',
      },
      {
        type: 'item',
        icon: compatibility,
        text: 'Program Compatibility Wizard',
      },
      {
        type: 'item',
        icon: rdp,
        text: 'Remote Desktop Connection',
      },
      {
        type: 'item',
        icon: sync,
        text: 'Synchronize',
      },
      {
        type: 'item',
        icon: tour,
        text: 'Tour Windows XP',
      },
      {
        type: 'item',
        icon: winExplorer,
        text: 'Windows Explorer',
      },
      {
        type: 'item',
        icon: wordPad,
        text: 'WordPad',
      },
    ],
  },
  {
    type: 'menu',
    icon: menu,
    text: 'Games',
    items: [
      {
        type: 'item',
        icon: freecell,
        text: 'FreeCell',
      },
      {
        type: 'item',
        icon: heart,
        text: 'Hearts',
      },
      {
        type: 'item',
        icon: backgammon,
        text: 'Internet Backgammon',
      },
      {
        type: 'item',
        icon: checker,
        text: 'Internet Checkers',
      },
      {
        type: 'item',
        icon: onlineHeart,
        text: 'Internet Hearts',
      },
      {
        type: 'item',
        icon: reversi,
        text: 'Internet Reversi',
      },
      {
        type: 'item',
        icon: spade,
        text: 'Internet Spades',
      },
      {
        type: 'item',
        icon: mine,
        text: 'Minesweeper',
      },
      {
        type: 'item',
        icon: pinball,
        text: 'Pinball',
      },
      {
        type: 'item',
        icon: solitaire,
        text: 'Solitaire',
      },
      {
        type: 'item',
        icon: spider,
        text: 'Spider Solitaire',
      },
    ],
  },
  {
    type: 'menu',
    icon: menu,
    text: 'Startup',
    items: [
      {
        type: 'item',
        icon: empty,
        text: '(Empty)',
      },
    ],
  },
  {
    type: 'item',
    icon: ie,
    text: 'Internet Explorer',
  },
  {
    type: 'item',
    icon: outlook,
    text: 'Outlook Express',
  },
  {
    type: 'item',
    icon: networkAssistance,
    text: 'Remote Assistance',
  },
  {
    type: 'item',
    icon: mediaPlayer,
    text: 'Windows Media Player',
  },
  {
    type: 'item',
    icon: messenger,
    text: 'Windows Messenger',
  },
  {
    type: 'item',
    icon: movieMaker,
    text: 'Windows Movie Maker',
  },
];

export default {
  AllPrograms,
};
