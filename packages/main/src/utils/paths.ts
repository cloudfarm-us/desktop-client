import { app, shell } from 'electron';
import { join }       from 'path';
import { URL }        from 'url';
import { restartApp } from 'utils';

const packagedAssetsDir = join(process.resourcesPath, 'assets');
const unpackagedAssetsDir = join(__dirname, '../../../assets');

const ASSETS_DIR = app.isPackaged ? packagedAssetsDir : unpackagedAssetsDir;

export const getAssetPath = (...paths: string[]): string => {
  return join(ASSETS_DIR, ...paths);
};

export const getUserDataPath = () => {
  return app.getPath('userData');
};

export const getRendererEntryUrl = (dirName: string) => {
  return import.meta.env.MODE === 'development'
    && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', `file://${dirName}`).toString();
};

export const openAppDataDir = async () => {
  return shell.openPath(getUserDataPath());
};

export const deleteAppData = () => {
  void shell.trashItem(getUserDataPath());
  restartApp();
};
