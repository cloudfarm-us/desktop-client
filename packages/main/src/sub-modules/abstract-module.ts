import { MainProcess }  from 'main-process';
import type { Logger }  from 'utils';
import { createLogger } from 'utils';

export abstract class Submodule {
  readonly mainProcess: MainProcess;

  readonly logger: Logger;

  constructor(mainProcess: MainProcess, prefix: string) {
    this.logger = createLogger(prefix);
    this.mainProcess = mainProcess;
  }

  abstract init(): void;

  abstract update(): void;
}
