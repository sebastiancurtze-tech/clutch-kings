
import admin from 'firebase-admin';

// Versuche, das Service-Account-JSON aus der Umgebungsvariable zu lesen.
// Dies ist der von Firebase Hosting und Cloud Run empfohlene Weg.
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

let serviceAccount: admin.ServiceAccount | undefined;
if (serviceAccountString) {
  try {
    serviceAccount = JSON.parse(serviceAccountString);
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable.', error);
    throw new Error('Firebase service account parsing failed. Check the environment variable format.');
  }
}

let isInitialized = admin.apps.length > 0;

export function initializeAdminApp() {
  if (isInitialized) {
    return;
  }
  
  // Wenn das Service-Account-Objekt vorhanden ist, verwende es.
  if (serviceAccount) {
     try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: serviceAccount.project_id,
        });
        isInitialized = true;
        console.log('Firebase Admin SDK initialized successfully using service account from env var.');
        return;
    } catch (error) {
        console.error('Error initializing Firebase Admin SDK with explicit credentials:', error);
        throw error;
    }
  }

  // Fallback auf Application Default Credentials, wenn keine Service-Account-Variable gesetzt ist.
  // Das funktioniert in Google Cloud-Umgebungen (Cloud Run, Cloud Functions) automatisch.
  try {
    admin.initializeApp();
    isInitialized = true;
    console.log('Firebase Admin SDK initialized successfully using Application Default Credentials.');
  } catch(error) {
    console.error('Error initializing Firebase Admin SDK with Application Default Credentials.', error);
    console.warn('Ensure your environment is configured for ADC or the FIREBASE_SERVICE_ACCOUNT env var is set.');
    throw new Error('Firebase Admin SDK initialization failed.');
  }
}
