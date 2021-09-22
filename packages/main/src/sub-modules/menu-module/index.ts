import { is }                  from 'electron-util';
import { Menu }                from 'electron';
import { MainProcess }         from 'main-process';
import { Submodule }           from 'sub-modules/abstract-module';
import { isDevelopment }       from 'utils';

import { createDebugSubmenu }  from './debug-submenu';
import { linxWindowsTemplate } from './linux-windows-template';
import { macTemplate }         from './macos-template';

export class MenuModule extends Submodule {
  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'menu-model-(index.ts)');
    const template = is.macos ? macTemplate : linxWindowsTemplate;

    if (isDevelopment())  template.push(createDebugSubmenu(this.mainProcess));

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  init() {
    return undefined;
  }

  update() {
    return undefined;
  }
}
