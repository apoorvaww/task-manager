"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, CheckCircle2, Clock, Trash2, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { SidebarNav } from "@/components/Sidebar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "@/services/taskService";
import { Task } from "@/types/task";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
  });
  const [filter, setFilter] = useState("all");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks(user.uid);
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, [user]);

  const handleAddTask = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!user || !newTask.title.trim()) return;

    const taskk: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      userId: user.uid,
      title: newTask.title,
      content: newTask.content,
      status: "todo",
    };

    try {
      const createdTask = await addTask(taskk);
      setTasks((prev) => [...prev, createdTask]);
      setNewTask({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding tasks: ", error);
    }
  };

  const handleStatusChange = async (
    id: string,
    currentStatus: Task["status"]
  ) => {
    if (!user) return;
    const nextStatus: Task["status"] =
      currentStatus == "todo"
        ? "in-progress"
        : currentStatus === "in-progress"
        ? "completed"
        : "todo";

    await updateTask(user.uid, id, { status: nextStatus });

    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: nextStatus, updatedAt: new Date() } : t
      )
    );
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteTask(user.uid, id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.status === "completed";
      if (filter === "todo") return task.status === "todo";
      if (filter === "in-progress") return task.status === "in-progress";
      return true;
    });
  }, [tasks, filter]);

  const pendingTasksCount = useMemo(
    () => tasks.filter((t) => t.status === "todo").length,
    [tasks]
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 w-64 bg-background z-50 md:hidden border-r border-border"
            >
              <SidebarNav
                filter={filter}
                setFilter={(f) => {
                  setFilter(f);
                  setSidebarOpen(false);
                }}
              />
            </motion.aside>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      <aside className="w-64 hidden md:flex flex-col bg-background border-r border-border">
        <SidebarNav filter={filter} setFilter={setFilter} />
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
        <header className="flex justify-end items-center pb-6 border-b border-border gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Welcome back,{" "}
                <span className="font-medium">{user.displayName}</span>
              </span>
              <img
                src={user.photoURL ?? ""}
                alt={user.displayName ?? "User"}
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          )}
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <form
          onSubmit={handleAddTask}
          className="flex items-center bg-card border border-border rounded-lg p-2 gap-2 shadow-sm"
        >
          <Plus className="h-5 w-5 ml-2 text-muted-foreground" />
          <Input
            placeholder="Add a new task..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          />
          <Button type="submit" className="px-5">
            Add Task
          </Button>
        </form>

        {/* 🔥 Modern heading before tasks */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Your Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {pendingTasksCount > 0
              ? `You have ${pendingTasksCount} task${
                  pendingTasksCount > 1 ? "s" : ""
                } pending ⏳`
              : "All tasks are done 🎉"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-2"
          >
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Card className="bg-card h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {task.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end justify-between">
                      <span
                        className={clsx(
                          "text-xs font-medium px-2.5 py-1 rounded-full",
                          {
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300":
                              task.status === "todo",
                            "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300":
                              task.status === "completed",
                          }
                        )}
                      >
                        {task.status}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            handleStatusChange(task.id!, task.status)
                          }
                          className="rounded-full h-8 w-8 text-muted-foreground hover:bg-secondary"
                        >
                          {task.status === "todo" ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(task.id!)}
                          className="rounded-full h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
