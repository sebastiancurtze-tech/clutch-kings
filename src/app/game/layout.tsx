
"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/game/Sidebar";
import { Header } from "@/components/game/Header";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Loader2 } from "lucide-react";

export default function GameLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useAuthGuard();

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col p-4 sm:p-8 bg-background/90 backdrop-blur-sm overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
