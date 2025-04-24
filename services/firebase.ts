import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'your-firebase-api-key',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'your-firebase-auth-domain',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'your-firebase-project-id',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'your-firebase-storage-bucket',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'your-firebase-messaging-sender-id',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 'your-firebase-app-id'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// Helper to save user session to AsyncStorage
export const saveSession = async (user: any) => {
  if (user) {
    await AsyncStorage.setItem('userSession', JSON.stringify({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    }));
  } else {
    await AsyncStorage.removeItem('userSession');
  }
};

// Helper to get user session from AsyncStorage
export const getSession = async () => {
  const session = await AsyncStorage.getItem('userSession');
  return session ? JSON.parse(session) : null;
};

// Helper to subscribe to auth state changes
export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    await saveSession(user);
    callback(user);
  });
}; 