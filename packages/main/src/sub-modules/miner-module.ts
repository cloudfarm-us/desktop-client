import { ChildProcess, spawn, SpawnOptions } from 'child_process';
import { is }                                from 'electron-util';
import { app }                               from 'electron';
import type { MainProcess }                  from 'main-process';
import { join }                              from 'path';
import kill                                  from 'tree-kill';
import { getAssetPath }                      from 'utils';

import { Submodule }                         from './abstract-module';

const getConfigPath = () => join(app.getPath('userData'), 'config.json');
const getMinerPath = () => getAssetPath('miners', 'nbminer.exe');

export class MinerModule extends Submodule {
  private childProcess: ChildProcess | null | undefined;

  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'miner-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);

    if (!is.windows) {
      this.logger.warn(
        `Warning: unsupported OS (${process.platform}), miner will not run.`,
      );
    }
  }

  async init() {
    const metaData = this.mainProcess.getMetaData();
    if (is.windows && metaData.get('installedOn') === 0) {
      const cliArgs: string[] = ['--device-info', '--version'];
      this.startMining(cliArgs);
      await new Promise((resolve) => {
        setTimeout(resolve, 15 * 1000);
      });
      await this.stopMining();
      metaData.set('installedOn', Date.now());
    }
  }

  update() {
    if (this.isMining()) { this.restart(); }
  }

  isMining() {
    return Boolean(this.childProcess);
  }

  startMining(cliArgs?: string[]) {
    if (!this.isMining()) {
      this.childProcess = this.spawnMiner(cliArgs);
    }
  }

  async stopMining() {
    return this.killMiner()
      .then(() => {
        this.childProcess = null;
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }

  private spawnMiner(cliArgs?: string[]) {
    const minerPath = `"${getMinerPath()}"`;
    const configPath = `"${getConfigPath()}"`;

    const options: SpawnOptions = {
      stdio    : 'inherit',
      detached : false,
      shell    : process.env.ComSpec || 'cmd.exe',
    };
    const args: string[] = cliArgs ?? ['-c', configPath];

    const report =      'Received request to start miner\n'
      + `- minerPath : ${minerPath}\n`
      + `- configPath: ${configPath}`;

    this.logger.info(report);

    if (is.windows)  return spawn(minerPath, args, options);

    this.logger.warn(
      `received request to start miner but platform (${process.platform}) is currently incompatible`,
    );
    return null;
  }

  private async killMiner() {
    return new Promise((resolve, reject) => {
      if (
        this.childProcess === undefined
        || this.childProcess === null
        || this.childProcess.pid === undefined
      ) {
        resolve(undefined);
      } else {
        kill(this.childProcess.pid, (err?: Error) => {
          if (err) { reject(err); } else { resolve(undefined); }
        });
      }
    });
  }

  private restart() {
    this.stopMining()
      .then(() => {
        this.startMining();
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }
}
