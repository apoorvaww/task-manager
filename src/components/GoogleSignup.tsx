'use client'

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";


export const signInWithGoogle = async (router: any) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user: ", user);
      router.push('/dashboard')
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };


export default function GoogleSignup() {
  return (
    <div>
      <button onClick={signInWithGoogle}>sign in using google</button>
    </div>
  );
}
