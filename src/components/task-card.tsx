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
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

export function TaskCard({task}: {task: Task}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
        >
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle>
                        {task.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <form action={toggleFavorite}>
                            <input type="hidden" name="taskId" value={task.id} />
                            <Button 
                                variant="ghost" 
                                size="icon"
                                className={clsx(
                                    "transition-all duration-300 hover:rotate-12", 
                                    {
                                        "text-yellow-500 hover:text-yellow-600": task.favorite,
                                        "text-gray-400 hover:text-gray-500": !task.favorite
                                    }
                                )}
                                type="submit"
                            >
                                <Star className={clsx(
                                    "h-5 w-5", 
                                    {
                                        "fill-current animate-pulse": task.favorite,
                                    }
                                )} />
                            </Button>
                        </form>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Badge className={
                                clsx(
                                    "transition-all duration-300",
                                    {
                                        'bg-red-700 text-white hover:bg-red-800': task.priority === 'urgent',
                                        'bg-red-400 hover:bg-red-500': task.priority === 'high',
                                        'bg-yellow-500 hover:bg-yellow-600': task.priority === 'medium',
                                        'bg-green-500 hover:bg-green-600': task.priority === 'low',
                                    }
                                )
                            }>
                                {task.priority}
                            </Badge>
                        </motion.div>
                    </div>
                </CardHeader>
                <CardContent className="transition-all duration-300 group">
                    <p className="transition-colors duration-300 group-hover:text-black dark:group-hover:text-white">
                        {task.description}
                    </p>
                    <span className="text-slate-600 text-sm transition-colors duration-300 group-hover:text-slate-800 dark:group-hover:text-slate-300">
                        {formatDate(task.createdAt)}
                    </span>
                </CardContent>
                <CardFooter className="flex gap-x-2 justify-end">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <TaskButtonDelete taskId={task.id}/>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link 
                            href={`/tasks/${task.id}/edit`}
                            className={clsx(
                                buttonVariants({variant: "secondary"}),
                                "hover:shadow-md"
                            )}    
                        >
                            Editar
                        </Link>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
