"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  Car,
  GaugeCircle,
  Wrench,
  LogOut,
  ChevronDown,
  Warehouse,
  ShoppingBasket,
  Users,
  Trophy,
  Flame,
  Building,
  Settings,
  Swords,
} from "lucide-react";

import { useAuth, useUser } from "@/firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const mainNav = [
  { name: "Dashboard", href: "/game/dashboard", icon: GaugeCircle },
  { name: "Profil", href: "/game/profile", icon: Wrench },
  { name: "Autohaus", href: "/game/autohaus", icon: Building },
  { name: "Schwarzmarkt", href: "/game/schwarzmarkt", icon: ShoppingBasket },
  { name: "Garage", href: "/game/garage", icon: Warehouse },
  { name: "Werkstatt", href: "/game/werkstatt", icon: Flame },
  { name: "Rennen", href: "/game/rennen", icon: Swords },
  { name: "Crew", href: "/game/crew", icon: Users },
  { name: "Showroom", href: "/game/showroom", icon: Car },
  { name: "Rangliste", href: "/game/rangliste", icon: Trophy },
  { name: "Einstellungen", href: "/game/einstellungen", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <div className="hidden border-r bg-card lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/game/dashboard" className="flex items-center gap-2 font-semibold">
            <Car className="h-6 w-6 text-primary glowing-text" />
            <span className="font-headline text-xl tracking-wider">Clutch Kings</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {mainNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                  pathname === item.href && "bg-primary/10 text-primary glowing-text"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center justify-between w-full hover:bg-secondary">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary">
                    <AvatarImage src={user?.photoURL ?? undefined} />
                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 focus:bg-red-400/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
