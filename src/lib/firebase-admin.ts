import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

// Inicializace Firebase Admin SDK
if (!getApps().length) {
  // Pro produkci: použijte Service Account JSON
  // Pro development: použijte Application Default Credentials
  
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Produkce: Service Account z environment variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } else {
    // Development: Použijeme client credentials (méně bezpečné, ale jednodušší pro dev)
    // V produkci MUSÍTE použít Service Account!
    app = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }
} else {
  app = getApps()[0];
}

export const adminStorage = getStorage(app);
export const adminDb = getFirestore(app);

