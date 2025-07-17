import Assistant from "@/components/assistant";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function AgentsPage() {
    return (
        <div className="max-w-xl md:max-w-3xl mx-auto px-4">
            <TooltipProvider>
                <Assistant messages={[]} />
            </TooltipProvider>
        </div>
    )
}
