"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  Sun,
  Moon,
  LayoutGrid,
  UserCircle,
} from "lucide-react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
interface SidebarNavProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function SidebarNav({ filter, setFilter }: SidebarNavProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const navItemClasses = (currentFilter: string) =>
    clsx(
      "w-full justify-start text-sm font-medium transition-colors rounded-lg px-3 py-2",
      {
        "bg-primary text-primary-foreground": filter === currentFilter,
        "hover:bg-muted text-muted-foreground": filter !== currentFilter,
      }
    );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin"); // redirect to signin page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-2xl font-bold mb-8 px-2 text-foreground">
        TaskManager
      </h2>
      <nav className="space-y-2 flex-1">
        <Button
          variant="ghost"
          className={navItemClasses("all")}
          onClick={() => setFilter("all")}
        >
          <LayoutGrid className="mr-3 h-5 w-5" /> All Tasks
        </Button>
        <Button
          variant="ghost"
          className={navItemClasses("completed")}
          onClick={() => setFilter("completed")}
        >
          <CheckCircle2 className="mr-3 h-5 w-5" /> Completed
        </Button>
        <Button
          variant="ghost"
          className={navItemClasses("todo")}
          onClick={() => setFilter("todo")}
        >
          <Clock className="mr-3 h-5 w-5" /> Pending
        </Button>
        <Button
          variant="ghost"
          className={navItemClasses("in-progress")}
          onClick={() => setFilter("in-progress")}
        >
          <Clock className="mr-3 h-5 w-5" /> In progress
        </Button>
      </nav>
      <div className="space-y-2">
        <Button
          variant="ghost"
          className={navItemClasses("theme")}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="mr-3 h-5 w-5" />
          ) : (
            <Sun className="mr-3 h-5 w-5" />
          )}
          Toggle Theme
        </Button>
        <Button
          variant="ghost"
          className={navItemClasses("user")}
          onClick={handleLogout} 
        >
          <UserCircle className="mr-3 h-5 w-5" /> Logout
        </Button>
      </div>
    </div>
  );
}
