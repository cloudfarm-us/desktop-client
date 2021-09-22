import { powerSaveBlocker } from 'electron';
import { MainProcess }      from 'main-process';

import { Submodule }        from './abstract-module';

export class PowersaveBlockerModule extends Submodule {
  private blockingID: number | null | undefined;

  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'powersave-blocker-module.ts');
  }

  init(): void {
    this.update();
  }

  update(): void {
    const currentStatus = this.isBlocking();
    const targetStatus = this.shouldBlock();

    if (currentStatus && !targetStatus) {
      this.stopBlocking();
    } else if (!currentStatus && targetStatus) {
      this.startBlocking();
    }
  }

  isBlocking() {
    return this.blockingID && powerSaveBlocker.isStarted(this.blockingID);
  }

  startBlocking() {
    if (this.blockingID === undefined || this.blockingID === null) { this.blockingID = powerSaveBlocker.start('prevent-app-suspension'); }
  }

  stopBlocking() {
    if (this.blockingID) powerSaveBlocker.stop(this.blockingID);
    this.blockingID = null;
  }

  shouldBlock() {
    return this.mainProcess.getPreferences().preventSystemSuspending;
  }
}
