import { app }                             from 'electron';
import { access, readFile, rm, writeFile } from 'fs/promises';
import { join }                            from 'path';

import { createLogger }                    from './logging';
import { getAssetPath }                    from './paths';

const logger = createLogger('installDevExtension.ts');

// prettier-ignore
const fixExtension = async ({ extName, extensionID }: { extName: string, extensionID:string }) => {
  const extensionPath = join(app.getPath('userData'), 'extensions', extensionID);
  const metaPath = join(extensionPath, '_metadata');
  const manifestPath = join(extensionPath, 'manifest.json');

  const fixMetadataFolder = access(metaPath)
    .then(async () => {
      logger.info('_metadata folder exists, deleting...');
      return rm(metaPath, {
        recursive : true, force : true,
      });
    })
    .then(() => true)
    .catch(() => false);

  const fixManifest = access(manifestPath)
    .then(async () => {
      return readFile(manifestPath, {
        encoding : 'utf-8',
      });
    })
    .then(async (oldManifest) => {
      if (oldManifest.includes('update_url')) {
        logger.info('Current extension manifest has extension issues...');
        return readFile(getAssetPath('extensions', `${extensionID}.json`));
      }

      throw new Error('Nothing to fix');
    })
    .then(async (newManifest) => {
      if (newManifest) {
        logger.info('Correcting manifest...');
        return writeFile(manifestPath, newManifest);
      }
      return Promise.resolve(null);
    })
    .then(() => true)
    .catch(() => false);

  const awaited = await Promise.all([fixMetadataFolder, fixManifest]);
  if (awaited[0] || awaited[1]) logger.success(`Extension ${extName} fixed`);
  return undefined;
};

export const installDevExtension = async (_extensionID?: string) => import('electron-devtools-installer')
  .then(async ({ default: installExtension, REACT_DEVELOPER_TOOLS }) => {
    const extensionID = _extensionID ?? REACT_DEVELOPER_TOOLS.id;
    const extName = await installExtension(extensionID);
    logger.info(`Installed ${extName}`);
    return {
      extName,
      extensionID,
    };
  })
  .then(async ({ extName, extensionID }) => {
    return fixExtension({
      extName, extensionID,
    });
  });
