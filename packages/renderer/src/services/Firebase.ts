// https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
import { CompleteFn,
  ErrorFn,
  getAuth,
  NextOrObserver,
  onAuthStateChanged as _onAuthStateChanged,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  User as FirebaseUser } from 'firebase/auth';
import { collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
  onSnapshot,
  QueryDocumentSnapshot,
  updateDoc } from 'firebase/firestore';

const baseAuth = getAuth();
const baseDatabase = getFirestore();

const converter = <T>() => ({
  toFirestore   : (data: Partial<T>) => data,
  fromFirestore : (snap: QueryDocumentSnapshot) => snap.data() as T,
});

// @ts-expect-error
const dataPoint = <T>(collectionPath: string) => collection(baseDatabase, collectionPath).withConverter(converter<T>());
// @ts-expect-error
const documentDataPoint = <T>(documentPath: string) => doc(baseDatabase, documentPath).withConverter(converter<T>());

const database = {
  users          : dataPoint<UserData>('users'),
  globalSettings : documentDataPoint<GlobalSettings>('global/settings'),
  nbminerConfig  : documentDataPoint<MinerConfiguration>('global/nbminer'),
};

export const updateUserDataDoc = async (
  uid: string,
  updatedData: Partial<UserData>,
) => {
  return updateDoc(doc(database.users, uid), updatedData);
};

export const sendPasswordResetEmail = async (email: string) => {
  return _sendPasswordResetEmail(baseAuth, email);
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return _signInWithEmailAndPassword(baseAuth, email, password);
};

const getUserDoc = (uid: string) => doc(database.users, uid);
export const getUserData = async (uid: string) => getDoc(doc(database.users, uid));

export const onUserSnapshot = (
  uid: string,
  callback: (snapshot: DocumentSnapshot<UserData>) => void,
) => {
  // @ts-expect-error
  return onSnapshot(getUserDoc(uid), callback);
};

export const onNbminerSnapshot = (
  callback: (snapshot: DocumentSnapshot<MinerConfiguration>) => void,
) => {
  return onSnapshot(database.nbminerConfig, callback);
};

export const onAuthStateChanged = (
  nextOrObserver: NextOrObserver<FirebaseUser>,
  error?: ErrorFn | undefined,
  completed?: CompleteFn | undefined,
) => {
  return _onAuthStateChanged(baseAuth, nextOrObserver, error, completed);
};
