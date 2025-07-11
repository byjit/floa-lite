'use client';
import { Session } from "auth";
import { Button, buttonVariants } from "@/components/ui/button"
import { 
    Mail, 
    BarChart3, 
    Settings, 
    Box, 
    Cloud, 
    Bug, 
    TrendingUp, 
    CreditCard, 
    FileText, 
    MessageCircle,
    Edit
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Client-side wrapper component for pathname logic
const SideMenuClient = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full space-y-6">
        {/* User Info Section */}
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <h2 className=" font-semibold">{session.user.name}</h2>
                <Edit className="w-4 h-4 text-neutral-500" />
            </div>
            <p className="text-sm text-neutral-500">Pro • {session.user.email}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col text-neutral-500 space-y-4">
            <Link href="/dashboard" className={cn("flex items-center space-x-3 hover:text-neutral-300", pathname === "/dashboard" && "text-white")}>
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Overview</span>
            </Link>

            <Link href="/dashboard/settings" className={cn("flex items-center space-x-3 hover:text-neutral-300", pathname === "/dashboard/settings" && "text-white")}>
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
            </Link>

            <div className="border-t pt-4 space-y-4">
                <Link href="/dashboard/integrations" className={cn("flex items-center space-x-3 hover:text-neutral-300", pathname === "/dashboard/integrations" && "text-white")}>
                    <Box className="w-4 h-4" />
                    <span className="text-sm">Integrations</span>
                </Link>
            </div>

            <div className="border-t pt-4 space-y-4">
                <Link href="/dashboard/usage" className={cn("flex items-center space-x-3 hover:text-neutral-300", pathname === "/dashboard/usage" && "text-white")}>
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Usage</span>
                </Link>

                <Link href="/dashboard/billing" className={cn("flex items-center space-x-3 hover:text-neutral-300", pathname === "/dashboard/billing" && "text-white")}>
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Billing & Invoices</span>
                </Link>
            </div>

            <div className="border-t pt-4 space-y-4">
                <Link href="/docs" className={cn("flex items-center space-x-3 hover:text-neutral-300", pathname === "/docs" && "text-white")}>
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">How to use</span>
                </Link>

                <Link href="/contact" className={cn("flex items-center space-x-3 hover:text-neutral-300", pathname === "/contact" && "text-white")}>
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Contact Us</span>
                </Link>
            </div>
        </nav>
    </div>
  );
};

// Server-side compatible wrapper
export const SideMenu = ({
    session,
}: {
     session: Session;
}) => {
    return <SideMenuClient session={session} />;
}