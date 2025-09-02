"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


export default function LandingPage() {
  const buttonStyles = `
    inline-flex items-center justify-center rounded-full px-6 py-3 text-base sm:px-8 sm:text-lg font-semibold 
    transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-gray-500 dark:focus:ring-offset-black
    bg-gray-900 text-white hover:bg-gray-700 
    dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300
  `;

  const handleNavigation = (path:string) => {
    window.location.href = path;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-center px-4 sm:px-6 antialiased">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mb-10 md:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
          Welcome to TaskManager
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
          Stay on top of your tasks with a sleek, easy-to-use task manager.
          Plan, track, and complete your goals effortlessly.
        </p>
        <a href="/signin" className={buttonStyles}>
          Get Started
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Ready to take control of your productivity?
        </p>
        <Button
          className={buttonStyles}
          onClick={() => handleNavigation("/signin")}
        >
          Start Managing Tasks
        </Button>
      </motion.div>
    </div>
  );
}
