import { LangChainAdapter } from "ai";
import { Messages } from "@langchain/langgraph";
import { AIMessageChunk, isAIMessageChunk } from "@langchain/core/messages";
import { toReadableStream } from "@/lib/utils";
import { masterWorkflow } from "@/lib/workflows/master-workflow";
import { validateSession } from "auth";
export const runtime = "edge";
export const maxDuration = 60;

export async function POST(req: Request) {
  const session = await validateSession();
  const body = await req.json();
  const { messages, runConfig: { custom: { creativity, humanised, project } } } = body;

  const streamIterable = await masterWorkflow.stream({ messages }, { streamMode: "messages" });

  const stream = toReadableStream(streamIterable, {
    filter: ([msg]) => isAIMessageChunk(msg as AIMessageChunk),
    mapper: ([msg]) => msg,
  });

  return LangChainAdapter.toDataStreamResponse(stream);
}