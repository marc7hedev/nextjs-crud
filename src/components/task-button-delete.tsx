"use client"

import { Button } from "./ui/button"
import { removeTask } from "@/actions/task-actions";
import { useTransition } from "react";
import { toast } from "sonner";

export default function TaskButtonDelete({taskId}: {taskId: number}) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async (formData: FormData) => {
        startTransition(async () => {
            try {
                await removeTask(formData);
                toast.success("Tarea eliminada correctamente");
            } catch {
                toast.error("Error al eliminar la tarea");
            }
        });
    };

    return (
        <form action={handleDelete}>
            <input type="hidden" name="taskId" value={taskId} />
            <Button 
                type="submit"
                variant="destructive"
                disabled={isPending}
            >
                {isPending ? "Eliminando..." : "Delete"}
            </Button>
        </form>
    )
}
