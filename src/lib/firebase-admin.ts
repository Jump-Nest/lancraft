import { initializeApp, getApps, cert, App, ServiceAccount } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

// Inicializace Firebase Admin SDK
if (!getApps().length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Produkce: Service Account z environment variable
      console.log('Initializing Firebase Admin with Service Account');
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
      app = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else if (process.env.FIREBASE_PRIVATE_KEY) {
      // Alternativa: Jednotlivé environment variables
      console.log('Initializing Firebase Admin with individual env vars');
      app = initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        } as ServiceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      // Fallback: Bez credentials (funguje jen lokálně s emulátorem nebo ADC)
      console.log('Initializing Firebase Admin without credentials (development mode)');
      app = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
} else {
  app = getApps()[0];
}

export const adminStorage = getStorage(app);
export const adminDb = getFirestore(app);

