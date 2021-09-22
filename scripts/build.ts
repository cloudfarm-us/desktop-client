#!/usr/bin/node
import { basename } from 'path';
import { build }    from 'vite';

// eslint-disable-next-line no-multi-assign
const mode = (process.env.MODE = process.env.MODE ?? 'production');

const packagesConfigs = [
  'configs/vite.config.main.ts',
  'configs/vite.config.preload.ts',
  'configs/vite.config.renderer.ts',
];

const buildByConfig = async (configFile: string) => build({
  configFile, mode,
});
(async () => {
  try {
    const totalTimeLabel = 'Total bundle time';
    console.time(totalTimeLabel);

    // eslint-disable-next-line no-restricted-syntax
    for (const packageConfigPath of packagesConfigs) {
      const consoleGroupName = `${basename(packageConfigPath)}/`;
      console.group(consoleGroupName);

      const timeLabel = 'Bundle time';
      console.time(timeLabel);

      // eslint-disable-next-line no-await-in-loop
      await buildByConfig(packageConfigPath);

      console.timeEnd(timeLabel);
      console.groupEnd();
      console.log('\n');
    }

    console.timeEnd(totalTimeLabel);
  } catch (e: unknown) {
    console.error(e);
    process.exit(1);
  }
})();
