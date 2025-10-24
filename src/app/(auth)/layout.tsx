import { Car } from 'lucide-react';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4 flex items-center gap-2 text-lg font-semibold text-foreground md:top-8 md:left-8">
        <Car className="h-6 w-6 text-primary glowing-text" />
        <h1 className="font-headline text-xl tracking-wider">Clutch Kings</h1>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
}
