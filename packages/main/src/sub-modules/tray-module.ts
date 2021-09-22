import { openUrlMenuItem }         from 'electron-util';
import { Menu, nativeImage, Tray } from 'electron';
import { MainProcess }             from 'main-process';
import { homepage }                from 'package.json';
import { getAssetPath }            from 'utils';

import { Submodule }               from './abstract-module';

export class TrayModule extends Submodule {
  private tray: Tray | undefined;

  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'tray-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);
  }

  init() {
    const preferences = this.mainProcess.getPreferences();
    const image = nativeImage.createFromPath(getAssetPath('img', 'gray.png'));
    const icon = image.resize({
      height : 32,
    });
    this.tray = new Tray(icon);

    // prettier-ignore
    const contextMenu = Menu.buildFromTemplate([
      {
        label : 'Show client',      type : 'normal', role : 'unhide',
      },
      {
        label : 'Hide client',      type : 'normal', role : 'close',
      },
      {
        label : 'Toggle miner',     type : 'checkbox', checked : this.mainProcess.isMining(),
      },
      {
        label : 'Mine while idle',  type : 'checkbox', checked : preferences.startMinerWhenIdle,
      },
      {
        type : 'separator',
      },
      openUrlMenuItem({
        label : 'View profile', url : homepage,
      }),
    ]);

    this.tray.setContextMenu(contextMenu);
    this.tray.setToolTip('Tool tip');
  }

  update() {
    return undefined;
  }
}
