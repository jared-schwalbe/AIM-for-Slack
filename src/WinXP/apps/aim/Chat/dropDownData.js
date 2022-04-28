export const File = [
  {
    type: 'item',
    text: 'Save...',
  },
  {
    type: 'item',
    text: 'Open Saved IM...',
  },
  {
    type: 'item',
    text: 'Create Shortcut',
  },
  {
    type: 'item',
    text: 'Print...',
    disable: true,
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Send File...',
  },
  {
    type: 'item',
    text: 'Get File...',
  },
  {
    type: 'item',
    text: 'Close File Connection....',
    disable: true,
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'IM Preferences',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Close',
  },
];

const Edit = [
  {
    type: 'item',
    text: 'Cut',
    disable: true,
  },
  {
    type: 'item',
    text: 'Copy',
    disable: true,
  },
  {
    type: 'item',
    text: 'Paste',
    disable: true,
  },
  {
    type: 'item',
    text: 'Select All',
  },
];

const Insert = [
  {
    type: 'item',
    text: 'Image or Sound File...',
    disable: true,
  },
  {
    type: 'item',
    text: 'Record Sound...',
    disable: true,
  },
  {
    type: 'item',
    text: 'Hyperlink...',
  },
  {
    type: 'menu',
    text: 'Smiley',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px',
    },
    items: [
      {
        type: 'item',
        text: '<span>😃</span><span>:-)</span><span>Smiling</span>',
        hotkey: 'Ctrl+1',
      },
      {
        type: 'item',
        text: '<span>🙁</span><span>:-(</span><span>Frowning</span>',
        hotkey: 'Ctrl+2',
      },
      {
        type: 'item',
        text: '<span>😉</span><span>;-)</span><span>Winking</span>',
        hotkey: 'Ctrl+3',
      },
      {
        type: 'item',
        text: '<span>😛</span><span>;-p</span><span>Sticking-out-tongue</span>',
        hotkey: 'Ctrl+4',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: '<span>😮</span><span>=-O</span><span>Surprised</span>',
        hotkey: 'Ctrl+5',
      },
      {
        type: 'item',
        text: '<span>😘</span><span>:-*</span><span>Kissing</span>',
        hotkey: 'Ctrl+6',
      },
      {
        type: 'item',
        text: '<span>🤬</span><span>>:o</span><span>Yelling</span>',
        hotkey: 'Ctrl+7',
      },
      {
        type: 'item',
        text: '<span>😎</span><span>8-)</span><span>Cool</span>',
        hotkey: 'Ctrl+8',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: '<span>🤑</span><span>:-$</span><span>Money-mouth</span>',
        hotkey: 'Ctrl+Shift+1',
      },
      {
        type: 'item',
        text: '<span>😏</span><span>>:-!</span><span>Foot-in-mouth</span>',
        hotkey: 'Ctrl+Shift+2',
      },
      {
        type: 'item',
        text: '<span>😳</span><span>:-[</span><span>Embarrassed</span>',
        hotkey: 'Ctrl+Shift+3',
      },
      {
        type: 'item',
        text: '<span>😇</span><span>O:-)</span><span>Innocent</span>',
        hotkey: 'Ctrl+Shift+4',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: '<span>😕</span><span>:-/</span><span>Undecided</span>',
        hotkey: 'Ctrl+Shift+5',
      },
      {
        type: 'item',
        text: '<span>😢</span><span>:\'(</span><span>Crying</span>',
        hotkey: 'Ctrl+Shift+6',
      },
      {
        type: 'item',
        text: '<span>🤐</span><span>:-X</span><span>Lips-are-sealed</span>',
        hotkey: 'Ctrl+Shift+7',
      },
      {
        type: 'item',
        text: '<span>😁</span><span>:-D</span><span>Laughing</span>',
        hotkey: 'Ctrl+Shift+8',
      },
    ],
  },
  {
    type: 'item',
    text: 'Text from File...'
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Timestamp',
    hotkey: 'F2',
  },
];

const People = [
  {
    type: 'item',
    text: 'Info...',
  },
  {
    type: 'item',
    text: 'Send Chat Invitation...',
  },
  {
    type: 'item',
    text: 'Send Buddy List...',
  },
  {
    type: 'item',
    text: 'Send IM Greeting',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Connect to Send IM Image',
  },
  {
    type: 'item',
    text: 'Close IM Image Connection',
    disable: true,
  },
  {
    type: 'item',
    text: 'Connect to Talk...',
  },
  {
    type: 'menu',
    text: 'Add-Ins',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px',
    },
    items: [
      {
        type: 'item',
        text: 'Manage Add-Ins',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: 'MSHearts',
      },
      {
        type: 'item',
        text: 'NetMeeting',
      },
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Add to Buddy List...',
  },
  {
    type: 'item',
    text: 'Warn...',
  },
  {
    type: 'item',
    text: 'Block...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Select Buddy Icon...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Send File...',
  },
  {
    type: 'item',
    text: 'Get File...',
  },
  {
    type: 'item',
    text: 'Close File Connection',
    disable: true,
  },
];

export default { File, Edit, Insert, People };
