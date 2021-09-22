import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { electron } from '../package.json';
import { main } from './paths';

const PACKAGE_ROOT = main;

const config = defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  plugins: [
    tsconfigPaths({
      root: PACKAGE_ROOT
    }),
  ],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  envDir: process.cwd(),
  build: {
    commonjsOptions: {
      ignore: [
        'glob'
      ],
    },
    dynamicImportVarsOptions: {
      warnOnError: true,
    },
    sourcemap: process.env.MODE === 'development' ? true : false,
    target: `node${electron.vendors.node}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE === 'development' ? false : 'terser',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        'electron',
        'electron-devtools-installer',
        ...builtinModules
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
});

export default config;
