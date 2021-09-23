import { FirebaseOptions, initializeApp }                                                                                            from 'firebase/app';
import { getAuth, User, onAuthStateChanged }                                                                                         from 'firebase/auth';
import { getFirestore }                                                                                                              from 'firebase/firestore';
import { PropsWithChildren, useEffect, useState }                                                                                    from 'react';
import { useFirebaseApp, FirebaseAppContext, FirebaseFirestoreContext, FirebaseAuthContext, FirebaseUserContext, useFirebaseAuth }   from './context';

type FirebaseAppProviderProps = PropsWithChildren<{ firebaseOptions: FirebaseOptions }>;
type FirebaseFirestoreProps = PropsWithChildren<{ }>;
type FirebaseAuthProps = PropsWithChildren<{ }>;
type FirebaseUserProps = PropsWithChildren<{ }>;

export const FirebaseAppProvider = (props:FirebaseAppProviderProps) => {
  const app = initializeApp(props.firebaseOptions);
  return (<FirebaseAppContext.Provider value={app}>{props.children}</FirebaseAppContext.Provider>);
};

export const FirebaseFirestoreProvider = (props:FirebaseFirestoreProps) => {
  const app = useFirebaseApp();
  const db = getFirestore(app);
  return (<FirebaseFirestoreContext.Provider value={db}>{props.children}</FirebaseFirestoreContext.Provider>);
};

export const FirebaseAuthProvider = (props:FirebaseAuthProps) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  return (<FirebaseAuthContext.Provider value={auth}>{props.children}</FirebaseAuthContext.Provider>);
};

export const FirebaseUserProvider = (props:FirebaseUserProps) => {
  const auth = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      if (_user)  console.log(`user signed in (${_user.email})`);  else  console.log('user signed out');

      setUser(_user);
    });

    return () => unsubscribe();
  }, []);

  return (<FirebaseUserContext.Provider value={user}>{props.children}</FirebaseUserContext.Provider>);
};
