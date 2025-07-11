import { Assistant } from "@/app/assistant";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function AgentsPage() {
    return (
        <div className="max-w-xl mx-auto px-4">
            <TooltipProvider>
                <Assistant />
            </TooltipProvider>
        </div>
    )
}
