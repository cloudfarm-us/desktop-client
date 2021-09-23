/* eslint-disable max-classes-per-file */
import { autoUpdater } from 'electron-updater';
import { MainProcess } from 'main-process';
import { Submodule }   from './abstract-module';

const FOUR_HOURS = 1000 * 60 * 60 * 4;

export class UpdateModule extends Submodule {
  interval: NodeJS.Timer | undefined;
  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'update-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);
    autoUpdater.logger = this.logger;
  }

  async update() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.init();
    return Promise.resolve();
  }

  init() {
    if (this.shouldCheckForUpdates()) {
      this.interval = setInterval(() => {
        autoUpdater.checkForUpdates().catch(console.error);
      }, FOUR_HOURS);
      autoUpdater.checkForUpdates().catch(console.error);
      autoUpdater.checkForUpdatesAndNotify().catch(console.error);
    }
  }

  private shouldCheckForUpdates() {
    // const preferences = this.mainProcess.getPreferences();

    // return (
    //   import.meta.env.MODE === 'production'
    //   && preferences.automaticallyCheckForUpdates
    // );

    return true;
  }
}
