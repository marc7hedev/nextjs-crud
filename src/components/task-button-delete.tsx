"use client"


import { toast } from "sonner";
import { Button } from "./ui/button"
import { removeTask } from "@/actions/task-actions";

export function TaskButtonDelete({taskId}: {taskId: number}) {

    return (
        <form action={removeTask}>
            <input type="hidden" name="taskId" value={taskId}/>
            <Button variant="destructive"
            onClick={() => toast.info("Tarea eliminada con éxito")}>
                Delete
            </Button>
        </form>
    )
}

export default TaskButtonDelete