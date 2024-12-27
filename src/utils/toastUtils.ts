import { toast } from "sonner";
import { Task } from "@prisma/client";

export function showTaskToast(task?: Task) {
    toast(task?.id ? "Actualizado con éxito" : "Creado con éxito", {
        description: task
            ? `Nombre: ${task.name}\nPrioridad: ${task.priority}`
            : "Nueva tarea creada",
        action: {
            label: "Aceptar",
            onClick: () => console.log("Undo"),
        },
    });
}
