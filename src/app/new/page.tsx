import { TaskForm } from "./task-form";
import PageTransition from "@/components/page-transition";

function NewPage() {
    return (
        <PageTransition>
            <div className="flex justify-center items-center h-screen">
                <TaskForm />
            </div>
        </PageTransition>
    )
}

export default NewPage;
