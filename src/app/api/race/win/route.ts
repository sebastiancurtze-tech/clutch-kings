
import { NextResponse, type NextRequest } from 'next/server';
import admin from 'firebase-admin';
import { initializeAdminApp } from '@/lib/firebase-admin';

// Initialize Firebase Admin SDK
initializeAdminApp();

const db = admin.firestore();

/**
 * API route to process a race win.
 * This is a fire-and-forget POST request that increments the user's wins and money.
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn("Race Win API: Missing or invalid Authorization header.");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDocRef = db.collection('users').doc(uid);

    // Use a transaction to safely increment wins and money
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      if (!userDoc.exists) {
        // This case should ideally not happen if user is authenticated
        throw new Error(`User document for UID ${uid} not found.`);
      }
      
      const currentMoney = userDoc.data()?.money ?? 0;
      const currentWins = userDoc.data()?.wins ?? 0;

      // Define reward
      const winReward = 150;

      transaction.update(userDocRef, {
        wins: admin.firestore.FieldValue.increment(1),
        money: admin.firestore.FieldValue.increment(winReward),
      });
    });

    // Fire-and-forget: Return success immediately
    return NextResponse.json({ message: 'Race win processed successfully.' }, { status: 200 });

  } catch (error: any) {
    console.error("Race Win API Error:", error);
    // Return a generic error to the client
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
