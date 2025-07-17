import { getModelClient, getModelConfig } from '@/lib/core/models';
import { streamText, UIMessage, convertToModelMessages, tool, LanguageModel } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

type ChatRequest = {
  messages: UIMessage[];
  modelId: string;
  creativity: number;
  humanised: boolean;
  project: string;
  tone: string;
}

export async function POST(req: Request) {
  const { messages, modelId, creativity, humanised, project, tone }: ChatRequest = await req.json();

  console.log(modelId, creativity, humanised, project, tone);

  const result = streamText({
    model: getModelClient(modelId) as LanguageModel,
    messages: convertToModelMessages(messages),
    tools: {
      weather: tool({
        description: 'Get the weather in a location (fahrenheit)',
        inputSchema: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }) => {
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
        execute: async ({ temperature }) => {
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return {
            celsius,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}