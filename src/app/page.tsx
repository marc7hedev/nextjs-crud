import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function HomePage() {
    const tasks = await prisma.task.findMany();
    console.log(tasks);

    return (
        <div>
            {tasks.map((task) => (
                <Card key={task.id}>
                    <CardHeader>{task.name}</CardHeader>
                    <CardContent>
                        <p>{task.description}</p>
                        <span>
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </CardContent>
                    <CardFooter>
                      <Button variant = "destructive">Eliminar</Button>
                      <Button>Editar</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}


export default HomePage;
