
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Home,
  Fuel,
  Droplets,
  Landmark,
  PlusCircle,
  UserPlus,
  Send,
  MessageSquare,
  Shield,
  Star,
} from "lucide-react";

const crewBuildings = [
  {
    name: "Hauptquartier",
    description: "Erhöht die maximale Mitgliederzahl.",
    icon: Home,
  },
  {
    name: "Tankstelle",
    description: "Senkt Treibstoffkosten für Mitglieder.",
    icon: Fuel,
  },
  {
    name: "Waschanlage",
    description: "Erzeugt passives Einkommen für die Crewkasse.",
    icon: Droplets,
  },
  {
    name: "Crewkasse",
    description: "Geldreservoir, das Admins für Upgrades verwenden.",
    icon: Landmark,
  },
];

const placeholderMembers = [
  { name: "Mitgliedsname 1", rank: "Fahranfänger" },
  { name: "Mitgliedsname 2", rank: "Profi" },
  { name: "Mitgliedsname 3", rank: "Meister" },
];

export default function CrewPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Crew
        </h1>
        <p className="text-muted-foreground mt-1">
          Tritt einer Crew bei oder verwalte deine eigene.
        </p>
      </header>

      {/* Sektion 1: Crew-Status */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl tracking-wider glowing-text">
            Dein Crew-Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Du bist derzeit in keiner Crew.
          </p>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row justify-center gap-4">
          <Button className="w-full sm:w-auto glowing-border hover:bg-primary/90">
            <UserPlus className="mr-2" />
            Crew beitreten
          </Button>
          <Button variant="outline" className="w-full sm:w-auto bg-accent/80 text-accent-foreground hover:bg-accent glowing-border border-accent/50 border">
            <PlusCircle className="mr-2" />
            Eigene Crew gründen
          </Button>
        </CardFooter>
      </Card>
      
      <Separator className="my-4 bg-border/50" />

      {/* Sektion 2: Crew-Gebäude */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">
          Crew-Gebäude
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crewBuildings.map((building) => (
            <Card key={building.name} className="bg-card/80 backdrop-blur-sm border-border/50 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <building.icon className="text-accent h-6 w-6" />
                  {building.name}
                </CardTitle>
                <CardDescription>{building.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <div className="text-sm text-muted-foreground">Aktuelle Stufe: <span className="font-bold text-primary">1</span></div>
                <div className="text-xs text-muted-foreground">
                  Kosten: <span className="font-mono text-primary">— $</span> | Dauer: <span className="font-mono text-primary">— s</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full glowing-border hover:bg-primary/20 hover:text-primary">
                  Ausbauen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-4 bg-border/50" />

      {/* Sektion 3: Mitglieder & Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {/* Mitgliederliste */}
          <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">
            Crew-Mitglieder (1/10)
          </h2>
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 space-y-3">
              {placeholderMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-muted-foreground/20 text-xs">PIC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.rank}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Mitglied</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Crew Chat */}
        <div className="space-y-4">
          <h2 className="font-headline text-2xl tracking-wider text-primary glowing-text">
            Crew-Chat
          </h2>
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 flex flex-col h-[400px]">
            <CardContent className="flex-grow p-4 flex flex-col items-center justify-center text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4"/>
              <p className="text-muted-foreground">Der Chat ist hier verfügbar.</p>
              <p className="text-xs text-muted-foreground">Nachrichten folgen in Kürze.</p>
            </CardContent>
            <CardFooter className="p-3 border-t border-border/50 bg-black/20">
              <div className="flex w-full items-center gap-2">
                <Input type="text" placeholder="Nachricht senden..." className="bg-background/70" />
                <Button variant="ghost" size="icon">
                  <Send className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
