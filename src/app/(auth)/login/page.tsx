
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Loader2, LogIn } from "lucide-react";

import { useAuth, useFirestore, FirestorePermissionError, errorEmitter } from "@/firebase";
import { loginSchema, type LoginData } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const db = useFirestore();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginData) {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Force token refresh to ensure auth state is propagated for rules
      await user.getIdToken(true);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // If the document doesn't exist, create it. This handles old accounts
      // that might not have a profile document yet.
      if (!userSnap.exists()) {
        const newUserDoc = {
          displayName: user.displayName || user.email?.split('@')[0] || "Neuer Fahrer",
          email: user.email,
          money: 20000,
          wins: 0,
          rankLevel: 1,
          rankName: "Fahrschüler",
          rankClass: "Anfänger",
          rankIcon: "CircleDot",
          passiveIncome: 5,
          lastIncomeTime: serverTimestamp(),
        };
        // Perform the setDoc and catch permission errors specifically
        setDoc(userRef, newUserDoc, { merge: true })
          .catch((error) => {
            const permissionError = new FirestorePermissionError({
                path: userRef.path,
                operation: 'create',
                requestResourceData: newUserDoc,
            });
            errorEmitter.emit('permission-error', permissionError);
          });
      }
      
      router.push("/game/dashboard");

    } catch (error: any) {
      console.error("Login Error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error.code === "auth/invalid-credential"
            ? "Invalid email or password."
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
        <CardDescription>Log in to continue to Clutch Kings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      type="email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      {...field}
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <LogIn /> Log In
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button variant="link" asChild className="p-0">
            <Link href="/register">Sign up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
