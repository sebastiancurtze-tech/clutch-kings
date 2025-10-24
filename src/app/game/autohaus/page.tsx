"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";

const vehicleClasses = [
  "Kleinwagen",
  "Limousine",
  "SUV",
  "Sportwagen",
  "Hypercar",
];

export default function AutohausPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Autohaus
        </h1>
        <p className="text-muted-foreground">
          Wähle eine Fahrzeugklasse, um verfügbare Modelle zu sehen.
        </p>
      </header>

      <Tabs defaultValue="Kleinwagen" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/30">
          {vehicleClasses.map((vehicleClass) => (
            <TabsTrigger
              key={vehicleClass}
              value={vehicleClass}
              className="font-headline tracking-wider text-base data-[state=active]:text-primary data-[state=active]:glowing-text"
            >
              {vehicleClass}
            </TabsTrigger>
          ))}
        </TabsList>
        {vehicleClasses.map((vehicleClass) => (
          <TabsContent key={vehicleClass} value={vehicleClass}>
            <Card className="mt-4 border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <Car className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">
                  Noch keine Fahrzeuge in der Kategorie "{vehicleClass}" verfügbar.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
