import { appMenu }                         from 'electron-util';
import type { MenuItemConstructorOptions } from 'electron';
import { app }                             from 'electron';

import { helpSubmenu }                     from './help-submenu';

const showPreferences = () => {
  // Show the app's preferences here
};

const appSubmenu = appMenu([
  {
    label       : 'Preferences…',
    accelerator : 'Command+,',
    click       : () => {
      showPreferences();
    },
  },
]);

appSubmenu.label = app.getName();

// prettier-ignore
export const macTemplate :MenuItemConstructorOptions[] = [
  appSubmenu,
  {
    label   : 'Miner',
    submenu : [
      {
        label : 'Custom',
      },
      {
        type : 'separator',
      },
      {
        role : 'close',
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
    role : 'windowMenu',
  },
  {
    role : 'help', submenu : helpSubmenu,
  },
];
