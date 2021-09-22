import type { MenuItemConstructorOptions } from 'electron';
import type { MainProcess }                from 'main-process';
import { deleteAppData, openAppDataDir }   from 'utils';

export const createDebugSubmenu = (mainProcess: MainProcess) => {
  // prettier-ignore
  const subMenuConstructorOptions: MenuItemConstructorOptions[] = [
    {
      label : 'Open System Preferences', click : async () => mainProcess.openSystemPreferences(),
    },
    {
      label : 'Show Settings', click : mainProcess.openPreferencesInEditor,
    },
    {
      label : 'Show App Data', click : openAppDataDir,
    },
    {
      type : 'separator',
    },
    {
      label : 'Reset Settings', click : () => { mainProcess.resetPreferences(); },
    },
    {
      label : 'Delete App Data', click : () => { deleteAppData(); },
    },
  ];

  const debugSubmenu = {
    label   : 'Debug',
    submenu : subMenuConstructorOptions,
  };

  return debugSubmenu;
};
