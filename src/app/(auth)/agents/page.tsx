import { validateSession } from "auth"


export default async function AgentsPage() {
    const session = await validateSession();

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <p>Agents</p>
        </div>
    )
}
