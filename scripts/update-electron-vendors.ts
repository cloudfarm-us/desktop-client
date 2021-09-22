#!/usr/bin/node
import { execSync }  from 'child_process';
import electron      from 'electron';
import { writeFile } from 'fs/promises';
import { join }      from 'path';

import packageJSON   from '../package.json';

/**
 * Returns versions of electron vendors - the performance of this feature is very poor and can be improved
 * @see https://github.com/electron/electron/issues/28006
 */
function getVendors(): NodeJS.ProcessVersions {
  const output = execSync(
    `${electron as unknown as string} -p "JSON.stringify(process.versions)"`,
    {
      env : {
        ELECTRON_RUN_AS_NODE : '1', MODE : 'development',
      },
      encoding : 'utf-8',
    },
  );

  return JSON.parse(output) as NodeJS.ProcessVersions;
}

const packageJSONPath = join(process.cwd(), 'package.json');

async function updateVendors() {
  const { node, v8 } = getVendors();

  const vendors = {
    chrome : v8.split('.')[0] + v8.split('.')[1],
    node   : node.split('.')[0],
  };

  packageJSON.browserslist = [`Chrome ${vendors.chrome}`];

  const newProperties = {
    browserslist : [`Chrome ${vendors.chrome}`],
    electron     : {
      vendors,
    },
  };

  const newPackageJSON = {
    ...packageJSON, ...newProperties,
  };

  return Promise.all([
    writeFile(packageJSONPath, JSON.stringify(newPackageJSON, null, 2)),
  ]);
}

updateVendors().catch((err) => {
  console.error(err);
  process.exit(1);
});
