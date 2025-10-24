
import { NextResponse, type NextRequest } from 'next/server';
import admin from 'firebase-admin';
import { initializeAdminApp } from '@/lib/firebase-admin';

// Initialize Firebase Admin SDK
initializeAdminApp();

export async function GET(request: NextRequest) {
  try {
    console.log('API /api/users/me called');
    const authHeader = request.headers.get('Authorization');
    console.log('Authorization Header received:', !!authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log('Token verified, uid:', uid);

    const userDocRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userDocRef.get();
    console.log('User document exists:', userDoc.exists);

    if (!userDoc.exists) {
      return NextResponse.json({ user: { username: null } }, { status: 200 });
    }

    const userData = userDoc.data();
    const username = userData?.username || null;
    console.log('Username from Firestore:', username);
    
    return NextResponse.json({ user: { username: username } });

  } catch (error) {
    console.error('API /api/users/me Error:', error);
    if (error instanceof Error && 'code' in error && (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error')) {
        return NextResponse.json({ error: 'Unauthorized - Invalid Token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
