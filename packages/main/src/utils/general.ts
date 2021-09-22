import { DEFAULT_NBMINER_CONFIG } from 'DEFAULTS';
import { app }                    from 'electron';
import { machineIdSync }          from 'node-machine-id';

import { createLogger }           from './logging';

export const assertSingleInstance = () => {
  const isSingleInstance = app.requestSingleInstanceLock();
  if (!isSingleInstance) {
    console.log('Not single instance, quitting');
    app.quit();
    process.exit(0);
  }
};

export const setAUMID = async () => {
  const logger = createLogger('general.ts:set-aumid');

  return import('package.json').then(({ appId }) => {
    logger.info(`setting app AUMID to ${appId}`);
    app.setAppUserModelId(appId);
  });
};

export const isDevelopment = () => {
  return import.meta.env.MODE === 'development';
};

export const restartApp = () => {
  app.relaunch();
  app.quit();
};

export const getDefaultMinerConfig = () => {
  return JSON.parse(
    JSON.stringify(DEFAULT_NBMINER_CONFIG).replace(
      /%MACHINEID%/g,
      machineIdSync(),
    ),
  ) as MinerConfiguration;
};
