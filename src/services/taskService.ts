import { db } from "@/lib/firebase";
import { Task } from "@/types/task";
import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";


//// adding tasks:
export const addTask = async (task: Omit<Task,"id" | "createdAt" | "updatedAt">) => {
    const taskWithTimestamp = {
        ...task,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const docref = await addDoc(collection(db, "users", task.userId, "tasks"), taskWithTimestamp);
    return {...task, id: docref.id, createdAt: new Date(), updatedAt: new Date()};
}


//// fetching tasks:
export const fetchTasks = async (uid: string): Promise<Task[]> => {
    const tasksSnapshot = await getDocs(collection(db, "users", uid, "tasks"));

    console.log("task snapshot: ", tasksSnapshot);
    return tasksSnapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Task, "id"> & {
            createdAt: Timestamp;
            updatedAt: Timestamp;
        };
        return{
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        }
    })
};


//// updating task:
export const updateTask = async(
    uid: string, 
    taskId: string, 
    updatedTask: Partial<Task>
) => {
    await updateDoc(doc(db, "users", uid, "tasks", taskId), {
        ...updatedTask,
        updatedAt: new Date(),
    });
}


//// deleting a task: 
export const deleteTask = async(uid: string, taskId: string) => {
    await deleteDoc(doc(db, "users", uid, "tasks", taskId));
}