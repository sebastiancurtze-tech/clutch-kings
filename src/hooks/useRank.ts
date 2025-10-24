
"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';

export interface RankData {
  wins: number;
  rankLevel: number;
  rankName: string;
  rankClass: string;
  rankIcon: string;
  nextRankName: string;
  progress: number;
}

export function useRank() {
  const { user, isUserLoading } = useUser();
  const [rankData, setRankData] = useState<RankData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // We should not fetch if the user is still loading
    if (isUserLoading) {
      return;
    }

    // if there is no user, we can stop loading and show defaults.
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchRankData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/rank', {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch rank data: ${response.statusText}. Body: ${errorBody}`);
        }

        const data: RankData = await response.json();
        setRankData(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Error fetching rank data:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankData();
  }, [user, isUserLoading]);

  return { rankData, isLoading, error };
}

