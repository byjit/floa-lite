import { api } from "@/trpc/server";
import { validateSession } from "auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await validateSession();
  const threads = await api.conversation.listConversations({});
  return NextResponse.json({ threads });
}
