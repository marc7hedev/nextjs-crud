
import { TaskCard } from "@/components/task-card";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "marc7System",
    description: "Basic Crud App",
};


async function HomePage() {
    const tasks = await prisma.task.findMany();
    console.log(tasks);

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {tasks.map((task) => (
                <TaskCard task={task} key={task.id}/>
            ))}
        </div>
    );
}

export default HomePage;
