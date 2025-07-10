import { LangChainAdapter } from "ai";
import { Messages } from "@langchain/langgraph";
import { AIMessageChunk, isAIMessageChunk } from "@langchain/core/messages";
import { toReadableStream } from "@/lib/utils";
import { workflow } from "@/workflows/weatherHello";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: Messages } = await req.json();

  const streamIterable = await workflow.stream({ messages }, { streamMode: "messages" });

  // Convert to a readable stream for compatibility with the adapter
  //
  // Alternatively, it seems this conversion can be avoided by using `.streamEvents` instead of `.stream`, but note that `.streamEvents` has peculiar handling of non-LLM-calling nodes due to the expectation of a certain streaming pattern.
  const stream = toReadableStream(streamIterable, {
    filter: ([msg]) => isAIMessageChunk(msg as AIMessageChunk),
    mapper: ([msg]) => msg,
  });

  return LangChainAdapter.toDataStreamResponse(stream);
}