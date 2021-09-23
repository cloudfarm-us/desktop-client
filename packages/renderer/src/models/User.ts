/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable max-classes-per-file */
import { DEFAULT_USER_DATA }                                                        from 'DEFAULTS';
import type { User as FirebaseUser }                                                from 'firebase/auth';
import { atom, AtomEffect, selector, useRecoilValue, useSetRecoilState }            from 'recoil';
import { getUserData, onAuthStateChanged, onMinerSettingsSnapshot, onUserSnapshot } from 'services/Firebase';

type RemovedTypes =
  | 'delete'
  | 'getIdToken'
  | 'reload'
  | 'getIdTokenResult'
  | 'toJSON'
  | 'providerId'
  | 'providerData'
  | 'refreshToken'
  | 'tenantId'
  | 'isAnonymous'
  | 'photoURL'
  | 'phoneNumber'
  | 'metadata';

type SerializableFirebaseUser = Omit<FirebaseUser, RemovedTypes>;

class BaseUser implements SerializableFirebaseUser {
  readonly emailVerified: boolean;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly uid: string;
  constructor(user: FirebaseUser | BaseUser) {
    this.displayName = user.displayName;
    this.email = user.email;
    this.uid = user.uid;
    this.emailVerified = user.emailVerified;
  }
}

export class User extends BaseUser {
  readonly electricityCost: number;
  readonly rigs: Record<string, Rig>;
  readonly unpaidShares: number;
  readonly walletAddress: string;

  constructor(user: BaseUser, possiblePartialData: Partial<UserData> = {
  }) {
    super(user);
    const userData: UserData = {
      ...DEFAULT_USER_DATA, ...possiblePartialData,
    };

    console.log(`userData.rigs: \n${JSON.stringify((userData.rigs))}`);

    this.electricityCost = userData.electricityCost;
    this.rigs = userData.rigs;
    this.unpaidShares = userData.unpaidShares;
    this.walletAddress = userData.walletAddress;
  }
}

const resolveInitialAuthState = async (): Promise<FirebaseUser | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      (user) => {
        resolve(user);
        unsubscribe();
      },
      (error) => {
        reject(error);
        unsubscribe();
      },
    );
  });
};

const timeStamp = atom({
  key     : 'timeStamp',
  default : 0,
});

const useRefreshUserState = () => {
  const setTimestamp = useSetRecoilState(timeStamp);
  return () => {
    setTimestamp(Date.now());
  };
};

const syncStorageEffect: AtomEffect<BaseUser | null> = ({ setSelf }) => {
  setSelf(
    resolveInitialAuthState().then(
      (firebaseUser) => firebaseUser && new BaseUser(firebaseUser),
    ),
  );

  let unsubscribeFireStoreListener: null | (() => void) | undefined;
  let unsubscribeFireStoreCongfigListener: null | (() => void) | undefined;

  const refreshUser = useRefreshUserState();

  const unsubscribe = onAuthStateChanged((firebaseUser) => {
    setSelf(firebaseUser && new BaseUser(firebaseUser));

    if (firebaseUser) {
      unsubscribeFireStoreListener = onUserSnapshot(firebaseUser.uid, (doc) => {
        const data = doc.data();
        console.log(
          'Received updated user data: ',
          JSON.stringify(data, null, 2),
        );
        refreshUser();
      });

      unsubscribeFireStoreCongfigListener = onMinerSettingsSnapshot((doc) => {
        const { ipcRenderer } = window.electron;
        const data = doc.data();
        console.log(
          `Received new miner config:
          ${JSON.stringify(data, null, 2)}`,
        );
        void ipcRenderer.invoke('async-message', {
          action : 'update-miner-config', request : data,
        } as IpcActionReq).then((reply) => {
          console.log(reply);
        });
      });
    } else {
      if (unsubscribeFireStoreListener) {
        unsubscribeFireStoreListener();
        unsubscribeFireStoreListener = null;
      }

      if (unsubscribeFireStoreCongfigListener) {
        unsubscribeFireStoreCongfigListener();
        unsubscribeFireStoreCongfigListener = null;
      }
    }
  });

  return () => {
    unsubscribe();
    if (unsubscribeFireStoreListener) { unsubscribeFireStoreListener(); }
  };
};

const FirebaseUserState = atom<BaseUser | null>({
  key              : 'BaseUser',
  default          : null,
  effects_UNSTABLE : [syncStorageEffect],
});

const UserState = selector<User | null>({
  key : 'User',
  get : async ({ get }) => {
    get(timeStamp);
    const firebaseUser = get(FirebaseUserState);
    if (firebaseUser) {
      const docSnap = await getUserData(firebaseUser.uid);

      if (docSnap.exists()) {
        const remoteData = docSnap.data();
        return new User(firebaseUser, remoteData);
      }

      return new User(firebaseUser);
    }

    return null;
  },
});

export const useUserState = () => {
  return useRecoilValue(UserState);
};

