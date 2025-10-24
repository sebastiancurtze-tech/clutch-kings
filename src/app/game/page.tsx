"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page just redirects to the dashboard, which is the default view
// in the game section.
export default function GamePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/game/dashboard');
  }, [router]);

  return null; // Render nothing while redirecting
}
