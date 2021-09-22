import { build }      from 'electron-builder';
import { accessSync } from 'fs';
import { join }       from 'path';
import rimraf         from 'rimraf';

import config         from '../configs/build.config';

const args = process.argv.slice(2);

if (args[0] === '--no-asar')  config.asar = false;

let publish: 'never' | 'always' = 'never';

args.forEach((arg) => {
  if (arg === '--no-asar') {
    config.asar = false;
  } else if (arg === '--publish') {
    publish = 'always';
  }
});

console.log('-'.repeat(80));
console.log('Final build config: ');
console.log();
console.log(config);
console.log('-'.repeat(80));
console.log();

try {
  const outDir = join(process.cwd(), config.directories?.output ?? 'dist');
  accessSync(outDir);
  console.log('-'.repeat(80));
  console.log(`Removing outdir: ${outDir}`);
  rimraf.sync(outDir);
  console.log('Done...');
  console.log('-'.repeat(80));
  console.log();
} catch (_: unknown) {
  console.log('Error during packaging occurred');
}

console.log('-'.repeat(80));
console.log('Building...');
void build({
  publish,
  config,
});
