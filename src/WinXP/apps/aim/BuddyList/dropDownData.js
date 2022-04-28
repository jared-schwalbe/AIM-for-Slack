export const MyAim = [
  {
    type: 'item',
    text: 'AIM Today...',
  },
  {
    type: 'menu',
    text: 'Away Message',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px',
    },
    items: [
      {
        type: 'item',
        text: 'New Message...'
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        text: 'Default Away Message',
      },
      {
        type: 'item',
        text: 'Playing Game',
      },
    ],
  },
  {
    type: 'item',
    text: 'Edit Profile...',
  },
  {
    type: 'item',
    text: 'Setup Buddy List...',
    hotkey: 'Alt-S',
  },
  {
    type: 'menu',
    text: 'Edit Options',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px',
    },
    items: [
      {
        type: 'item',
        text: 'Edit Preferences...',
        hotkey: 'F3',
      },
      {
        type: 'item',
        text: 'Change Password...',
      },
      {
        type: 'item',
        text: 'Format Screen Name...',
      },
      {
        type: 'item',
        text: 'Update E-mail Address...',
      },
      {
        type: 'item',
        text: 'Update Location...',
      },
      {
        type: 'item',
        text: 'Confirm Account',
      },
      {
        type: 'item',
        text: 'Keep Buddy List on Top',
      },
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'menu',
    text: 'Read Mail',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px',
    },
    items: [
      {
        type: 'item',
        text: 'Add New POP3 Mailbox',
      },
    ],
  },
  {
    type: 'item',
    text: 'Mail Alert Window...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Stock Ticker Detail Window...',
  },
  {
    type: 'menu',
    text: 'Alerts',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px',
    },
    items: [
      {
        type: 'item',
        text: 'Manage Web Alerts...',
      },
      {
        type: 'item',
        text: 'Read Alerts...',
      },
    ],
  },
  {
    type: 'item',
    text: 'News Ticker...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Load Buddy List...',
  },
  {
    type: 'item',
    text: 'Save Buddy List...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Switch Screen Name...',
  },
  {
    type: 'item',
    text: 'Sign Off',
  },
];

const People = [
  {
    type: 'item',
    text: 'Sign On A Friend...',
  },
  {
    type: 'item',
    text: 'Send Buddy List...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Get Buddy Info...',
    hotkey: 'Alt-O',
  },
  {
    type: 'item',
    text: 'Send Instant Message...',
    hotkey: 'Alt-I',
  },
  {
    type: 'item',
    text: 'Send Chat Invitation...',
    hotkey: 'Alt-C',
  },
  {
    type: 'item',
    text: 'Send IM Greeting',
  },
  {
    type: 'item',
    text: 'Send Mail...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Send IM Image...',
  },
  {
    type: 'item',
    text: 'Connect to Talk...',
    hotkey: 'Alt-T',
  },
  {
    type: 'item',
    text: 'Contact using AIM Phone...',
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
    text: 'Send File to Buddy...',
  },
  {
    type: 'item',
    text: 'Get File from Buddy...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Select Buddy Icon...',
  },
  {
    type: 'item',
    text: 'Store/Edit Buddy Comment...',
    disable: true,
  },
  {
    type: 'item',
    text: 'Store/Edit Buddy Numbers',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'Find a Buddy Wizard...',
  },
  {
    type: 'menu',
    text: 'Find a Buddy',
    position: {
      left: 'calc(100% - 4px)',
      top: '-3px',
    },
    items: [
      {
        type: 'item',
        text: 'By E-mail Address...',
      },
      {
        type: 'item',
        text: 'By Name and Address...',
      },
      {
        type: 'item',
        text: 'By Common Interest...',
      },
    ]
  },
];

const Help = [
  {
    type: 'item',
    text: 'New User Wizard...',
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    text: 'How to Use Help...',
  },
  {
    type: 'item',
    text: 'Help Topics...',
  },
  {
    type: 'item',
    text: 'Budy List Help...',
  },
  {
    type: 'item',
    text: 'Report a Bug',
  },
  {
    type: 'item',
    text: 'Security Central',
  },
  {
    type: 'item',
    text: 'Frequently Asked Questions...',
  },
  {
    type: 'item',
    text: 'About AOL(R) Instant Messenger(TM)...',
  },
];

export default { 'My AIM': MyAim, People, Help };
