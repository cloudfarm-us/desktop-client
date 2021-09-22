import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { ipcMain }                               from 'electron';
import { MainProcess }                           from 'main-process';

import { Submodule }                             from './abstract-module';

export class IpcModule extends Submodule {
  constructor(mainProcess: MainProcess) {
    super(mainProcess, 'ipc-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);
  }

  init() {
    this.setup();
  }

  update() {
    return undefined;
  }

  // prettier-ignore
  private readonly handleAsyncMessage = async (_:IpcMainInvokeEvent, req: IpcActionReq): Promise<IpcActionRes> => {
    this.logger.info(`Received ${req.action} request`);
    switch (req.action) {
      case 'start':
        this.mainProcess.startMining(true);
        return {
          action   : req.action,
          response : {
            status : 'ok', data : null,
          },
        };
      case 'stop':
        await this.mainProcess.stopMining();
        return {
          action   : req.action,
          response : {
            status : 'ok', data : null,
          },
        };
      case 'update-miner-config':
        this.mainProcess.updateMinerConfig(req.request);
        return {
          action   : req.action,
          response : {
            status : 'ok', data : null,
          },
        };
      case 'get-miner-config':
        return {
          action   : req.action,
          response : {
            status : 'ok', data : this.mainProcess.getMinerConfig(),
          },
        };
      case 'reset-miner-config':
        this.mainProcess.resetMinerConfig();
        return {
          action   : req.action,
          response : {
            status : 'ok', data : null,
          },
        };
      case 'update-preferences':
        this.mainProcess.updatePreferences(req.request);
        return {
          action   : req.action,
          response : {
            status : 'ok', data : null,
          },
        };
      case 'get-preferences':
        return {
          action   : req.action,
          response : {
            status : 'ok', data : this.mainProcess.getPreferences(),
          },
        };
      case 'reset-preferences':
        this.mainProcess.resetPreferences();
        return {
          action   : req.action,
          response : {
            status : 'ok', data : null,
          },
        };
      case 'quit-app':
        this.mainProcess.quit();
        return {
          action   : req.action,
          response : {
            status : 'ok', data : null,
          },
        };
      default:
        return {
          action   : 'error',
          response : {
            status : 'error', error : new Error('Received unknown command'),
          },
        };
    }
  };

  // prettier-ignore
  private readonly handleSyncMessage = (event: IpcMainEvent, req: IpcActionReq) => {
    this.logger.info(`Received (SYNC) ${req.action} request`);

    const reply: Partial<IpcActionRes> = {
      action : req.action,
    };

    switch (req.action) {
      case 'update-miner-config':
        this.mainProcess.updateMinerConfig(req.request);
        reply.response = {
          status : 'ok', data : null,
        };
        event.returnValue = reply;
        break;
      case 'get-miner-config':
        event.returnValue = this.mainProcess.getMinerConfig();
        break;
      case 'update-preferences':
        this.mainProcess.updateMinerConfig(req.request);
        reply.response = {
          status : 'ok', data : null,
        };
        event.returnValue = reply;
        break;
      case 'get-preferences':
        event.returnValue = this.mainProcess.getPreferences();
        break;
      default:
    }
    return undefined;
  };

  private setup() {
    this.cleanup();
    ipcMain.handle('async-message', this.handleAsyncMessage);
    ipcMain.on('sync-message', this.handleSyncMessage);
  }

  private cleanup() {
    ipcMain.removeListener('async-message', this.handleAsyncMessage);
    ipcMain.removeListener('synchronous-message', this.handleSyncMessage);
  }
}
