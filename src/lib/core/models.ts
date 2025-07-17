import { createXai } from '@ai-sdk/xai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createPerplexity } from '@ai-sdk/perplexity';
import { createElevenLabs } from '@ai-sdk/elevenlabs';
import { createVoyage } from 'voyage-ai-provider';
import { AI_MODELS_MAP, AiModelProvider } from '../models';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

/**
 * Get the correct AI model client based on model ID
 * @param modelId - The model ID from AI_MODELS_MAP
 * @param process.env - Object containing API keys for different providers
 * @returns The configured model client
 */
export function getModelClient(
    modelId: string,
) {
    const modelConfig = AI_MODELS_MAP[modelId];

    if (!modelConfig) {
        throw new Error(`Model with ID "${modelId}" not found in AI_MODELS_MAP`);
    }

    const { provider, modelId: providerModelId } = modelConfig;

    switch (provider) {
        case AiModelProvider.OPENAI:
            if (!process.env.OPENAI_API_KEY) {
                throw new Error('OpenAI API key is required');
            }
            return createOpenAI({ apiKey: process.env.OPENAI_API_KEY })(providerModelId);

        case AiModelProvider.ANTHROPIC:
            if (!process.env.anthropic) {
                throw new Error('Anthropic API key is required');
            }
            return createAnthropic({ apiKey: process.env.anthropic })(providerModelId);

        case AiModelProvider.GOOGLE:
            if (!process.env.google) {
                throw new Error('Google API key is required');
            }
            return createGoogleGenerativeAI({ apiKey: process.env.google })(providerModelId);

        case AiModelProvider.GROQ:
            if (!process.env.groq) {
                throw new Error('Groq API key is required');
            }
            return createXai({ apiKey: process.env.xai })(providerModelId);

        case AiModelProvider.GROK:
            if (!process.env.xai) {
                throw new Error('xAI API key is required for Grok models');
            }
            return createXai({ apiKey: process.env.xai })(providerModelId);
        case AiModelProvider.PERPLEXITY:
            if (!process.env.perplexity) {
                throw new Error('Perplexity API key is required');
            }
            return createPerplexity({ apiKey: process.env.perplexity })(providerModelId);
        case AiModelProvider.ELEVENLABS:
            if (!process.env.elevenlabs) {
                throw new Error('ElevenLabs API key is required');
            }
            return createElevenLabs({ apiKey: process.env.elevenlabs });
        case AiModelProvider.OPENROUTER:
            if (!process.env.openrouter) {
                throw new Error('OpenRouter API key is required');
            }
            return createOpenRouter({ apiKey: process.env.openrouter }).chat(providerModelId);
        default:
            throw new Error(`Provider "${provider}" is not supported yet`);
    }
}

/**
 * Get model configuration by ID
 * @param modelId - The model ID from AI_MODELS_MAP
 * @returns The model configuration object
 */
export function getModelConfig(modelId: string) {
    const modelConfig = AI_MODELS_MAP[modelId];

    if (!modelConfig) {
        throw new Error(`Model with ID "${modelId}" not found in AI_MODELS_MAP`);
    }

    return modelConfig;
}