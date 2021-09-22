export type Logger = {
  info: (message?: any, ...optionalParams: any[]) => void;
  success: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
  log: (message?: any, ...optionalParams: any[]) => void;
  watch: (message?: any, ...optionalParams: any[]) => void;
};

export const createLogger = (prefix = ''): Logger => {
  // prettier-ignore
  if (process.send) {
    return {
      watch : (message?: any, ...optionalParams: any[]): void => {
        process.send!({
          kind : 'watch', message : message as string, optionalParams,
        });
      },
      info : (message?: any, ...optionalParams: any[]): void => {
        process.send!({
          prefix, level : 'info', message : message as string, optionalParams,
        });
      },
      success : (message?: any, ...optionalParams: any[]): void => {
        process.send!({
          prefix, level : 'success', message : message as string, optionalParams,
        });
      },
      warn : (message?: any, ...optionalParams: any[]): void => {
        process.send!({
          prefix, level : 'warn', message : message as string, optionalParams,
        });
      },
      error : (message?: any, ...optionalParams: any[]): void => {
        process.send!({
          prefix, level : 'error', message : message as string, optionalParams,
        });
      },
      log : (message?: any, ...optionalParams: any[]): void => {
        process.send!({
          prefix, level : 'log', message : message as string, optionalParams,
        });
      },
    };
  }

  // prettier-ignore
  return {
    watch : (): void => {
      return undefined;
    },
    info : (message?: any, ...optionalParams: any[]): void => {
      console.log(`[${prefix}] - info - ${message as string}`, ...optionalParams);
    },
    success : (message?: any, ...optionalParams: any[]): void => {
      console.log(`[${prefix}] - success - ${message as string}`, ...optionalParams);
    },
    warn : (message?: any, ...optionalParams: any[]): void => {
      console.log(`[${prefix}] - warn - ${message as string}`, ...optionalParams);
    },
    error : (message?: any, ...optionalParams: any[]): void => {
      console.log(`[${prefix}] - error - ${message as string}`, ...optionalParams);
    },
    log : (message?: any, ...optionalParams: any[]): void => {
      console.log(`[${prefix}] - log - ${message as string}`, ...optionalParams);
    },
  };
};
