/**
 * Firestore data objects - any data that is somewhere
 * in firebase and accessible by us.
 */

import { UserMetadata } from 'firebase/auth';

// User auth info received on login
export interface UserInfo {
  displayName             : Readonly<string | null>;
  email                   : Readonly<string | null>;
  phoneNumber             : Readonly<string | null>;
  photoURL                : Readonly<string | null>;
  providerId              : Readonly<string>;
  uid                     : Readonly<string>;
}

// User auth info received on login
export interface FirestoreUser extends UserInfo {
  emailVerified                        : Readonly<boolean>;
  metadata                             : Readonly<UserMetadata>;
  delete()                             : Promise<void>;
  toJSON()                             : object;
}

// Our custom user but unlike above we have to make a second call
// the firebase to fill in this info
export interface CloudfarmUser {
  electricityCost           : USDValue;
  lifetimeEarnings          : USDValue;
  unpaidShares              : ShareCount;
  walletAddress             : EthereumAddress;
  rigs                      : Record<RigID, Rig>;
  userEmail                 : EmailAddress;
}

type EmailAddress = string;
type RigID = string;

export interface Rig {
  rigID                     : RigID;
  rigName                   : string;
  logs                      : Log[];
}

export interface Log {
  averageEffectiveHashrate  : number;
  effectiveHashrate         : number;
  invalidShares             : ShareCount;
  reportedHashrate          : number;
  staleShares               : ShareCount;
  timestamp                 : DateMS;
  validShares               : ShareCount;
}

declare type ALGORITHM =
  | 'ethash'
  | 'cuckatoo'
  | 'cuckatoo32'
  | 'cuckoo_ae'
  | 'progpow_sero'
  | 'kawpow'
  | 'beamv3'
  | 'octopus'
  | 'ergo';

// export interface CoinSettingsDocument

export type MineToWalletAddressWithWorkerID = string;
export type MineToWalletAddress = string;
export type URLType = string;

export interface CoinSettings {
  path: 'global/masterSettings'

  data: {
    algo            : ALGORITHM;
    lastUpdated     : DateMS;
    unpaidBalance   : USDValue;
    unpaidShares    : ShareCount;
    url             : URLType;
    user            : MineToWalletAddressWithWorkerID;
    walletAddress   : MineToWalletAddress
  }
}

export type RavenAddress = string;
export type EthereumAddress = string;
export type ShareCount = number;
export type USDValue = number;
export type DateMS = number;
export type FirestorePath = 'global/coinSettings' | 'global/masterSettings'  | 'users/[uid]';
export type CoinTicker = 'eth' | 'rvn';

export interface MasterSettings {
  path: 'global/masterSettings';
  data: {
    counterValue      : USDValue;
    currentCoin       : CoinTicker;
    logFile           : string;
    masterWalletETH   : string;
    nextPaymentDate   : DateMS;
  }
}

