#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
import { blue, cyan, gray, green, red, white, yellow }  from 'chalk';
import type { ChildProcess }                            from 'child_process';
import { spawn }                                        from 'child_process';
import electronPath                                     from 'electron';
import Spinner                                          from 'ink-spinner';
import { Box, render, Text }                            from 'ink';
import { createElement, Fragment, useEffect, useState } from 'react';
import stripFinalNewline                                from 'strip-final-newline';
import type { InlineConfig, ViteDevServer }             from 'vite';
import { build, createServer }                          from 'vite';

// eslint-disable-next-line no-multi-assign
const mode = (process.env.MODE = process.env.MODE ?? 'development');

const sharedConfig: InlineConfig = {
  mode,
  build : {
    watch : {
    },
  },
  logLevel : 'warn',
};

// prettier-ignore
const getWatcher = async (name: string, configFile: string, writeBundle: () => void) => {
  return build({
    ...sharedConfig,
    configFile,
    plugins : [{
      name, writeBundle,
    }],
  });
};

const hanndleStdout = (d: Buffer) => {
  const output = stripFinalNewline(d).toString();
  const lines = output.split(/\r?\n/g);
  for (const line of lines) {
    console.warn(yellow('[main]'), line);
  }
};

const handleStdErr = (d: Buffer) => {
  const output = stripFinalNewline(d).toString();
  if (!output.includes('ExtensionLoadWarning')) {
    const lines = output.split(/\r?\n/g);
    for (const line of lines) {
      console.warn(red('[main]'), line);
    }
  }
};

// prettier-ignore
const setupMainPackageWatcher = async (viteDevServer: ViteDevServer) => {
  const protocol = `http${viteDevServer.config.server.https ? 's' : ''}:`;
  const host = viteDevServer.config.server.host as string ?? 'localhost';
  const { port } = viteDevServer.config.server;
  const path = '/';
  process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${String(port)}${path}`;

  const handle: { childProcess: ChildProcess | null } = {
    childProcess : null,
  };

  return getWatcher(
    'reload-app-on-main-package-change',
    'configs/vite.config.main.ts',
    () => {
      if (handle.childProcess !== null) {
        handle.childProcess.kill('SIGINT');
        handle.childProcess = null;
      }

      handle.childProcess = spawn(String(electronPath), ['.'], {
        stdio : ['ignore', 'pipe', 'pipe', 'ipc'],
      });

      handle.childProcess.stdout?.on('data', hanndleStdout);
      handle.childProcess.stderr?.on('data', handleStdErr);

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      render(createElement(InkConsole, {
        childProcess : handle.childProcess,
      }));
    },
  );
};

// prettier-ignore
const setupPreloadPackageWatcher = async (viteDevServer: ViteDevServer) => {
  return getWatcher(
    'reload-page-on-preload-package-change',
    'configs/vite.config.preload.ts',
    () => {
      viteDevServer.ws.send({
        type : 'full-reload',
      });
    },
  );
};

// prettier-ignore
(async () => {
  try {
    const viteDevServer = await createServer({
      ...sharedConfig, configFile : 'configs/vite.config.renderer.ts',
    });
    await viteDevServer.listen();
    await setupPreloadPackageWatcher(viteDevServer);
    await setupMainPackageWatcher(viteDevServer);
  } catch (e: unknown) {
    console.error(e);
    process.exit(1);
  }
})();

const PREFIX_LENGTH = 30;

type LogType = {
  badge: string;
  label: string;
};

const logTypes: Record<string, LogType> = {
  log : {
    badge : white('-'),
    label : white(''),
  },
  info : {
    badge : blue('ℹ'),
    label : blue('info'),
  },
  error : {
    badge : red('✖'),
    label : red('error'),
  },
  success : {
    badge : green('✔'),
    label : green('success'),
  },
  warn : {
    badge : yellow('⚠'),
    label : yellow('warn'),
  },
};
type PowerStatus = {
  status: 'active' | 'idle';
  currentIdleTime: string;
  remainingIdleTime: string;
  onBattery: boolean;
  platform: string;
};
type IPCMessage =
  | {
    kind: 'normal';
    prefix: string;
    level: 'info' | 'success' | 'warn' | 'error' | 'log';
    message: string;
    optionalParams: string[];
  }
  | {
    kind: 'watch';
    message: PowerStatus;
  };

type UIProps = {
  childProcess: ChildProcess;
};

const leftSpinner = (...children: React.ReactNode[]) => {
  return createElement(
    Text,
    {
      color : 'green',
    },
    createElement(Spinner, {
      type : 'dots',
    }),
    createElement(Text, {
      color : 'white',
    }, children),
  );
};

const InkConsole = ({ childProcess }: UIProps) => {
  const [powerState, setPowerState] = useState<PowerStatus>();

  useEffect(() => {
    childProcess.on('message', (ipcMessage: IPCMessage) => {
      if (ipcMessage.kind === 'watch') {
        setPowerState(ipcMessage.message);
      } else {
        const logType = logTypes[ipcMessage.level];
        const prefix = `[${ipcMessage.prefix}]`.padEnd(PREFIX_LENGTH);
        const preamble = gray(`${prefix} ${logType.badge} ${logType.label}`);
        console.log(
          `${preamble} › ${ipcMessage.message}`,
          ...ipcMessage.optionalParams,
        );
      }
    });
  }, []);

  if (powerState !== undefined) {
    return createElement(
      Box,
      null,
      createElement(
        Box,
        {
          marginTop : 1,
          padding   : 1,
        },
        createElement(
          Text,
          null,
          cyan(
            '---------------------------------------------------------------------------\n',
          ),
          // prettier-ignore
          createElement(
            Text,
            null,
            `${powerState.platform === 'darwin' ? '🍎' : '🪟'} Platform             : ${powerState.platform}\n`,
            `${powerState.onBattery ? '🔋' : '⚡️'} On battery           : ${String(powerState.onBattery ? green(powerState.onBattery) : red(powerState.onBattery))}\n`,
            `${powerState.status === 'idle' ? '🙈' : '🙉'} Idle State           : ${powerState.status === 'idle' ? green(powerState.status) : red(powerState.status)}\n`,
            leftSpinner(` Current Idle Time     : ${powerState.remainingIdleTime === '0' ? green(powerState.currentIdleTime) : red(powerState.currentIdleTime)}\n`),
            leftSpinner(` Remaining Idle Time   : ${powerState.remainingIdleTime === '0' ? green(powerState.remainingIdleTime) : red(powerState.remainingIdleTime)}\n\n`),
          ),
        ),
      ),
    );
  }
  return createElement(Fragment);
};

