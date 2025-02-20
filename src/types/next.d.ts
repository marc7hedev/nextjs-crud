import { Task } from "@prisma/client";

declare module "next" {
    interface PageProps {
        params?: {
            id?: string;
            [key: string]: string | undefined;
        };
        searchParams?: { [key: string]: string | string[] | undefined };
    }
}

declare module "@/types" {
    interface TaskPageParams {
        id: string;
    }

    interface TaskFormProps {
        task?: Task;
    }
}