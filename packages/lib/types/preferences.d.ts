declare type IdlePreferences = {
  startMinerWhenIdle: boolean;
  stopMinerWhenActive: boolean;
  idleThreshold: number;
  mineOnBattery: boolean;
  preventSystemSuspending: boolean;
};

declare type StartupPreferences = {
  startOnBoot: boolean;
  startMinimized: boolean;
};

declare type UpdatePreferences = {
  automaticallyCheckForUpdates: boolean;
};

// declare type GenericPreferences = {
//   [index in string]: string;
// };

declare type Preferences = IdlePreferences &
StartupPreferences &
UpdatePreferences;
// GenericPreferences;
