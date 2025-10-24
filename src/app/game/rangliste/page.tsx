"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const leaderboardCategories = [
  "Gesamtrangliste",
  "Schnellstes Auto",
  "Höchster Rang",
  "Meiste Siege",
  "Beste Crew",
];

export default function RanglistePage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Rangliste
        </h1>
        <p className="text-muted-foreground">
          Wer ist der beste Fahrer im Spiel?
        </p>
      </header>

      <Tabs defaultValue="Gesamtrangliste" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/30">
          {leaderboardCategories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="font-headline tracking-wider text-base data-[state=active]:text-primary data-[state=active]:glowing-text"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {leaderboardCategories.map((category) => (
          <TabsContent key={category} value={category}>
            <Card className="mt-4 border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <Trophy className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">
                  Es gibt derzeit keine Einträge in der Kategorie "{category}".
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Künftige Kategorien: Beste Crew, Schnellstes Fahrzeug, Höchster Rang, Meiste Siege.
                  <br/>
                  Punkte- und Rangsystem werden später definiert.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
