import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getRemoteConfig } from 'firebase/remote-config';

// Import the Firebase configuration
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const storage = getStorage(app);

// Analytics and Remote Config are only available in certain environments (browser)
export let analytics: any = null;
export let remoteConfig: any = null;

if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    remoteConfig = getRemoteConfig(app);
    
    // Set default values for Remote Config
    remoteConfig.defaultConfig = {
      'header_color': 'teal',
      'welcome_message': 'Bem-vindo ao QRCODE CHANGE!'
    };
  } catch (e) {
    console.warn('Firebase Analytics/RemoteConfig failed to initialize:', e);
  }
}

export default app;
