import { Assistant } from "@/app/assistant";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function AgentsPage() {
    return (
        <div className="max-w-full mx-auto px-4 py-12">
            <TooltipProvider>
                <Assistant />
            </TooltipProvider>
        </div>
    )
}
