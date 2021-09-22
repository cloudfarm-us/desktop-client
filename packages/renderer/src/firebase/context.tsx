import type { FirebaseApp }           from 'firebase/app';
import type { Auth, User }            from 'firebase/auth';
import type { Firestore }             from 'firebase/firestore';
import { createContext, useContext }  from 'react';

const FirebaseAppContext = createContext<FirebaseApp>({} as FirebaseApp);
const FirebaseFirestoreContext = createContext<Firestore>({} as Firestore);
const FirebaseAuthContext = createContext<Auth>({} as Auth);
const FirebaseUserContext = createContext<User | null>(null);

const useFirebaseApp       = () => useContext(FirebaseAppContext);
const useFirebaseFirestore = () => useContext(FirebaseFirestoreContext);
const useFirebaseAuth      = () => useContext(FirebaseAuthContext);
const useFirebaseUser      = () => useContext(FirebaseUserContext);

export {
  FirebaseAppContext,
  FirebaseFirestoreContext,
  FirebaseAuthContext,
  FirebaseUserContext,

  useFirebaseApp,
  useFirebaseFirestore,
  useFirebaseAuth,
  useFirebaseUser,
};
