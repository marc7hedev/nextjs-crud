import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTask, updateTask } from "@/actions/task-actions";
import { Task } from "@prisma/client";

export function TaskForm({task}: {task: Task}) {

    const functionAction = task?.id ? updateTask : createTask;

    return (
        <form action={functionAction}>
            <input type="hidden" name="taskId" value={task?.id} />
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Crear tarea</CardTitle>
                    <CardDescription>
                        Completa el formulario para crear una nueva tarea
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                name="name"
                                id="name"
                                placeholder="Nombre de la tarea"
                                defaultValue={task?.name}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                name="description"
                                id="description"
                                placeholder="Descripción"
                                defaultValue={task?.description || ""}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="priority">Prioridad</Label>
                            <Select name="priority"
                                defaultValue={task?.priority}>
                                <SelectTrigger id="priority">
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="low">Baja</SelectItem>
                                    <SelectItem value="medium">
                                        Media
                                    </SelectItem>
                                    <SelectItem value="high">Alta</SelectItem>
                                    <SelectItem value="urgent">
                                        Urgente
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancelar</Button>
                    <Button type="submit">Crear tarea</Button>
                </CardFooter>
            </Card>
        </form>
    );
}
