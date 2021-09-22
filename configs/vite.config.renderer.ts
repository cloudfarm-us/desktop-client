import reactRefresh from '@vitejs/plugin-react-refresh';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { electron } from '../package.json';
import { renderer } from './paths';

const PACKAGE_ROOT = renderer;

const config = defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  plugins: [
    reactRefresh(),
    tsconfigPaths()
  ],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  envDir: process.cwd(),
  build: {
    sourcemap: process.env.MODE === 'development' ? true : false,
    target: `chrome${electron.vendors.chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    rollupOptions: {
      external: [...builtinModules],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  esbuild: {
    jsxInject: 'import * as React from "react";',
  },
});

export default config;
