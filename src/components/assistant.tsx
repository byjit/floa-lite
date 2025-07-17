'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UIMessage, useChat } from '@ai-sdk/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { z } from 'zod';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Cloud,
  ChevronDown,
  Paperclip,
  ArrowUp,
  Folder,
  Mail,
  Calendar,
  Search,
  ChevronUp,
  Filter
} from 'lucide-react';
import { AiModelSelector } from '@/components/assistant-ui/model-selector';
import { AgentConfigurationBar } from '@/components/assistant-ui/agent-configuration-bar';
import { ChatView } from '@/components/assistant-ui/chat-view';
import { DefaultChatTransport } from 'ai';
import { useAgentSettingsStore } from '@/store/agent-settings';

export default function Chat({ messages: initialMessages }: { messages: UIMessage[] }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const prepareSendMessagesRequest = useCallback(({ id, body, messages }: { id: string; body: any, messages?: UIMessage[] }) => {
    const agentSettingsStates = useAgentSettingsStore.getState();
    return {
      body: {
        ...body,
        ...agentSettingsStates,
        messages: messages,
        id,
      },
    };
  }, []);

  const { messages, sendMessage, setMessages, status, error, id, regenerate, resumeStream, stop, addToolResult } = useChat({
    maxSteps: 5,
    experimental_throttle: 2000,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest,
    }),
  });

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const examplePrompts = [
    { icon: Mail, text: "Write me an email", value: "Write me an email: \n\n" },
    { icon: Calendar, text: "Check my calendar", value: "Check my calendar: \n\n" },
    { icon: Search, text: "Deep research a topic", value: "Deep research the topic: \n\n" }
  ];

  const handleExampleClick = (text: string) => {
    setInput(text);
    // Focus the textarea after setting the input
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full py-14 overflow-hidden">
      <ChatView
        messages={messages}
      />
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border bg-input rounded-lg mt-12 p-4">
        <Textarea
          ref={textareaRef}
          value={input}
          placeholder="Ask questions or get your work done..."
          onChange={e => {
            setInput(e.currentTarget.value);
            // Auto-resize logic with null check
            const textarea = e.currentTarget;
            if (textarea) {
              if (e.currentTarget.value.length > 0) {
                e.currentTarget.style.height = '60px';
                e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 170) + 'px';
              } else {
                e.currentTarget.style.height = '60px';
              }
            }
          }}
          className="flex-1 bg-input mb-1 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 min-h-[60px] h-auto max-h-[400px] resize-none transition-all overflow-y-auto"
          rows={1}
          onPaste={e => {
            // After paste, let the value update, then resize
            setTimeout(() => {
              const textarea = e.currentTarget as HTMLTextAreaElement;
              if (textarea) {
                textarea.style.height = '60px';
                textarea.style.height = Math.min(textarea.scrollHeight, 400) + 'px';
              }
            }, 0);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="flex items-center justify-between">
          <AiModelSelector />
          <div className="flex items-center space-x-2 pr-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              disabled={!input.trim()}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
      <AgentConfigurationBar />
      <div className="flex flex-col gap-2 flex-1">
        {messages.length === 0 && (
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-xl">
                <Accordion type="single" collapsible>
                <AccordionItem value="examples" className="border-none">
                  <AccordionTrigger className="justify-center text-center text-muted-foreground transition">
                    Try these examples to get started
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col items-center justify-center space-y-4 py-2">
                      {examplePrompts.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          className="flex items-center space-x-3 rounded-full px-4 py-2 shadow-sm transition"
                          onClick={() => handleExampleClick(prompt.value)}
                        >
                          <prompt.icon className="w-5 h-5" />
                          <span className="text-muted-foreground">{prompt.text}</span>
                        </Button>
                      ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}