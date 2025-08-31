"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/components/GoogleSignup";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("signed in user: ", user);

        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("error signing in: ", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4 ">
      <Card className="w-full max-w-sm md:max-w-md shadow-lg shadow-black bg-gray-50 dark:bg-black dark:shadow-gray-950">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl font-semibold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm md:text-md text-gray-700 dark:text-gray-100">
            Welcome back to TaskManager! Please enter your details.
          </CardDescription>
          <CardAction>
            <Link className="text-sm text-gray-800 dark:text-gray-200 dark:hover:text-gray-100 font-semibold hover:text-black" href="/signup">Sign Up</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer" onClick={signIn}>
            Login
          </Button>
          <Button variant="outline" className="w-full cursor-pointer" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
