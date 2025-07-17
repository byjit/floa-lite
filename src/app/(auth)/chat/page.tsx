import Assistant from "@/components/assistant";
import { TooltipProvider } from "@/components/ui/tooltip";
import { validateSession } from "auth";

export default async function AgentsPage() {
    const session = await validateSession();
    return (
        <div className="max-w-xl md:max-w-3xl mx-auto px-4">
            <TooltipProvider>
                <Assistant messages={[]} session={session} />
            </TooltipProvider>
        </div>
    )
}
