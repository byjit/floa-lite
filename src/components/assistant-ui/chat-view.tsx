import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";
import { UIMessage } from "@ai-sdk/react";

export const ChatView = ({ messages }: { messages: UIMessage[] }) => {
  return (
<div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className="space-y-2">
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl rounded-lg p-4 ${message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-100'
                  }`}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return <div key={`${message.id}-${i}`} className="whitespace-pre-wrap">{part.text}</div>;
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