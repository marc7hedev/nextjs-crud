import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Task } from "@prisma/client";
import clsx from "clsx";
import TaskButtonDelete from "./task-button-delete";
import Link from "next/link";

export function TaskCard({task}: {task: Task}) {
    return (
        <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <CardTitle>
                            {task.name}
                        </CardTitle>
                        <Badge className={
                            clsx({
                                'bg-red-700 text-white': task.priority === 'urgent',
                                'bg-red-400': task.priority === 'high',
                                'bg-yellow-500': task.priority === 'medium',
                                'bg-green-500': task.priority === 'low',
                            })
                        }>
                            {task.priority}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <p>{task.description}</p>
                        <span className="text-slate-600">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </CardContent>
                    <CardFooter className="flex gap-x-2 justify-end">
                        <TaskButtonDelete taskId={task.id}/>
                        <Link 
                            href={`/tasks/${task.id}/edit`}
                            className={buttonVariants({variant: "secondary"})}    
                        >
                                Editar
                        </Link>
                    </CardFooter>
                </Card>
    )
}
