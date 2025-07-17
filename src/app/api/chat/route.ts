import { getModelClient, getModelConfig } from '@/lib/core/models';
import { streamText, UIMessage, convertToModelMessages, tool, LanguageModel } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

type ChatRequest = {
  messages: UIMessage[];
  aiModelId: string;
  creativity: number;
  humanised: boolean;
  project: string;
  tone: string;
}

export async function POST(req: Request) {
  const body: ChatRequest = await req.json();

  console.log(JSON.stringify(body, null, 2));

  const { messages, aiModelId, creativity, humanised, project, tone } = body;

  const result = streamText({
    model: getModelClient(aiModelId) as LanguageModel,
    messages: messages?.length ? convertToModelMessages(messages) : [],
    // Forward the abort signal from the request to enable cancellation
    abortSignal: req.signal,
    tools: {
      weather: tool({
        description: 'Get the weather in a location (fahrenheit)',
        inputSchema: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }, { abortSignal }) => {
        // Forward the abort signal to any internal operations like fetch calls
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return {
            location,
            temperature,
          };
        },
      }),
      convertFahrenheitToCelsius: tool({
        description: 'Convert a temperature in fahrenheit to celsius',
        inputSchema: z.object({
          temperature: z
            .number()
            .describe('The temperature in fahrenheit to convert'),
        }),
        execute: async ({ temperature }, { abortSignal }) => {
        // Forward the abort signal to any internal operations
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return {
            celsius,
          };
        },
      }),
    },
    // Optional: Add error handling for aborted requests
    onError({ error }) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was aborted by client');
      } else {
        console.error('Stream error:', error);
      }
    },
  });

  return result.toUIMessageStreamResponse();
}