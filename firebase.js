import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2qQBSi88Ki6IVFj2BNvc27EeZSar86VY",
  authDomain: "buoyant-keel-396204.firebaseapp.com",
  projectId: "buoyant-keel-396204",
  storageBucket: "buoyant-keel-396204.appspot.com",
  messagingSenderId: "804196618986",
  appId: "1:804196618986:web:8e6ff120a5af6f891f7d93"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();


export const createuserdocfromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth || !userAuth.email) return;

  const userDocRef = db.collection('users').doc(userAuth.uid);

  const userSnapshots = await userDocRef.get();

  if (!userSnapshots.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userDocRef.set({
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.error('Error in creating user document:', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};

export default firebaseApp;
