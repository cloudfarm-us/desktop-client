import { powerMonitor }         from 'electron';
import { MainProcess }          from 'main-process';
import { createLogger, Logger } from 'utils';

import { Submodule }            from './abstract-module';

const ACTIVE_CHECK_PERIOD = 1;

export class IdlePowerModule extends Submodule {
  private startInterval: NodeJS.Timer | null | undefined;

  private stopInterval: NodeJS.Timer | null | undefined;

  private verboseInterval: NodeJS.Timer | null | undefined;

  private readonly verbose: boolean;

  private enabled: boolean;

  private readonly watchingLogger: Logger;

  constructor(
    mainProcess: MainProcess,
    verbose = import.meta.env.MODE === 'development',
  ) {
    super(mainProcess, 'idle-power-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);
    this.verbose = verbose;
    this.enabled = true;
    this.watchingLogger = createLogger('watching');
  }

  init() {
    this.startWatch();
  }

  update() {
    this.restartWatch();
  }

  enable() {
    this.enabled = true;
    this.restartWatch();
  }

  disable() {
    this.enabled = false;
    this.stopWatch();
  }

  private restartWatch() {
    this.stopWatch();
    this.startWatch();
  }

  private startWatch() {
    const preferences = this.mainProcess.getPreferences();

    this.startInterval = setInterval(() => {
      if (this.shouldStartMiner(preferences)) {
        this.logger.info('Idle user, starting miner...');
        this.mainProcess.startMining();
      }
    }, preferences.idleThreshold * 1000 * 60);

    this.stopInterval = setInterval(async () => {
      if (this.shouldStopMiner(preferences)) {
        this.logger.info(
          'Active user or this process is now running on battery, stopping miner...',
        );
        await this.mainProcess.stopMining();
      }
    }, ACTIVE_CHECK_PERIOD * 1000);

    if (this.verbose) {
      this.verboseInterval = this.logVerbose(preferences);
    }
  }

  private stopWatch() {
    if (this.startInterval) clearInterval(this.startInterval);
    if (this.stopInterval) clearInterval(this.stopInterval);
    if (this.verboseInterval) clearInterval(this.verboseInterval);
    this.startInterval = null;
    this.stopInterval = null;
    this.verboseInterval = null;
  }

  private logVerbose(preferences: Preferences) {
    let currentTimeStep = preferences.idleThreshold;

    let status = powerMonitor.getSystemIdleState(
      preferences.idleThreshold * 60,
    );
    return setInterval(() => {
      if (currentTimeStep % preferences.idleThreshold === 0) {
        status = powerMonitor.getSystemIdleState(
          preferences.idleThreshold * 60,
        );
      }

      this.watchingLogger.watch({
        platform          : process.platform,
        onBattery         : powerMonitor.isOnBatteryPower(),
        status,
        currentIdleTime   : this.getCurrentIdleTime(),
        remainingIdleTime : this.getRemainingIdleTime(preferences),
      });

      currentTimeStep =        currentTimeStep - 1 < 0
        ? preferences.idleThreshold * 60
        : currentTimeStep - 1;
    }, 1000);
  }

  private shouldStartMiner(preferences: Preferences) {
    if (!this.enabled)  return false;

    if (this.mainProcess.isMining())  return false;

    if (!preferences.startMinerWhenIdle)  return false;

    if (powerMonitor.onBatteryPower && !preferences.mineOnBattery)  return false;

    return (
      powerMonitor.getSystemIdleState(preferences.idleThreshold * 60) === 'idle'
    );
  }

  private shouldStopMiner(preferences: Preferences) {
    if (!this.enabled)  return false;

    if (!preferences.stopMinerWhenActive)  return false;

    if (!this.mainProcess.isMining())  return false;

    if (powerMonitor.onBatteryPower && !preferences.mineOnBattery)  return true;

    if (
      powerMonitor.getSystemIdleState(preferences.idleThreshold * 60)
      === 'active'
    )  return true;

    return false;
  }

  private getCurrentIdleTime() {
    return powerMonitor.getSystemIdleTime();
  }

  private getRemainingIdleTime(preferences: Preferences) {
    return Math.max(
      preferences.idleThreshold * 60 - this.getCurrentIdleTime(),
      0,
    );
  }
}
