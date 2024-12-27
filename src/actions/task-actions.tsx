// Los componentes server actions en su carpeta actions pueden fungir como controladores, ya que manejan la lógica, consultas a la BBDD, redirecciones y revalidaciones de rutas. En este caso, se crean dos funciones que se encargan de crear y eliminar tareas, respectivamente. Ambas funciones reciben un objeto FormData que contiene los datos del formulario, y realizan las operaciones correspondientes en la base de datos. La función createTask crea una nueva tarea con los datos recibidos, mientras que removeTask elimina una tarea con el id recibido. Ambas funciones redirigen a la página principal después de completar la operación. En el componente TaskForm, se utiliza la función createTask como action del formulario, y en el componente TaskButtonDelete, se utiliza la función removeTask como action del formulario. De esta manera, se separa la lógica de la interfaz de usuario, facilitando la reutilización y mantenimiento del código.

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const priority = formData.get("priority")?.toString();


    if(!name || !description || !priority) {
        return;
    }

    const newTask = await prisma.task.create({
        data: {
            name: name,
            description: description,
            priority: priority,
        },
    })
    redirect("/");


}

export async function removeTask(formData: FormData){
    const taskId = formData.get("taskId")?.toString();
    
    if(!taskId) {
        return;
    }

    await prisma.task.delete({
        where: {
            id: parseInt(taskId)
        }
    })

    revalidatePath("/");

}

export async function updateTask(formData: FormData){
    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const priority = formData.get("priority")?.toString();


    if(!id || !name || !description || !priority) {
        return;
    }

    await prisma.task.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name,
            description: description,
            priority: priority,
        },
    });

    redirect("/");
}