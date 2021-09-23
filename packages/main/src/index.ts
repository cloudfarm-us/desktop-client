// import * as Sentry                              from '@sentry/electron';
import { is }                                                                              from 'electron-util';
import type { BrowserWindowConstructorOptions }                                            from 'electron';
import { app }                                                                             from 'electron';
import { MainProcess }                                                                     from 'main-process';
import { join }                                                                            from 'path';
import { assertSingleInstance, createLogger, getAssetPath, installDevExtension, setAUMID } from 'utils';

assertSingleInstance();

const DEFAULT_BROWSER_OPTIONS: BrowserWindowConstructorOptions = {
  width           : 600,
  height          : 800,
  icon            : is.windows ? getAssetPath('img', 'icon.ico') : getAssetPath('img', 'icon.png'),
  show            : false,
  title           : app.name,
  autoHideMenuBar : true,
  webPreferences  : {
    nativeWindowOpen : true,
    preload          : join(__dirname, '../../preload/dist/index.cjs'),
    nodeIntegration  : true,
    contextIsolation : false,
  },
};

// Sentry.init({ dsn: 'https://b68a61df2d29417eb5b3471bc337f386@o976609.ingest.sentry.io/5972741' });

const logger = createLogger('(main)-index.ts');
void app
  .whenReady()
  .then(setAUMID)
  .then(async () => {
    if (import.meta.env.MODE === 'development') {
      logger.info('Installing dev extension...');
      return installDevExtension();
    }
    return Promise.resolve(null);
  })
  .then(() => {
    logger.info('constructing main process');
    const mainProcess = new MainProcess(DEFAULT_BROWSER_OPTIONS);
    logger.info('initializing submodules...');
    mainProcess.init();
  });
