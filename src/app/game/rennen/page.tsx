
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, BarChart, Car, Users, PlusCircle, Swords } from "lucide-react";

// --- Sektion 1: Platzhalter für Entwickler-Events ---
const devEvents = [
  {
    title: "Asphalt Fury Cup",
    description: "Offenes Event für alle Fahrer. Zeige dein Können und gewinne exklusive Belohnungen.",
    period: "12. – 14. Juli",
    rank: "Fahranfänger oder höher",
    classes: "Kleinwagen, Limousine",
  },
  {
    title: "Neon Nights Championship",
    description: "Ein nächtliches Turnier unter den Lichtern der Stadt. Nur für erfahrene Piloten.",
    period: "20. – 22. Juli",
    rank: "Profi oder höher",
    classes: "Sportwagen, Hypercar",
  },
];

// --- Sektion 2: Platzhalter für tägliche Rennen ---
const dailyRaces = ["08:00", "10:00", "12:00", "15:00", "18:00", "20:00"];


export default function RennenPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Rennen
        </h1>
        <p className="text-muted-foreground mt-1">
            Tritt gegen andere Fahrer an oder starte dein eigenes Rennen.
        </p>
      </header>

      {/* Sektion 1: Entwickler-Events */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">Eventrennen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devEvents.map((event) => (
                <Card key={event.title} className="bg-card/80 backdrop-blur-sm border-border/50 flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Swords className="text-accent h-6 w-6"/>
                            {event.title}
                        </CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3 text-sm">
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4"/>
                            <span>Teilnahmezeitraum: {event.period}</span>
                         </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <BarChart className="h-4 w-4"/>
                            <span>Benötigter Rang: {event.rank}</span>
                         </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Car className="h-4 w-4"/>
                            <span>Zugelassene Klassen: {event.classes}</span>
                         </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full glowing-border hover:bg-primary/90">Teilnehmen</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>

      <Separator className="my-4 bg-border/50"/>

      {/* Sektion 2: Tägliche Rennen */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">Tägliche Rennen</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dailyRaces.map((time) => (
                 <Card key={time} className="bg-card/80 backdrop-blur-sm border-border/50 text-center">
                    <CardHeader className="pb-2">
                        <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground"/>
                            {time}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <p className="text-xs text-muted-foreground mb-3">Melde dich für dieses Rennen an.</p>
                         <Button size="sm" variant="outline" className="w-full hover:bg-primary/20 hover:text-primary transition-all glowing-border">Teilnehmen</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <Separator className="my-4 bg-border/50"/>
      
      {/* Sektion 3: Eigene Rennen */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">Eigenes Rennen erstellen</h2>
         <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <p className="text-lg font-semibold">Starte dein eigenes Rennen</p>
                    <p className="text-muted-foreground">Lade deine Crew oder Freunde ein und fahrt um die Wette.</p>
                </div>
                 <Button size="lg" className="bg-accent/80 text-accent-foreground hover:bg-accent glowing-border border-accent/50 border">
                    <PlusCircle className="mr-2"/> Rennen hosten
                </Button>
            </CardContent>
             <CardFooter className="bg-black/20 p-4 text-center justify-center border-t border-border/50">
                <p className="text-muted-foreground text-sm">Noch keine Rennen erstellt.</p>
            </CardFooter>
        </Card>
      </section>

    </div>
  );
}
