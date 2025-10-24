"use client";

import { Car, Lock } from "lucide-react";

export default function GaragePage() {
  const totalSlots = 5;
  const unlockedSlots = 1;

  return (
    <div className="flex flex-1 flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Garage
        </h1>
        <p className="text-muted-foreground mt-1">
          Hier siehst du deine aktuell geparkten Fahrzeuge.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {Array.from({ length: totalSlots }).map((_, index) => {
          const isUnlocked = index < unlockedSlots;

          if (isUnlocked) {
            // Unlocked and empty slot
            return (
              <div
                key={index}
                className="relative flex aspect-video flex-col items-center justify-center rounded-lg border-2 border-primary/50 bg-black/30 p-6 text-center shadow-lg shadow-primary/10 transition-all glowing-border"
              >
                <div className="flex flex-col items-center justify-center">
                  <Car className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="font-semibold text-muted-foreground">
                    Kein Fahrzeug vorhanden.
                  </p>
                </div>
              </div>
            );
          } else {
            // Locked slot
            return (
              <div
                key={index}
                className="relative flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-black/20 p-6 text-center text-muted-foreground backdrop-blur-sm"
              >
                <Lock className="h-8 w-8 text-muted-foreground/50 mb-4" />
                <p className="text-sm">
                  Weitere Stellplätze werden mit höheren Rängen freigeschaltet.
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
