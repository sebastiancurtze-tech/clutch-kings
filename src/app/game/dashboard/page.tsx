
"use client";

import { useUser } from "@/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, MessageCircle, Trophy, Megaphone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type NewsItem = {
  id: number;
  type: "friend_request" | "message" | "achievement" | "dev_news";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ElementType;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    type: "dev_news",
    title: "Update v2.1 ist live!",
    description: "Neue Fahrzeuge und Neon-Nacht-Events sind jetzt verfügbar. Besuche das Autohaus!",
    timestamp: "vor 2 Stunden",
    icon: Megaphone,
  },
  {
    id: 2,
    type: "achievement",
    title: "Ziel erreicht!",
    description: "Dein Freund 'SpeedDemon' hat den Rang 'Profi-Rennfahrer' erreicht.",
    timestamp: "vor 5 Stunden",
    icon: Trophy,
  },
  {
    id: 3,
    type: "friend_request",
    title: "Neue Freundschaftsanfrage",
    description: "'DriftKing' möchte dein Freund werden.",
    timestamp: "vor 8 Stunden",
    icon: UserPlus,
  },
    {
    id: 4,
    type: "message",
    title: "Neue Nachricht",
    description: "Du hast eine neue Nachricht von 'SpeedDemon' erhalten.",
    timestamp: "vor 1 Tag",
    icon: MessageCircle,
  },
];

const typeStyles = {
    friend_request: "border-blue-500/50 hover:border-blue-500",
    message: "border-green-500/50 hover:border-green-500",
    achievement: "border-yellow-500/50 hover:border-yellow-500",
    dev_news: "border-purple-500/50 hover:border-purple-500",
};

const iconColors = {
    friend_request: "text-blue-400",
    message: "text-green-400",
    achievement: "text-yellow-400",
    dev_news: "text-purple-400",
};


export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">Dashboard</h1>
        <p className="text-muted-foreground">
          Willkommen zurück, {user?.displayName ?? "Spieler"}! Hier sind deine neuesten Updates.
        </p>
      </header>
      <div className="flex flex-col gap-4">
        {newsItems.map((item) => (
          <Card key={item.id} className={cn("bg-card/80 backdrop-blur-sm border-border/50 transition-all", typeStyles[item.type])}>
            <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-black/30 rounded-lg">
                    <item.icon className={cn("h-6 w-6", iconColors[item.type])} />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-base text-primary-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{item.timestamp}</span>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

    