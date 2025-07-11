import { aiModelProvider } from "@/server/db/schema/ai-model";

export const LOCAL_STORAGE_PROJECT_KEY = 'mchatSelectedProject';

export const aiModelProviderMap: Record<typeof aiModelProvider[number],
    {
        name: string,
        models: { name: string, modelId: string }[]
    }> = {
        openai: {
            name: "OpenAI",
            models: [
                { name: "gpt-4o", modelId: "gpt-4o" }
            ]
        },
        perplexity: {
            name: "Perplexity",
            models: [
                { name: "perplexity-1", modelId: "perplexity-1" }
            ]
        },
        gemini: {
            name: "Google Gemini",
            models: [
                { name: "gemini-1.5-flash", modelId: "gemini-1.5-flash" }
            ]
        }
    } as const;