
"use client";

import { useUser } from "@/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRank } from "@/hooks/useRank";
import { Progress } from "@/components/ui/progress";
import { Crown, Flame, Gauge, CircleDot } from "lucide-react";

const rankIcons: { [key: string]: React.ElementType } = {
  SteeringWheel: CircleDot, // Ersetzt durch CircleDot
  Gauge: Gauge,
  Flame: Flame,
  Crown: Crown,
};

export default function ProfilePage() {
  const { user } = useUser();
  const { rankData, isLoading: isRankLoading } = useRank();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("");
  };

  const RankIcon = rankData?.rankIcon ? rankIcons[rankData.rankIcon] : null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
       <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <Avatar className="h-28 w-28 border-4 border-primary glowing-border mb-4">
              <AvatarImage src={user?.photoURL ?? undefined} alt="Profilbild" />
              <AvatarFallback className="text-4xl bg-transparent">
                {getInitials(user?.displayName)}
              </AvatarFallback>
            </Avatar>
            {isRankLoading ? (
                <Skeleton className="h-10 w-48 mb-2" />
              ) : (
                <CardTitle className="font-headline text-5xl glowing-text">{user?.displayName}</CardTitle>
            )}
             {isRankLoading ? (
                <Skeleton className="h-5 w-64" />
              ) : (
                <CardDescription className="text-lg text-muted-foreground">{user?.email}</CardDescription>
              )}
        </CardHeader>
        <CardContent className="flex flex-col gap-8 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="p-4 border rounded-lg bg-black/20 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-muted-foreground font-headline tracking-wider">Rang</h3>
                <div className="text-xl font-semibold mt-1 text-primary-foreground flex items-center justify-center gap-2">
                    {isRankLoading ? <Skeleton className="h-7 w-3/4 mt-1" /> : (
                      <>
                        {RankIcon && <RankIcon className="h-5 w-5 text-primary"/>}
                        {rankData?.rankName || "Fahrschüler"}
                      </>
                    )}
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-black/20 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-muted-foreground font-headline tracking-wider">Siege</h3>
                <div className="text-xl font-semibold mt-1 text-primary-foreground">
                    {isRankLoading ? <Skeleton className="h-7 w-3/4 mt-1" /> : (rankData?.wins ?? 0)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-center text-muted-foreground">Fortschritt zum nächsten Rang</p>
              <Progress value={isRankLoading ? 0 : rankData?.progress ?? 0} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{rankData?.rankName}</span>
                <span>{rankData?.nextRankName}</span>
              </div>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" className="hover:bg-primary/20 hover:text-primary transition-all glowing-border" disabled>
                    <Camera className="mr-2 h-4 w-4" />
                    Profilbild hochladen
                </Button>
            </div>

            <div className="space-y-4">
                <label htmlFor="status" className="font-headline text-lg tracking-wider">Dein Status</label>
                <Textarea id="status" placeholder="Bereit für das nächste Rennen!" className="bg-black/30 text-base" />
                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Dieser Status ist für andere Spieler sichtbar.</p>
                    <Button disabled>
                        <Send className="mr-2 h-4 w-4" />
                        Status posten
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
