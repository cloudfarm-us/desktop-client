import type { Configuration } from 'electron-builder';
import { author, productName, appId, repository, version } from '../package.json';

const now = new Date();

if (process.env.VITE_APP_VERSION === undefined) {
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

const config: Omit<Configuration, 'asar'> & {asar: boolean} = {
  copyright: `Copyright © ${now.getUTCFullYear()} ${author}`,
  target: ['nsis'],
  productName: `${productName}`,
  appId: `${appId}`,
  directories: {
    "output"         : "dist",
    "buildResources" : "buildResources"
  },
  asar: true,
  files: [
    "packages/main/dist/**", 
    "packages/renderer/dist/**", 
    "packages/preload/dist/**"
  ],
  extraResources: [
    {
      "from"    : "assets",
      "to"      : "assets",
      "filter"  : [
        "**/*"
      ]
    }
  ],
  win: { target: [ 
          { target: "nsis", 
            arch  : [ "x64" ] } ] },
  nsis: {
    'artifactName'                        : '${productName} Setup.${ext}',
    "installerIcon"                       : "icon.ico",
    "uninstallerIcon"                     : "icon.ico",
    "uninstallDisplayName"                : `${productName} Uninstaller`,
    "license"                             : "LICENSE.txt",
    "oneClick"                            : false,
    "allowToChangeInstallationDirectory"  : true
  },
  extraMetadata: {
    version: `${version}`
  },
  publish: {
    provider: "github",
    owner: `${repository.user}`,
    repo: `${repository.repo}`,
    vPrefixedTagName: true,
    releaseType: "release", 
  }
}

export default config;