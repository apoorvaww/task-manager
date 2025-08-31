"use client";

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
import { auth } from "@/lib/firebase";
import { Label } from "@radix-ui/react-label";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user: ", user);
      })
      .catch((error) => {
        console.error("error during sign up: ", error.message);
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        console.log("signed out successfully");
      })
      .catch((error) => {
        console.error("error signing out: ", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4 ">
      <Card className="w-full max-w-sm md:max-w-md bg-gray-50 dark:bg-black shadow-lg shadow-black dark:shadow-gray-950">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-3xl font-semibold">
            Sign Up
          </CardTitle>
          <CardDescription className="text-sm md:text-md text-gray-700 dark:text-gray-100">
            Enter your information to start managing your tasks today!
          </CardDescription>
          <CardAction>
            <Link
              className="text-sm text-gray-800 dark:text-gray-200 dark:hover:text-gray-100 font-semibold hover:text-black"
              href="/signin"
            >
              Sign In
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input id="confirmPassword" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            Sign up
          </Button>
          <Button variant="outline" className="w-full cursor-pointer">
            Sign up with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
