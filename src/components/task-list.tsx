"use client";

import { Task } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { TaskCard } from "./task-card";
import { useEffect, useState } from "react";

interface TaskListProps {
    initialTasks: Task[];
}

export default function TaskList({ initialTasks }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        // Ordenar primero por favoritos y luego por fecha de creación
        const sortedTasks = [...initialTasks].sort((a, b) => {
            // Si uno es favorito y el otro no, el favorito va primero
            if (a.favorite !== b.favorite) {
                return b.favorite ? 1 : -1;
            }
            // Si ambos son favoritos o no favoritos, ordenar por fecha
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        setTasks(sortedTasks);
    }, [initialTasks]);

    return (
        <AnimatePresence mode="popLayout">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {tasks.map((task) => (
                    <TaskCard task={task} key={task.id}/>
                ))}
            </div>
        </AnimatePresence>
    );
}