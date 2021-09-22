// // https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
// import { Auth, CompleteFn,
//   ErrorFn,
//   getAuth,
//   NextOrObserver,
//   onAuthStateChanged as _onAuthStateChanged,
//   sendPasswordResetEmail as _sendPasswordResetEmail,
//   signInWithEmailAndPassword as _signInWithEmailAndPassword,
//   User as FirebaseUser } from 'firebase/auth';
// import { collection,
//   doc,
//   DocumentSnapshot,
//   Firestore,
//   getDoc,
//   getFirestore,
//   onSnapshot,
//   QueryDocumentSnapshot,
//   updateDoc } from 'firebase/firestore';

// // interface DeserializeOptions {
// //   path: string;
// //   dependencies: {
// //     db?: Firestore;
// //   }
// // }

// // const deserializeDocumentData({path: string, dependencies: {db: Firestore}}) {

// // }

// const baseDatabase = getFirestore();

// const converter = <T>() => ({
//   toFirestore   : (data: Partial<T>) => data,
//   fromFirestore : (snap: QueryDocumentSnapshot) => snap.data() as T,
// });

// const dataPoint = <T>(collectionPath: string) => collection(baseDatabase, collectionPath).withConverter(converter<T>());

// const documentDataPoint = <T>(documentPath: string) => doc(baseDatabase, documentPath).withConverter(converter<T>());

// const database = {
//   users          : dataPoint<UserData>('users'),
//   globalSettings : documentDataPoint<GlobalSettings>('global/settings'),
//   nbminerConfig  : documentDataPoint<MinerConfiguration>('global/nbminer'),
// };
export {};
