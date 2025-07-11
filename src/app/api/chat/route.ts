import { LangChainAdapter } from "ai";
import { Messages } from "@langchain/langgraph";
import { AIMessageChunk, isAIMessageChunk } from "@langchain/core/messages";
import { toReadableStream } from "@/lib/utils";
import { masterWorkflow } from "@/lib/workflows/master-workflow";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: Messages } = await req.json();

  const streamIterable = await masterWorkflow.stream({ messages }, { streamMode: "messages" });

  const stream = toReadableStream(streamIterable, {
    filter: ([msg]) => isAIMessageChunk(msg as AIMessageChunk),
    mapper: ([msg]) => msg,
  });

  return LangChainAdapter.toDataStreamResponse(stream);
}