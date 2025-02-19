import prisma from "@/lib/prisma";
import PageTransition from "@/components/page-transition";
import TaskList from "@/components/task-list";

export const metadata = {
    title: "marc7System",
    description: "Basic Crud App",
};

export const dynamic = "force-dynamic";

async function HomePage() {
    const tasks = await prisma.task.findMany({
        orderBy: [
            { favorite: 'desc' }, // Primero los favoritos
            { createdAt: 'asc' }  // Luego por fecha de creación
        ]
    });

    return (
        <PageTransition>
            <TaskList initialTasks={tasks} />
        </PageTransition>
    );
}

export default HomePage;
