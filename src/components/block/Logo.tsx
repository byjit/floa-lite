import { Mountain, } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("font-semibold flex items-center gap-2")}>
      <Mountain className={cn(className)} /> Floa
    </div>
  );
};