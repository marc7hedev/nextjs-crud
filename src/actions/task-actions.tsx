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
    console.log(newTask);
    redirect("/");
}

export async function removeTask(formData: FormData) {
    const taskId = formData.get("taskId")?.toString();
    
    if(!taskId) {
        return;
    }

    try {
        await prisma.task.delete({
            where: {
                id: parseInt(taskId)
            }
        });

        revalidatePath('/', 'page');
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

export async function updateTask(formData: FormData) {
    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const priority = formData.get("priority")?.toString();

    if(!id || !name || !description || !priority) {
        return;
    }

    try {
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
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

export async function toggleFavorite(formData: FormData) {
    const taskId = formData.get("taskId")?.toString();
    
    if(!taskId) {
        return;
    }

    try {
        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(taskId)
            }
        });

        if(!task) {
            return;
        }

        await prisma.task.update({
            where: {
                id: parseInt(taskId)
            },
            data: {
                favorite: !task.favorite
            }
        });

        revalidatePath('/', 'page');
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}