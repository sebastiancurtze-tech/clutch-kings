
"use client";

import { useState, useEffect, useRef } from "react";
import { doc } from "firebase/firestore";
import { CircleDot, Crown, Flame, Gauge, User, Wallet } from "lucide-react";
import { useDoc, useFirestore, useUser } from "@/firebase";
import { useMemoFirebase } from "@/firebase/provider";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardPortal,
} from "@/components/ui/hover-card";
import { ranks, type Rank } from "@/lib/ranks";
import { Progress } from "@/components/ui/progress";

type UserProfile = {
  username: string;
  email: string;
  money: number;
  status: string;
  vehicle: string;
  wins: number;
  rankLevel: number;
  rankName: string;
  rankClass: string;
  rankIcon: string;
};

// Map icon names from API to actual components
const rankIcons: { [key: string]: React.ElementType } = {
  SteeringWheel: CircleDot, // Legacy fallback
  CircleDot: CircleDot,
  Gauge: Gauge,
  Flame: Flame,
  Crown: Crown,
};

const classColorMap: { [key: string]: string } = {
  Anfänger: "#FFD700",
  Fortgeschritten: "#00BFFF",
  Profi: "#FF4500",
  Legende: "#C8A2C8",
};

export function Header() {
  const [time, setTime] = useState(new Date());
  const { user, isUserLoading: isAuthLoading } = useUser();
  const [rankUpMessage, setRankUpMessage] = useState<string | null>(null);

  const firestore = useFirestore();
  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, "users", user.uid);
  }, [firestore, user]);

  const { data: userData, isLoading: isDocLoading } = useDoc<UserProfile>(userDocRef);

  // --- Rank Up Effect Logic ---
  const prevRankLevel = useRef(userData?.rankLevel);
  useEffect(() => {
    if (userData && prevRankLevel.current !== undefined && userData.rankLevel > prevRankLevel.current) {
        setRankUpMessage(`🏆 Neuer Rang erreicht: ${userData.rankName}!`);
        setTimeout(() => setRankUpMessage(null), 3000);
    }
    prevRankLevel.current = userData?.rankLevel;
  }, [userData]);
  // --- End Rank Up Effect Logic ---

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const isLoading = isDocLoading || isAuthLoading;

  const displayName = userData?.username || user?.displayName || 'Spieler';
  
  // --- Tooltip Logic ---
  const currentWins = userData?.wins ?? 0;
  const currentRankLevel = userData?.rankLevel ?? 1;

  const currentRank = ranks.find(r => r.level === currentRankLevel) || ranks[0];
  const nextRank = ranks.find(r => r.level === currentRank.level + 1);

  const RankIcon = rankIcons[currentRank.icon] || CircleDot;
  const rankColor = classColorMap[currentRank.class] || "#FFFFFF";

  const NextRankIcon = nextRank ? rankIcons[nextRank.icon] : null;
  const nextRankColor = nextRank ? classColorMap[nextRank.class] : "#FFFFFF";

  let progressPercent = 0;
  let winsForNextRank = 0;
  if (nextRank) {
    const winsInCurrentRank = currentWins - currentRank.minWins;
    const winsForNextRankLevel = nextRank.minWins - currentRank.minWins;
    winsForNextRank = nextRank.minWins;
    if (winsForNextRankLevel > 0) {
      progressPercent = Math.min(100, (winsInCurrentRank / winsForNextRankLevel) * 100);
    }
  } else {
    progressPercent = 100;
  }

  const getIconCount = (rank: Rank | null) => {
    if (!rank) return 1;
    const classRanks = ranks.filter(r => r.class === rank.class);
    const rankIndexInClass = classRanks.findIndex(r => r.level === rank.level);
    return rankIndexInClass + 1;
  };

  const currentIconCount = getIconCount(currentRank);
  const nextIconCount = getIconCount(nextRank);
  // --- End Tooltip Logic ---

  return (
    <>
      {rankUpMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100000] animate-rankup px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500 text-white font-bold shadow-2xl">
          {rankUpMessage}
        </div>
      )}
      <header className="flex h-14 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6">
        <div className="flex flex-1 items-center gap-4 md:gap-6 text-sm text-muted-foreground font-medium">
          {/* Left-aligned items */}
          <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary"/>
              {isLoading ? <Skeleton className="h-4 w-24" /> : (
                <Link href="/game/profile" className="hover:underline cursor-pointer">
                  <span>{displayName}</span>
                </Link>
              )}
          </div>
          <div className="flex items-center gap-2">
              {isLoading ? <Skeleton className="h-4 w-20" /> : (
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <RankIcon className="h-4 w-4" style={{ color: rankColor }} />
                      <span style={{ color: rankColor }}>{currentRank.name}</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardPortal>
                    <HoverCardContent
                      side="bottom"
                      align="center"
                      sideOffset={8}
                      className="z-[100000] w-80 rounded-xl border border-white/10 bg-gray-900/95 p-4 text-white shadow-xl"
                    >
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(currentIconCount)].map((_, i) => (
                              <RankIcon key={i} className="h-4 w-4" style={{ color: rankColor }} />
                            ))}
                            <span className="font-medium" style={{ color: rankColor }}>
                              {currentRank.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-300">Lvl {currentRank.level}</span>
                        </div>

                        {nextRank ? (
                          <>
                            <Progress value={progressPercent} className="h-3 w-full bg-gray-700/50 [&>div]:bg-[#00BFFF] mb-2" />
                            <p className="mb-3 text-center text-xs text-gray-300">
                              {currentWins} / {winsForNextRank} Siege bis{' '}
                              <strong style={{ color: nextRankColor }}>{nextRank.name}</strong>
                            </p>
                            <div className="flex items-center justify-center gap-1 opacity-60">
                              {NextRankIcon && [...Array(nextIconCount)].map((_, i) => (
                                <NextRankIcon key={i} className="h-4 w-4" style={{ color: nextRankColor }} />
                              ))}
                              <span className="font-medium" style={{ color: nextRankColor }}>
                                {nextRank.name}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center">
                            <Progress value={100} className="h-3 w-full [&>div]:bg-[#00BFFF] mb-2" />
                            <p className="text-sm font-semibold">Maximalrang erreicht 🚀</p>
                          </div>
                        )}
                      </>
                    </HoverCardContent>
                  </HoverCardPortal>
                </HoverCard>
              )}
          </div>
          <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary"/>
              {isLoading ? <Skeleton className="h-4 w-16" /> : <span className="text-primary">{userData?.money?.toLocaleString('de-DE') ?? '0'} €</span>}
          </div>
        </div>
        
        {/* Right-aligned time */}
        <div className="font-mono tracking-wider text-primary glowing-text">
            {time.toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })} Uhr
        </div>
      </header>
    </>
  );
}
