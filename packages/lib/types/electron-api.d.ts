type Reply<T> = { status: 'ok'; data: T } | { status: 'error'; error: Error };

// prettier-ignore
type IpcPair =
  | { action: 'start';                    request: null;               response: Reply<null> }
  | { action: 'stop';                     request: null;               response: Reply<null> }
  | { action: 'update-miner-config';      request: MinerConfiguration; response: Reply<null> }
  | { action: 'get-miner-config';         request: null;               response: Reply<MinerConfiguration> }
  | { action: 'reset-miner-config';       request: null;               response: Reply<null> }
  | { action: 'update-preferences';       request: Preferences;        response: Reply<null> }
  | { action: 'get-preferences';          request: null;               response: Reply<Preferences> }
  | { action: 'reset-preferences';        request: null;               response: Reply<null> }
  | { action: 'quit-app';                 request: null;               response: Reply<null> }
  | { action: 'error';                    request: null;               response: Reply<null> };

// prettier-ignore
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
type IpcAction = IpcPair extends { action: infer T } ? T : never;
type IpcActionReq = DistributiveOmit<IpcPair, 'response'>;
type IpcActionRes = DistributiveOmit<IpcPair, 'request'>;

interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>;
  readonly ipcRenderer: Readonly<Electron.IpcRenderer>;
  readonly platform: Readonly<NodeJS.Platform>;
  readonly MACHINEID: Readonly<string>;
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;
}
