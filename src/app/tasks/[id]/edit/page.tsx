import { TaskForm } from "@/app/new/task-form";
import PageTransition from "@/components/page-transition";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function TaskPageEdit({ params, searchParams }: Props) {
    const task = await prisma.task.findFirst({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!task) {
        redirect("/");
    }

    return (
        <PageTransition>
            <div className="flex justify-center items-center h-screen">
                <TaskForm task={task} />
            </div>
        </PageTransition>
    );
}