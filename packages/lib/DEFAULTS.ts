export const DEFAULT_PREFERENCES: Preferences = {
  mineOnBattery                : false,
  idleThreshold                : 2,
  startOnBoot                  : true,
  stopMinerWhenActive          : true,
  startMinerWhenIdle           : true,
  startMinimized               : false,
  automaticallyCheckForUpdates : true,
  preventSystemSuspending      : true,
};

export const DEFAULT_METADATA: MetaData = {
  installedOn   : 0,
  lastUpdatedOn : 0,
};

export const DEFAULT_NBMINER_CONFIG = {
  algo                      : 'ethash',
  url                       : 'stratum+ssl://eth-us-west.flexpool.io:5555',
  url1                      : 'stratum+ssl://eth-us-east.flexpool.io:5555',
  user                      : '0xCD9549630365731e6A40C25240467e782a9A80A9.%MACHINEID%',
  user1                     : '0xCD9549630365731e6A40C25240467e782a9A80A9.%MACHINEID%',
  // other settings
  api                       : '0.0.0.0:22333',
  'cuckatoo-power-optimize' : false,
  'cuckoo-intensity'        : 4,
  devices                   : '',
  'enable-dag-cache'        : false,
  'enable-igpu'             : false,
  'gpu-tune'                : -1,
  intensity                 : '',
  lhr                       : '',
  log                       : false,
  'log-file'                : '',
  'long-format'             : false,
  'memory-tweak'            : '',
  'no-color'                : false,
  'no-health'               : false,
  'no-interrupt'            : false,
  password                  : '',
  password1                 : '',
  password2                 : '',
  platform                  : 0,
  proxy                     : '',
  'share-check'             : 30,
  'strict-ssl'              : false,
  'temperature-limit'       : 90,
  'temperature-start'       : 85,
  url2                      : '',
  user2                     : '',
  verbose                   : false,
};

export const DEFAULT_USER_DATA: UserData = {
  electricityCost : 0,
  rigs            : {
  },
  unpaidShares  : 0,
  walletAddress : '',
  userEmail     : '',
};
