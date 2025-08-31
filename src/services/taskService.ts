import { db } from "@/lib/firebase";
import { Task } from "@/types/task";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";


//// adding tasks:
export const addTask = async (task: Task) => {
    await addDoc(collection(db, "users", task.userId, "tasks"), task);
}


//// fetching tasks:
export const fetchTasks = async (uid: string): Promise<Task[]> => {
    const tasksSnapshot = await getDocs(collection(db, "users", uid, "tasks"));

    console.log("task snapshot: ", tasksSnapshot);
    return tasksSnapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
    })) as Task[];
};


//// updating task:
export const updateTask = async(uid: string, taskId: string, updatedTask: Partial<Task>) => {
    await updateDoc(doc(db, "users", uid, "tasks", taskId), updatedTask);
}


//// deleting a task: 
export const deleteTask = async(uid: string, taskId: string) => {
    await deleteDoc(doc(db, "users", uid, "tasks", taskId));
}