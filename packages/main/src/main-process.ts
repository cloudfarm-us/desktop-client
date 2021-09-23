import { DEFAULT_METADATA, DEFAULT_PREFERENCES } from 'DEFAULTS';
import Store                                     from 'electron-store';
import { openSystemPreferences }                 from 'electron-util';
import { app, BrowserWindowConstructorOptions }  from 'electron';
import { machineIdSync }                         from 'node-machine-id';
import { IdlePowerModule,
  IpcModule,
  LoginSettingsModule,
  MenuModule,
  MinerModule,
  PowersaveBlockerModule,
  TrayModule,
  UpdateModule,
  WindowModule } from 'sub-modules';
import { getDefaultMinerConfig, restartApp } from 'utils';

export class MainProcess {
  private readonly idlePowerModule: IdlePowerModule;
  private readonly ipcModule: IpcModule;
  private readonly loginSettingsModule: LoginSettingsModule;
  private readonly menuModule: MenuModule;
  private readonly minerModule: MinerModule;
  private readonly powerSaveBlockerModule: PowersaveBlockerModule;
  private readonly updateModule: UpdateModule;
  private readonly trayModule: TrayModule;
  private readonly windowModule: WindowModule;
  private readonly preferences: Store<Preferences>;
  private readonly metaData: Store<MetaData>;
  private readonly minerConfig: Store<MinerSettings>;

  constructor(browserOptions: BrowserWindowConstructorOptions) {
    this.metaData = new Store<MetaData>({
      name     : 'metadata',
      defaults : DEFAULT_METADATA,
    });

    this.preferences = new Store<Preferences>({
      name     : 'preferences',
      defaults : DEFAULT_PREFERENCES,
    });

    this.minerConfig = new Store<MinerSettings>({
      name     : 'config',
      defaults : getDefaultMinerConfig(),
    });

    this.idlePowerModule = new IdlePowerModule(this, true);
    this.ipcModule = new IpcModule(this);
    this.loginSettingsModule = new LoginSettingsModule(this);
    this.menuModule = new MenuModule(this);
    this.minerModule = new MinerModule(this);
    this.powerSaveBlockerModule = new PowersaveBlockerModule(this);
    this.trayModule = new TrayModule(this);
    this.updateModule = new UpdateModule(this);
    this.windowModule = new WindowModule(this, browserOptions);
  }

  init() {
    this.idlePowerModule.init();
    this.ipcModule.init();
    this.loginSettingsModule.init();
    this.menuModule.init();
    void this.minerModule.init();
    this.powerSaveBlockerModule.init();
    this.trayModule.init();
    this.updateModule.init();
    this.windowModule.init();
  }

  isMining() {
    return this.minerModule.isMining();
  }

  startMining(override = false) {
    if (override) this.idlePowerModule.disable();
    this.minerModule.startMining();
  }

  async stopMining() {
    return this.minerModule.stopMining();
  }

  updateMinerConfig(newConfig: MinerSettings) {
    const raw = JSON.stringify(newConfig);
    const rawReplaced = raw.replace(/%MACHINEID%/gi, machineIdSync());
    const parsed = JSON.parse(rawReplaced) as MinerSettings;

    console.log(parsed);

    this.minerConfig.set(parsed);
    this.minerModule.update();
  }

  getMinerConfig(): MinerSettings {
    return this.minerConfig.store;
  }

  resetPreferences() {
    this.preferences.clear();
    this.updateAll();
  }

  resetMinerConfig() {
    this.minerConfig.clear();
    this.minerModule.update();
  }

  openPreferencesInEditor() {
    this.preferences.openInEditor();
  }

  getPreferences(): Preferences {
    return this.preferences.store;
  }

  updatePreferences(newPreferences: Preferences) {
    this.preferences.set(newPreferences);
    this.updateAll();
  }

  async openSystemPreferences() {
    return openSystemPreferences('security', 'Firewall');
  }

  restartApp() {
    restartApp();
  }

  quit() {
    app.quit();
  }

  getMetaData() {
    return this.metaData;
  }

  updateMetaData(newMetaData: MetaData) {
    this.metaData.set(newMetaData);
  }

  private updateAll() {
    this.idlePowerModule.update();
    this.ipcModule.update();
    this.loginSettingsModule.update();
    this.menuModule.update();
    this.minerModule.update();
    this.powerSaveBlockerModule.update();
    this.trayModule.update();
    void this.updateModule.update();
    this.windowModule.update();
  }
}
