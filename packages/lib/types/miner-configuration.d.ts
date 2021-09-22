declare type MinerConfiguration = Record<string, unknown>;

declare type ALGORITHM =
  | 'ethash'
  | 'cuckatoo'
  | 'cuckatoo32'
  | 'cuckoo_ae'
  | 'progpow_sero'
  | 'kawpow'
  | 'beamv3'
  | 'octopus'
  | 'ergo';

declare interface NBMinerConfiguration extends MinerConfiguration {
  algo: ALGORITHM;
  url: string;
  url1: string;
  user: string;
  user1: string;
  // other settings
  api: string;
  'cuckatoo-power-optimize': boolean;
  'cuckoo-intensity': number;
  devices: string;
  'enable-dag-cache': boolean;
  'enable-igpu': boolean;
  intensity: string;
  lhr: string;
  log: boolean;
  'log-file': string;
  'long-format': boolean;
  'memory-tweak': string;
  'no-color': boolean;
  'no-health': boolean;
  'no-interrupt': boolean;
  password: string;
  password1: string;
  password2: string;
  platform: number;
  proxy: string;
  'share-check': number;
  'strict-ssl': boolean;
  'temperature-limit': number;
  'temperature-start': number;
  url2: string;
  user2: string;
  verbose: boolean;
}
