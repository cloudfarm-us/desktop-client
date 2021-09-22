import { app }         from 'electron';
import { MainProcess } from 'main-process';

import { Submodule }   from './abstract-module';

export class LoginSettingsModule extends Submodule {
  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'login-settings-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);
  }

  init() {
    this.update();
  }

  update = () => {
    const preferences = this.mainProcess.getPreferences();
    const loginSettings = {
      openAtLogin : preferences.startOnBoot,
      path        : process.execPath,
      args        : [],
      enabled     : preferences.startOnBoot,
    };
    app.setLoginItemSettings(loginSettings);
  };
}
