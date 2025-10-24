
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function EinstellungenPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-wider glowing-text">
          Einstellungen
        </h1>
        <p className="text-muted-foreground mt-1">
          Verwalte dein Konto, deine Privatsphäre und weitere Optionen.
        </p>
      </header>

      <div className="space-y-8">
        {/* Sektion: Kontoeinstellungen */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wider glowing-text text-primary">
              Konto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border/50 p-4">
              <div>
                <Label className="font-semibold">E-Mail-Adresse ändern</Label>
                <p className="text-xs text-muted-foreground">Funktion folgt demnächst</p>
              </div>
              <Button variant="outline" disabled>Ändern</Button>
            </div>
             <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border/50 p-4">
              <div>
                <Label className="font-semibold">Passwort ändern</Label>
                <p className="text-xs text-muted-foreground">Funktion folgt demnächst</p>
              </div>
              <Button variant="outline" disabled>Ändern</Button>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-destructive/50 bg-destructive/10 p-4">
               <div>
                <Label className="font-semibold text-destructive">Account löschen</Label>
                <p className="text-xs text-destructive/80">Diese Aktion kann nicht rückgängig gemacht werden.</p>
              </div>
              <Button variant="destructive" disabled>Löschen</Button>
            </div>
          </CardContent>
        </Card>

        {/* Sektion: Privatsphäre & Sicherheit */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wider glowing-text text-primary">
              Privatsphäre & Sicherheit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg p-4 bg-black/20">
              <Label htmlFor="privacy-public-profile">Profil öffentlich anzeigen</Label>
              <Switch id="privacy-public-profile" disabled />
            </div>
            <div className="flex items-center justify-between rounded-lg p-4 bg-black/20">
              <Label htmlFor="privacy-share-stats">Statistiken teilen</Label>
              <Switch id="privacy-share-stats" disabled />
            </div>
            <div className="flex items-center justify-between rounded-lg p-4 bg-black/20">
              <Label htmlFor="privacy-friend-requests">Freundschaftsanfragen erlauben</Label>
              <Switch id="privacy-friend-requests" disabled defaultChecked/>
            </div>
             <div className="flex items-center justify-between rounded-lg p-4 bg-black/20">
              <Label htmlFor="privacy-online-status">Online-Status anzeigen</Label>
              <Switch id="privacy-online-status" disabled defaultChecked/>
            </div>
          </CardContent>
        </Card>

        {/* Sektion: Benachrichtigungen */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wider glowing-text text-primary">
              Benachrichtigungen
            </CardTitle>
             <CardDescription>Diese Optionen sind aktuell noch inaktiv.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center space-x-2">
                <Switch id="notifications-messages" disabled defaultChecked/>
                <Label htmlFor="notifications-messages">Neue Nachrichten</Label>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="notifications-race-invites" disabled defaultChecked/>
                <Label htmlFor="notifications-race-invites">Renn-Einladungen</Label>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="notifications-crew" disabled defaultChecked/>
                <Label htmlFor="notifications-crew">Crew-Aktivitäten</Label>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="notifications-dev-news" disabled defaultChecked/>
                <Label htmlFor="notifications-dev-news">Entwickler-Neuigkeiten</Label>
            </div>
          </CardContent>
        </Card>
        
        {/* Sektion: Sprache & Region */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wider glowing-text text-primary">
              Sprache & Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select defaultValue="de" disabled>
              <SelectTrigger className="w-full max-w-sm bg-black/30">
                <SelectValue placeholder="Sprache auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="de">Deutsch 🇩🇪</SelectItem>
                <SelectItem value="en">Englisch 🇬🇧</SelectItem>
                <SelectItem value="fr">Französisch 🇫🇷</SelectItem>
                <SelectItem value="es">Spanisch 🇪🇸</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {/* Sektion: Rechtliches */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wider glowing-text text-primary">
              Rechtliches & Datenschutz
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="w-full sm:w-auto" disabled>Datenschutz</Button>
            <Button variant="outline" className="w-full sm:w-auto" disabled>Impressum</Button>
            <Button variant="outline" className="w-full sm:w-auto" disabled>Nutzungsbedingungen</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
