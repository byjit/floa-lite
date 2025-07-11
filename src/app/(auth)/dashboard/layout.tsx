import { validateSession } from "auth";
import { SideMenu } from "@/components/dashboard/side-menu";

export default async function DashboardPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await validateSession();

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-10">
                <div className="md:col-span-2">
                    <SideMenu session={session} />
                </div>
                <div className="md:col-span-8">
                    {children}
                </div>
            </div>
        </div>
    )
}