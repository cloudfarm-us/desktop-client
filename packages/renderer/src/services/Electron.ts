import { DEFAULT_PREFERENCES }              from 'DEFAULTS';
import { useCallback, useEffect, useState } from 'react';

const { ipcRenderer, MACHINEID } = window.electron;

// prettier-ignore
const requests: Record<'start' | 'stop' | 'get-preferences' | 'reset-preferences' | 'quit-app' | 'update-preferences', IpcActionReq> = {
  start                : { action: 'start', request: null },
  stop                 : { action: 'stop', request: null },
  'update-preferences' : { action: 'update-preferences', request: DEFAULT_PREFERENCES },
  'get-preferences'    : { action: 'get-preferences', request: null },
  'reset-preferences'  : { action: 'reset-preferences', request: null },
  'quit-app'           : { action: 'quit-app', request: null },
};

// Hook
const useAsync = <T, A = any, E = string>(
  asyncFunction: (args?: A) => Promise<T>,
  args?: A,
  immediate = true,
  dep?: number,
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const execute = useCallback(
    async (args2?: A) => {
      setStatus('pending');
      setValue(null);
      setError(null);
      return asyncFunction(args2)
        .then((response: any) => {
          setValue(response);
          setStatus('success');
        })
        .catch((err: unknown) => {
          setError(err as E);
          setStatus('error');
        });
    },
    dep ? [dep] : [],
  );
  useEffect(() => {
    if (immediate) {
      void execute(args);
    }
  }, [execute, immediate]);

  return {
    execute, status, value, error,
  };
};

export const usePreferences = (hydrate?: number) => {
  return useAsync<Preferences, never>(
    async () => {
      return ipcRenderer
        .invoke('async-message', requests['get-preferences'])
        .then((reply: IpcActionRes) => {
          if (
            reply.action === 'get-preferences'
            && reply.response.status === 'ok'
          ) return reply.response.data;
          throw new Error('incorrect reply from main');
        });
    },
    undefined,
    true,
    hydrate,
  );
};

export const useUpdatePreferences = (hydrate?: (ts: number) => void) => {
  return useAsync<IpcActionRes, Preferences>(
    async (newPreferences: Preferences = DEFAULT_PREFERENCES) => {
      const request = {
        action  : 'update-preferences',
        request : newPreferences,
      };
      return ipcRenderer.invoke('async-message', request).then((reply) => {
        hydrate?.(Date.now());
        return reply as IpcActionRes;
      });
    },
    undefined,
    false,
  );
};

export const useResetPreferences = (hydrate?: (ts: number) => void) => {
  return useAsync<IpcActionRes>(
    async () => {
      return ipcRenderer
        .invoke('async-message', requests['reset-preferences'])
        .then((reply) => {
          hydrate?.(Date.now());
          return reply as IpcActionRes;
        });
    },
    undefined,
    false,
  );
};

export const useAsyncPreferences = () => {
  const [ts, hydrate] = useState<number>(Date.now());

  const rehydrate = () => {
    hydrate(Date.now());
  };

  const { value: preferences, status, error: error1 } = usePreferences(ts);
  const { execute: updatePreferences, error: error2 } =    useUpdatePreferences(rehydrate);
  const { execute: resetPreferences, error: error3 } =    useResetPreferences(rehydrate);

  const error = [error1, error2, error3].filter((e) => Boolean(e))[0];

  return {
    ts,
    preferences,
    status,
    error,
    updatePreferences,
    resetPreferences,
  };
};

export { MACHINEID };
