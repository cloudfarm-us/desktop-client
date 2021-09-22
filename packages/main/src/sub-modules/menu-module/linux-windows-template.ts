import type { MenuItemConstructorOptions } from 'electron';

import { helpSubmenu }                     from './help-submenu';

const showPreferences = () => {
  // Show the app's preferences here
};

// prettier-ignore
export const linxWindowsTemplate: MenuItemConstructorOptions[] = [
  {
    role    : 'fileMenu',
    submenu : [
      {
        label : 'Custom',
      },
      {
        type : 'separator',
      },
      {
        label       : 'Settings',
        accelerator : 'Control+,',
        click       : () => {
          showPreferences();
        },
      },
      {
        type : 'separator',
      },
      {
        role : 'quit',
      },
    ],
  },
  {
    role : 'editMenu',
  },
  {
    role : 'viewMenu',
  },
  {
    role : 'help', submenu : helpSubmenu,
  },
];
