import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function HomePage() {
    const tasks = await prisma.task.findMany();
    console.log(tasks);

    return (
        <div className="grid grid-cols-3 gap-4">
            {tasks.map((task) => (
                <Card key={task.id}>
                    <CardHeader>
                        <CardTitle>
                            {task.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{task.description}</p>
                        <span className="text-slate-600">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </CardContent>
                    <CardFooter className="flex gap-x-2 justify-end">
                        <Button variant="destructive">Eliminar</Button>
                        <Button>Editar</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default HomePage;
