'use client';
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import {
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
} from "@assistant-ui/react";
import { db } from "@/server/db";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
    adapters: {
      attachments: new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
      ]),
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="w-full flex gap-2">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
