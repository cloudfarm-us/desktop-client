import { join } from 'path';

export const root = join(__dirname, '..');

export const buildResources = join(root, 'buildResources');
export const assets = join(root, 'assets');
export const configs = join(root, 'configs');

export const main = join(root, 'packages', 'main');
export const preload = join(root, 'packages', 'preload');
export const renderer = join(root, 'packages', 'renderer');

export const packageJSON = join(root, 'package.json');

