"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

export function useGoogleSignIn() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user: ", user);

      setTimeout(() => {
        router.push("/dashboard")
      }, 0);
      
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return { signInWithGoogle };
}
