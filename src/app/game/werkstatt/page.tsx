
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Flame,
  Gauge,
  Cpu,
  Fuel,
  GitBranch,
  Disc,
  Rocket,
  Wrench,
} from "lucide-react";

const tuningParts = [
  {
    id: "motor",
    name: "Motor",
    description: "Erhöht die Leistung und das Drehmoment deines Fahrzeugs.",
    icon: Gauge,
    dependency: null,
  },
  {
    id: "turbolader",
    name: "Turbolader",
    description: "Verbessert die Beschleunigung durch erhöhten Ladedruck.",
    icon: Flame,
    dependency: null,
  },
  {
    id: "ecu",
    name: "ECU",
    description: "Optimiert die Motorsteuerung für maximale Effizienz.",
    icon: Cpu,
    dependency: null,
  },
  {
    id: "tank",
    name: "Tank",
    description: "Erhöht das Fassungsvermögen für längere Fahrten.",
    icon: Fuel,
    dependency: null,
  },
  {
    id: "fahrwerk",
    name: "Fahrwerk",
    description: "Verbessert das Handling und die Stabilität in Kurven.",
    icon: GitBranch,
    dependency: null,
  },
  {
    id: "bremsen",
    name: "Bremsen",
    description: "Verkürzt den Bremsweg für präzisere Manöver.",
    icon: Disc,
    dependency: null,
  },
  {
    id: "nitro",
    name: "Nitro-System",
    description: "Sorgt für einen kurzzeitigen, extremen Geschwindigkeitsschub.",
    icon: Rocket,
    dependency: "Freischaltbar ab Motor Stufe 10 & Turbolader Stufe 5",
  },
];

export default function WerkstattPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Werkstatt
        </h1>
        <p className="text-muted-foreground mt-1">
          Wähle ein Bauteil, um es zu tunen oder zu verbessern.
        </p>
      </header>

      <div className="flex justify-center">
        <Select>
          <SelectTrigger className="w-full max-w-sm bg-black/30 glowing-border border-primary/30 font-headline">
            <SelectValue placeholder="Fahrzeug auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Kein Fahrzeug ausgewählt</SelectItem>
            <SelectItem value="car1">Fahrzeug 1 (Platzhalter)</SelectItem>
            <SelectItem value="car2">Fahrzeug 2 (Platzhalter)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6">
        {tuningParts.map((part) => (
          <Card
            key={part.id}
            className="flex flex-col md:flex-row items-center border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden"
          >
            <div className="w-full md:w-48 h-32 md:h-full relative flex-shrink-0 bg-black/20 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Bild folgt</p>
            </div>

            <div className="flex-1 p-6">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center gap-3 text-2xl font-headline glowing-text text-primary">
                  <part.icon className="h-6 w-6" />
                  <span>{part.name}</span>
                </CardTitle>
                <CardDescription className="pt-2 text-base">{part.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                   <div className="p-3 bg-black/40 rounded-lg shadow-inner">
                    <p className="text-xs text-muted-foreground font-headline tracking-wide">
                      Stufe
                    </p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      1
                    </p>
                  </div>
                   <div className="p-3 bg-black/40 rounded-lg shadow-inner">
                    <p className="text-xs text-muted-foreground font-headline tracking-wide">
                      Kosten
                    </p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      — $
                    </p>
                  </div>
                   <div className="p-3 bg-black/40 rounded-lg shadow-inner">
                    <p className="text-xs text-muted-foreground font-headline tracking-wide">
                      Dauer
                    </p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      — s
                    </p>
                  </div>
                </div>
                 <Button className="glowing-border hover:bg-primary/90 mt-4 sm:mt-0 w-full sm:w-auto">
                    <Wrench className="mr-2" />
                    Tunen
                </Button>
              </CardContent>
              {part.dependency && (
                <CardFooter className="p-0 pt-4">
                  <p className="w-full text-center text-xs text-yellow-400/80 font-semibold bg-yellow-900/20 py-2 px-4 rounded-md border border-yellow-500/30">
                    {part.dependency}
                  </p>
                </CardFooter>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
