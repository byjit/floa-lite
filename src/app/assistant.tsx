'use client';
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime, } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import {
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
  WebSpeechSynthesisAdapter,
} from "@assistant-ui/react";
import { PDFAttachmentAdapter } from "@/components/assistant-ui/pdf-attachment-adapter";
import { ThreadList } from "@/components/assistant-ui/thread-list";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
    adapters: {
      speech: new WebSpeechSynthesisAdapter(),
      attachments: new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
        new PDFAttachmentAdapter(),
      ]),
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
      <ThreadList />
    </AssistantRuntimeProvider>
  );
};
