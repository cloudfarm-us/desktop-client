import { contextBridge, ipcRenderer } from 'electron';
import { machineIdSync }              from 'node-machine-id';

const ELECTRON_KEY = 'electron';

/** @see https://github.com/electron/electron/issues/21437#issuecomment-573522360 */
const api: ElectronApi = {
  versions  : process.versions,
  ipcRenderer,
  platform  : process.platform,
  MACHINEID : machineIdSync(),
};

/** @see https://github.com/substack/deep-freeze */
const deepFreeze = <T>(obj: T) => {
  const objOrFn = (val: any) => typeof val === 'object' || typeof val === 'function';

  const shouldFreeze = (val: any) => objOrFn(val) && !Object.isFrozen(val);
  Object.entries(obj).forEach(([, val]) => (shouldFreeze(val) ? deepFreeze(val) : undefined));

  const frozenObj = Object.freeze(obj);
  return frozenObj;
};

/**
 * If contextIsolated enabled use contextBridge, Else use fallback
 * @see https://www.electronjs.org/docs/api/context-bridge
 * Note: Spectron tests can't work in isolated context
 * @see https://github.com/electron-userland/spectron/issues/693#issuecomment-748482545
 */
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld(ELECTRON_KEY, api);
} else {
  const frozenApi = deepFreeze<ElectronApi>(api);
  window[ELECTRON_KEY] = frozenApi;
  window.electronRequire = require;
}
