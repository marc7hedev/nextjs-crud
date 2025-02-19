"use client"

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PageTransition from "@/components/page-transition";

function ListView() {
    return (
        <PageTransition>
            <div>
                <Button
                    variant="outline"
                    onClick={() =>
                        toast("Event has been created", {
                            description: "Sunday, December 03, 2023 at 9:00 AM",
                            action: {
                                label: "Aceptar",
                                onClick: () => console.log("Undo"),
                            },
                        })
                    }
                >
                    Show Toast
                </Button>
            </div>
        </PageTransition>
    );
}

export default ListView;
