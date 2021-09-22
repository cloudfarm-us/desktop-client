import { Box }          from '@chakra-ui/react';

import packageJSON      from '../../../../../package.json';

import { SpinningLogo } from './SpinningLogo';

const { platform, versions } = window.electron;

const osMap = {
  win32  : 'Windows',
  darwin : 'macOS',
  linux  : 'Linux',
};

export const InfoHeader = () => {
  return (
    <div className="App-header">
      <SpinningLogo />

      <Box textAlign="center">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://cloudfarm.us/"
          className="electron-website-link"
        >
          Cloudfarm Desktop Client
        </a>

        <p>
          Platform / OS:{' '}
          <strong id="os">
            {platform in osMap
              ? osMap[platform as 'win32' | 'darwin' | 'linux']
              : platform}
          </strong>
        </p>
        <p>
          App author: <strong id="author">{packageJSON.author}</strong>
        </p>
        <p>
          Environment: <strong id="env">{import.meta.env.MODE}</strong>
        </p>
        <p>
          Electron version:{' '}
          <strong id="electron-version">{versions.electron}</strong>
        </p>
      </Box>
    </div>
  );
};
