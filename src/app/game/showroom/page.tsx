
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Send, Camera, Heart, MessageSquare, Flame } from "lucide-react";

export default function ShowroomPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Showroom
        </h1>
        <p className="text-muted-foreground mt-1">
          Teile deine Lieblingsfahrzeuge mit der Community.
        </p>
      </header>

      {/* Post-Erstellungsbereich */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="p-4 space-y-4">
          <Textarea
            placeholder="Teile ein Foto deines Fahrzeugs..."
            className="bg-black/30 text-base min-h-[60px]"
            disabled
          />
          <div className="flex justify-between items-center">
            <Button variant="outline" className="glowing-border hover:bg-primary/20" disabled>
              <Upload className="mr-2" />
              Foto hochladen
            </Button>
            <Button className="glowing-border" disabled>
              <Send className="mr-2" />
              Posten
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4 bg-border/50" />

      {/* Feed-Bereich */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">
          Community-Beiträge
        </h2>
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <Camera className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-semibold">Es gibt aktuell keine Beiträge.</p>
            <p className="text-sm">Sei der Erste, der sein Fahrzeug im Showroom präsentiert!</p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-4 bg-border/50" />

      {/* Geplante Funktionen */}
      <section className="space-y-4">
         <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">
          Geplante Funktionen
        </h2>
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-accent"/>
                    <p>Bilder hochladen (echte Fotos deiner Fahrzeuge)</p>
                </div>
                <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-accent"/>
                    <p>Beiträge liken</p>
                </div>
                 <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-accent"/>
                    <p>Beiträge kommentieren</p>
                </div>
                <div className="flex items-center gap-3">
                    <Flame className="h-5 w-5 text-accent"/>
                    <p>Trending-Showroom-Posts entdecken</p>
                </div>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
