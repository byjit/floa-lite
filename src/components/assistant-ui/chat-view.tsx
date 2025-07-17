import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";
import { UIMessage } from "@ai-sdk/react";
import { MarkdownText } from "./markdown-text";
import { cn } from "@/lib/utils";

export const ChatView = ({ messages }: { messages: UIMessage[] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className="space-y-2">
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl rounded-lg`}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <div key={`${message.id}-${i}`}>
                            <MarkdownText className={cn("text-card-foreground px-4 py-1 rounded-xl", message.role === 'user' && 'bg-neutral-800')}>{part.text}</MarkdownText>
                          </div>
                        );
                      case 'tool-weather':
                        return (
                          <pre key={`${message.id}-${i}`} className="text-sm bg-gray-900 p-2 rounded">
                            {JSON.stringify(part, null, 2)}
                          </pre>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          ))
          }
      </div>
    )
  }

  export default ChatView;