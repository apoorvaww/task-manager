"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // your firebase config
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur-md">
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
              src={user.photoURL || "/default-avatar.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border"
            />
          </div>
        ) : (
          <Link href='/signin' className="text-sm text-gray-500">Sign in</Link>
        )}
      </div>
    </header>
  );
}
