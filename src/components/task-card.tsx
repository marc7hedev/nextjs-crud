import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { toggleFavorite } from "@/actions/task-actions";
import { Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useTransition } from "react";
import { toast } from "sonner";

export function TaskCard({task}: {task: Task}) {
    const [isPending, startTransition] = useTransition();

    const handleFavorite = async (formData: FormData) => {
        startTransition(async () => {
            try {
                await toggleFavorite(formData);
                toast.success(task.favorite ? "Eliminado de favoritos" : "Añadido a favoritos");
            } catch {
                toast.error("Error al actualizar favoritos");
            }
        });
    };

    return (
        <Card className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>
                    {task.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <form action={handleFavorite}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <Button 
                            variant="ghost" 
                            size="icon"
                            type="submit"
                            disabled={isPending}
                            className={clsx(
                                "transition-all duration-300", 
                                {
                                    "text-yellow-500": task.favorite,
                                    "text-gray-400": !task.favorite
                                }
                            )}
                        >
                            <Star className={clsx(
                                "h-5 w-5", 
                                {
                                    "fill-current": task.favorite,
                                }
                            )} />
                        </Button>
                    </form>
                    <Badge className={clsx({
                        'bg-red-700 text-white': task.priority === 'urgent',
                        'bg-red-400': task.priority === 'high',
                        'bg-yellow-500': task.priority === 'medium',
                        'bg-green-500': task.priority === 'low',
                    })}>
                        {task.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p>{task.description}</p>
                <span className="text-slate-600 text-sm">
                    {formatDate(task.createdAt)}
                </span>
            </CardContent>
            <CardFooter className="flex gap-x-2 justify-end">
                <TaskButtonDelete taskId={task.id} />
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
