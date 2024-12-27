
"use client"

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ListView() {
    return (
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
    );
}

export default ListView;
