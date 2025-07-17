import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";
import { UIMessage } from "@ai-sdk/react";
import { MarkdownText } from "./markdown-text";
import { cn } from "@/lib/utils";

export const ChatView = ({ messages }: { messages: UIMessage[] }) => {
  return (
    <div className="mt-8 space-y-10">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-xl max-w-full`}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <div key={`${message.id}-${i}`}>
                            <MarkdownText className={cn("text-card-foreground p-6 rounded-xl", message.role === 'user' && 'bg-secondary')}>
                              {part.text}
                            </MarkdownText>
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
          ))
          }
    </div>
    )
  }

  export default ChatView;