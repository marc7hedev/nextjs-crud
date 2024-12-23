"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const priority = formData.get("priority")?.toString();

    console.log({ name, description, priority });

    if (!name || !description || !priority) {
        return;
    }

    const newTask = await prisma.task.create({
        data: {
            name: name,
            description: description,
            priority: priority,
        },
    });
    console.log(newTask);
    redirect("/");
}
