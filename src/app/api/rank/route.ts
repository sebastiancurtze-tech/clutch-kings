
import { NextResponse, type NextRequest } from 'next/server';
import admin from 'firebase-admin';
import { initializeAdminApp } from '@/lib/firebase-admin';
import { ranks } from '@/lib/ranks';

// Admin SDK initialisieren
initializeAdminApp();

const db = admin.firestore();

// Die Fallback-Daten, falls etwas schiefgeht.
const defaultRankData = {
  wins: 0,
  rankLevel: 1,
  rankName: "Fahrschüler",
  rankClass: "Anfänger",
  rankIcon: "CircleDot",
  nextRankName: ranks[1]?.name ?? "Fahrschüler",
  progress: 0,
};

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn("Rank API: Missing or invalid Authorization header. Returning safe defaults.");
      return NextResponse.json(defaultRankData, { status: 200 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      console.warn(`Rank API: User document for UID ${uid} not found. Returning safe defaults.`);
      return NextResponse.json(defaultRankData, { status: 200 });
    }

    const userData = userDoc.data() || {};
    const wins = userData.wins ?? 0;

    // Finde den aktuellen und nächsten Rang
    const currentRank = ranks.find(r => wins >= r.minWins && wins <= r.maxWins) || ranks[0];
    const nextRank = ranks.find(r => r.level === currentRank.level + 1);

    // Berechne den Fortschritt zum nächsten Rang
    let progress = 0;
    if (nextRank) {
      const winsInCurrentRank = wins - currentRank.minWins;
      const winsForNextRank = nextRank.minWins - currentRank.minWins;
      if (winsForNextRank > 0) {
        progress = Math.min(100, (winsInCurrentRank / winsForNextRank) * 100);
      }
    } else {
        // Wenn der höchste Rang erreicht ist
        progress = 100;
    }


    const responseData = {
      wins: wins,
      rankLevel: currentRank.level,
      rankName: currentRank.name,
      rankClass: currentRank.class,
      rankIcon: currentRank.icon,
      nextRankName: nextRank?.name ?? currentRank.name,
      progress: progress,
    };
    
    // Überschreibe die Firestore-Daten mit den berechneten Daten, um Konsistenz zu gewährleisten
    await userDocRef.update({
        wins: wins, // Stelle sicher, dass die Siege korrekt gespeichert sind.
        rankLevel: currentRank.level,
        rankName: currentRank.name,
        rankClass: currentRank.class,
        rankIcon: currentRank.icon,
    });

    return NextResponse.json(responseData, { status: 200 });

  } catch (error: any) {
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
      console.warn("Rank API: Auth token is invalid or expired. Returning defaults.", error.code);
    } else {
      console.error("Rank API (admin) error:", error);
    }
    // Breche niemals das UI – gib immer sichere Standardwerte zurück
    return NextResponse.json(defaultRankData, { status: 200 });
  }
}
