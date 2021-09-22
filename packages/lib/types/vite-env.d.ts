// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

/**
 * Describes all existing environment variables and their types. Assists in autocomplete and typechecking
 * Base Interface: @see https://github.com/vitejs/vite/blob/eef51cb37db98a1ad9a541bdd3cd74736ff8488d/packages/vite/types/importMeta.d.ts#L62-L69
 * The value of the variable is set in scripts/start.ts and depends on configs/vite.config.main.js
 */
interface ImportMetaEnv {
  VITE_DEV_SERVER_URL: undefined | string;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    MODE: 'production' | 'development' | 'test';
  }
}
