export interface Task {
    id?: string;
    title: string;
    content: string;
    status: "todo" | "in-progress" | "completed";
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}