import { Task } from "@prisma/client";

export interface TaskPageParams {
    id: string;
}

export interface TaskFormProps {
    task?: Task;
}