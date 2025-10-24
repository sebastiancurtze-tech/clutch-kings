
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Filter, ShoppingBasket } from "lucide-react";

export default function SchwarzmarktPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
            Schwarzmarkt
          </h1>
          <p className="text-muted-foreground mt-1">
            Kaufe und verkaufe Fahrzeuge anderer Spieler.
          </p>
        </div>
        <Button size="lg" className="bg-accent/80 text-accent-foreground hover:bg-accent glowing-border border-accent/50 border">
          <Car className="mr-2" /> Fahrzeug zum Verkauf anbieten
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-1">
          <Card className="bg-card/80 backdrop-blur-sm sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline tracking-wider glowing-text text-xl">
                <Filter className="h-5 w-5 text-primary"/>
                Angebote filtern
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="class" className="text-muted-foreground">Fahrzeugklasse</Label>
                <Select>
                  <SelectTrigger id="class" className="w-full bg-black/30">
                    <SelectValue placeholder="Alle Klassen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Klassen</SelectItem>
                    <SelectItem value="kleinwagen">Kleinwagen</SelectItem>
                    <SelectItem value="limousine">Limousine</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="sportwagen">Sportwagen</SelectItem>
                    <SelectItem value="hypercar">Hypercar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Preisspanne</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="min." className="bg-black/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  <span className="text-muted-foreground">-</span>
                  <Input type="number" placeholder="max." className="bg-black/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort" className="text-muted-foreground">Sortieren nach</Label>
                <Select>
                  <SelectTrigger id="sort" className="w-full bg-black/30">
                    <SelectValue placeholder="Datum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Datum</SelectItem>
                    <SelectItem value="price_asc">Preis (aufsteigend)</SelectItem>
                    <SelectItem value="price_desc">Preis (absteigend)</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Listings */}
        <main className="lg:col-span-3">
            <Card className="bg-card/80 backdrop-blur-sm h-full">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center h-full">
                    <ShoppingBasket className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <p className="text-lg font-headline tracking-wider text-muted-foreground">
                        Aktuell stehen keine Fahrzeuge zum Verkauf.
                    </p>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
