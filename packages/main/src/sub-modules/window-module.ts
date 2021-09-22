import { app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ContextMenuParams,
  Event,
  Menu,
  shell } from 'electron';
import type { MainProcess }                   from 'main-process';
import { getRendererEntryUrl, isDevelopment } from 'utils';

import { Submodule }                          from './abstract-module';

export class WindowModule extends Submodule {
  private mainWindow: BrowserWindow | undefined;

  private readonly browserOptions: BrowserWindowConstructorOptions;

  constructor(
    mainProcess: MainProcess,
    browserOptions: BrowserWindowConstructorOptions,
  ) {
    super(mainProcess, 'window-module.ts');
    this.logger.info(`Constructing submodule: ${this.constructor.name}`);
    this.browserOptions = browserOptions;
  }

  update() {
    return undefined;
  }

  init() {
    app.on('activate', () => {
      if (this.mainWindow) {
        if (this.mainWindow.isMinimized()) this.mainWindow.restore();
        this.mainWindow.show();
      }
    });

    app.on('second-instance', () => {
      if (this.mainWindow) {
        if (this.mainWindow.isMinimized()) this.mainWindow.restore();
        this.mainWindow.show();
      }
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    this.createWindow(this.browserOptions).catch((e) => {
      console.error('Failed create window:', e);
    });
  }

  private async createWindow(browserOptions: BrowserWindowConstructorOptions) {
    this.mainWindow = new BrowserWindow(browserOptions);

    const preferences = this.mainProcess.getPreferences();

    this.mainWindow.on('ready-to-show', () => {
      if (!preferences.startMinimized) {
        this.mainWindow?.show();
      }
    });

    const pageUrl = getRendererEntryUrl(__dirname);

    const hideWindow = (event: Event) => {
      event.preventDefault();
      this.mainWindow!.hide();
    };

    this.mainWindow.on('close', hideWindow);

    app.on('before-quit', () => {
      this.mainWindow?.removeListener('close', hideWindow);
    });

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      this.logger.info(
        'Blocked window open request, redirecting to system default external link handler',
      );
      void shell.openExternal(details.url);
      return {
        action : 'deny',
      };
    });

    if (isDevelopment()) this.setupContextMenuInspector();

    return this.mainWindow.loadURL(pageUrl);
  }

  private setupContextMenuInspector(): void {
    const inspectElement = ({ x, y }: ContextMenuParams) => {
      this.mainWindow!.webContents.inspectElement(x, y);
    };

    this.mainWindow!.webContents.on('context-menu', (_, params) => {
      Menu.buildFromTemplate([
        {
          label : 'Inspect element',
          click : () => {
            inspectElement(params);
          },
        },
      ]).popup({
        window : this.mainWindow,
      });
    });
  }
}
