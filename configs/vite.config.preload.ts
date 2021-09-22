import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { electron } from '../package.json';
import { preload } from './paths';

const PACKAGE_ROOT = preload;

const config = defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  plugins: [
    tsconfigPaths(
      { root: PACKAGE_ROOT }
    ),
  ],
  build: {
    sourcemap: process.env.MODE === 'development' ? 'inline' : false,
    target: `chrome${electron.vendors.chrome}`,
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
      external: ['electron', ...builtinModules],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
});

export default config;
