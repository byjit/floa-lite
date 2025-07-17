import { createXai } from '@ai-sdk/xai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createPerplexity } from '@ai-sdk/perplexity';
import { createElevenLabs } from '@ai-sdk/elevenlabs';
import { createVoyage } from 'voyage-ai-provider';

export const voyage = (apiKey: string) => createVoyage({
  baseURL: 'https://api.voyageai.com/v1',
  apiKey,
});

export const elevenlabs = (apiKey: string) => createElevenLabs({
  apiKey,
});

export const perplexity = (apiKey: string) => createPerplexity({
  apiKey,
});

export const google = (apiKey: string) => createGoogleGenerativeAI({
  apiKey,
});

export const groq = (apiKey: string) => createGroq({
  apiKey,
});

export const openai =  (apiKey: string) => createOpenAI({
  apiKey,
});

export const anthropic = (apiKey: string) => createAnthropic({
  apiKey,
});

export const xai = (apiKey: string) => createXai({
  apiKey,
});