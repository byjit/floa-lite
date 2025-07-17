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
  Filter,
  Square,
  Mic
} from 'lucide-react';
import { AiModelSelector } from '@/components/assistant-ui/model-selector';
import { AgentConfigurationBar } from '@/components/assistant-ui/agent-configuration-bar';
import { ChatView } from '@/components/assistant-ui/chat-view';
import { DefaultChatTransport } from 'ai';
import { useAgentSettingsStore } from '@/store/agent-settings';
import { ChatHistory } from './assistant-ui/chat-history';
import { Session } from 'auth';
import { ExampleMessage } from './assistant-ui/example-message';

export default function Chat({ messages: initialMessages, session }: { messages: UIMessage[], session: Session }) {
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

  const handleExampleClick = (text: string) => {
    setInput(text);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '60px';
      }
    }
  };

  return (
    <div className="flex flex-col h-screen py-14">
      <div className="flex-1 overflow-y-auto pb-40">
        <ChatView
          messages={messages}
        />
        {messages.length === 0 && (
          <div className='flex flex-col gap-2 h-full justify-center items-center'>
            <div>
              <h1 className='text-4xl text-primary font-bold text-center'>Hello {session.user.name?.split(' ')[0]}</h1>
            </div>
          </div>
        )}
      </div>
      <div id='chat-input' className='fixed bottom-0 left-0 w-full z-10 bg-background'>
        <div className='max-w-2xl mx-auto p-2 md:px-0 md:pt-0 pb-8'>
          <form onSubmit={handleSubmit} className="border bg-input rounded-lg mt-2 p-2">
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
                disabled
                className="text-gray-400 hover:text-white"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled
              >
                <Mic className="w-4 h-4" />
              </Button>
              {
                status === 'streaming' || status === 'submitted' ? (
                  <Button
                    type="submit"
                    onClick={() => stop()}
                    size="icon"
                    className="bg-destructive hover:bg-destructive/90 text-white rounded-full"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                ) : (
                    <Button
                      type="submit"
                      size="icon"
                      className="rounded-full"
                      disabled={!input.trim()}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                )
              }
            </div>
          </div>
        </form>
        <AgentConfigurationBar />
        </div>
      </div>
    </div>
  );
}