
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";

export function useAuthGuard() {
  const { user, isUserLoading, userError } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user loading has completed and there is no user, redirect to login
    if (!isUserLoading && !user) {
      router.push("/login");
    }
    // If there was an error during authentication, it's safer to redirect to login
    if (userError) {
      console.error("Authentication error, redirecting to login:", userError);
      router.push("/login");
    }
  }, [user, isUserLoading, userError, router]);

  return { user, isUserLoading };
}
