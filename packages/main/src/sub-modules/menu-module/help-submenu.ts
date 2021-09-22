import { GH_ISSUE_TEMPLATE } from 'CONSTANTS';
import { aboutMenuItem,
  debugInfo,
  is,
  openNewGitHubIssue,
  openUrlMenuItem } from 'electron-util';
import type { MenuItemConstructorOptions } from 'electron';
import packageJSON                         from 'package.json';
import { getAssetPath }                    from 'utils';

// prettier-ignore
export const helpSubmenu = [
  openUrlMenuItem({
    label : 'Website', url : packageJSON.homepage,
  }),
  openUrlMenuItem({
    label : 'Github',
    url   : packageJSON.repository.url.split('+').pop()!,
  }),
  {
    label : 'Report an Issue…',
    click() {
      openNewGitHubIssue({
        user : packageJSON.repository.user,
        repo : packageJSON.repository.repo,
        body : `${GH_ISSUE_TEMPLATE}\n---\n${debugInfo()}`,
      });
    },
  },

  !is.macos && {
    type : 'separator',
  },
  !is.macos
    && aboutMenuItem({
      icon      : getAssetPath('img', 'icon.png'),
      copyright : `Copyright © ${new Date().getUTCFullYear()} ${
        packageJSON.author
      }™`,
      text : packageJSON.productName,
    }),
].filter(Boolean) as MenuItemConstructorOptions[];
