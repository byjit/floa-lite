import { api } from "@/trpc/server";
import { validateSession } from "auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await validateSession();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const thread = await api.conversation.getConversation({ id });
  return NextResponse.json({ thread });
}

export async function POST(req: Request) {
  const session = await validateSession();
  const body = await req.json();
  const thread = await api.conversation.createConversation(body);
  return NextResponse.json({ thread });
}

export async function PUT(req: Request) {
  const session = await validateSession();
  const body = await req.json();
  const thread = await api.conversation.updateConversation(body);
  return NextResponse.json({ thread });
}

export async function DELETE(req: Request) {
  const session = await validateSession();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const thread = await api.conversation.deleteConversation({ id });
  return NextResponse.json({ thread });
}
