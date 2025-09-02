"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // your firebase config
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { toast } from "sonner";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      toast("Sign in to start managing your tasks");
    }
  }, [user]);

  return (
    <header className="w-full border-b backdrop-blur-md">
      <div className="container mx-auto flex justify-end items-center py-3 px-4">
        {user ? (
          <div className="flex items-center gap-3">
            <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
              Welcome back,{" "}
              <span className="font-semibold">
                {user.displayName || "User"}
              </span>
            </p>
            <Image
              src={
                user.photoURL ||
                "/user.png"
              }
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border"
            />
          </div>
        ) : (
          <>
            <p className="text-center mr-3">You are not signed in </p>{" "}
            <Link
              href="/signin"
              className="text-md font-semibold text-white dark:text-black bg-black dark:bg-white px-3 py-2 rounded-xl "
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
