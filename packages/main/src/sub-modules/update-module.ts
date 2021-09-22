import { autoUpdater } from 'electron-updater';
import { MainProcess } from 'main-process';

import { Submodule }   from './abstract-module';

export class UpdateModule extends Submodule {
  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'update-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);
    autoUpdater.logger = this.logger;
  }

  async update() {
    if (this.shouldCheckForUpdates())  return this.checkForUpdates();
    return Promise.resolve();
  }

  init() {
    return undefined;
  }

  private async checkForUpdates() {
    return autoUpdater.checkForUpdatesAndNotify().catch((e) => {
      console.error('Failed check updates:', e);
    });
  }

  private shouldCheckForUpdates() {
    const preferences = this.mainProcess.getPreferences();
    return (
      import.meta.env.MODE === 'production'
      && preferences.automaticallyCheckForUpdates
    );
  }
}
