#!/usr/bin/node
import { writeFileSync }  from 'fs';
import { basename, join } from 'path';
import { build }          from 'vite';

import config             from '../configs/build.config';

const mode = 'production';
process.env.MODE = mode;

const buildByConfig = async (configFile: string) => build({
  configFile, mode,
});

(async () => {
  try {
    const totalTimeLabel = 'Total bundle time';
    console.time(totalTimeLabel);

    const consoleGroupName1 = `${basename('configs/vite.config.main.ts')}/`;
    console.group(consoleGroupName1);
    const timeLabel1 = 'Bundle time';
    console.time(timeLabel1);
    await buildByConfig('configs/vite.config.main.ts');
    console.timeEnd(timeLabel1);
    console.groupEnd();
    console.log('\n');

    const consoleGroupName2 = `${basename('configs/vite.config.preload.ts')}/`;
    console.group(consoleGroupName2);
    const timeLabel2 = 'Bundle time';
    console.time(timeLabel2);
    await buildByConfig('configs/vite.config.preload.ts');
    console.timeEnd(timeLabel2);
    console.groupEnd();
    console.log('\n');

    const consoleGroupName3 = `${basename('configs/vite.config.renderer.ts')}/`;
    console.group(consoleGroupName3);
    const timeLabel3 = 'Bundle time';
    console.time(timeLabel3);
    await buildByConfig('configs/vite.config.renderer.ts');
    console.timeEnd(timeLabel3);
    console.groupEnd();
    console.log('\n');

    console.timeEnd(totalTimeLabel);

    console.log('-'.repeat(80));
    console.log('Final build config: ');
    console.log();
    console.log(config);
    const configPath = join(process.cwd(), 'build.config.json');
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('-'.repeat(80));
    console.log();
  } catch (e: unknown) {
    console.error(e);
    process.exit(1);
  }
})();
