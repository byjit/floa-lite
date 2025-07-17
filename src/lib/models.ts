export enum AiModelProvider {
    OPENAI = "openai",
    ANTHROPIC = "anthropic",
    GOOGLE = "google",
    COHERE = "cohere",
    OLLAMA = "ollama",
    DEEPSEEK = "deepseek",
    KIMI = "kimi",
    GROK = "grok",
    GROQ = "groq",
}

export enum AiModelCapability {
    TEXT = "text",
    IMAGE_GENERATION = "image_generation",
    AUDIO_GENERATION = "audio_generation",
    AUDIO_TRANSCRIPTION = "audio_transcription",
    AUDIO_TRANSLATION = "audio_translation",
    CODE_EXECUTION = "code_execution",
    CACHING = "caching",
    THINKING = "thinking",
    STRUCTURED_OUTPUT = "structured_output",
    TOOLS = "tools",
    SEARCH_GROUNDING = "search_grounding",
    BATCH = "batch",
    LIVE_API = "live_api",
    IMAGE_PROCESSING = "image_processing",
    REASONING = "reasoning",
}

export interface AiModel {
    id: string;
    name: string;
    provider: AiModelProvider;
    modelId: string;
    contextWindow: number;
    maxOutputTokens: number;
    capabilities: AiModelCapability[];
    requestPerMinute?: number;
    knowledgeCutoffDate?: Date;
    hide?: boolean;
}

export const AI_MODELS_MAP: Record<string, AiModel> = {
    "google-gemini-2.5-pro": {
        id: "google-gemini-2.5-pro",
        name: "Gemini-2.5-pro",
        provider: AiModelProvider.GOOGLE,
        modelId: "gemini-2.5-pro",
        contextWindow: 1048576, // Input token limit
        maxOutputTokens: 65536, // Output token limit
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.STRUCTURED_OUTPUT,
            AiModelCapability.CACHING,
            AiModelCapability.TOOLS,
            AiModelCapability.CODE_EXECUTION,
            AiModelCapability.SEARCH_GROUNDING,
            AiModelCapability.THINKING,
            AiModelCapability.BATCH,
            AiModelCapability.LIVE_API,
            AiModelCapability.IMAGE_PROCESSING,
            AiModelCapability.REASONING,
        ],
        requestPerMinute: 1000,
    },
    "gemini-2.5-flash": {
        id: "gemini-2.5-flash",
        name: "Gemini 2.5 Flash",
        provider: AiModelProvider.GOOGLE,
        modelId: "gemini-2.5-flash",
        contextWindow: 1048576, // Input token limit
        maxOutputTokens: 65536, // Output token limit
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.CACHING,
            AiModelCapability.CODE_EXECUTION,
            AiModelCapability.TOOLS,
            AiModelCapability.SEARCH_GROUNDING,
            AiModelCapability.STRUCTURED_OUTPUT,
            AiModelCapability.THINKING,
            AiModelCapability.BATCH,
            AiModelCapability.LIVE_API,
            AiModelCapability.IMAGE_PROCESSING,
            AiModelCapability.REASONING,
        ],
        requestPerMinute: 1000,
    },
    "imagen-3.0-generate-002": {
        id: "imagen-3.0-generate-002",
        name: "Imagen 3.0 Generate",
        provider: AiModelProvider.GOOGLE,
        modelId: "imagen-3.0-generate-002",
        contextWindow: 0,
        maxOutputTokens: 0,
        capabilities: [AiModelCapability.IMAGE_GENERATION],
        requestPerMinute: 1000,
        hide: true,
    },
    "grok-4-0709": {
        id: "grok-4-0709",
        name: "Grok 4 (0709)",
        provider: AiModelProvider.GROK,
        modelId: "grok-4-0709",
        contextWindow: 256000,
        maxOutputTokens: 8192,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.IMAGE_PROCESSING,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT,
            AiModelCapability.REASONING,
        ],
        requestPerMinute: 480,
    },
    "grok-3": {
        id: "grok-3",
        name: "Grok 3",
        provider: AiModelProvider.GROK,
        modelId: "grok-3",
        contextWindow: 131072,
        maxOutputTokens: 8192,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT
        ],
        requestPerMinute: 600,
    },
    "grok-3-mini": {
        id: "grok-3-mini",
        name: "Grok 3 Mini",
        provider: AiModelProvider.GROK,
        modelId: "grok-3-mini",
        contextWindow: 131072,
        maxOutputTokens: 8192,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT,
            AiModelCapability.REASONING,
        ],
        requestPerMinute: 480,
    },
    "grok-3-fast-us-east-1": {
        id: "grok-3-fast-us-east-1",
        name: "Grok 3 Fast",
        provider: AiModelProvider.GROK,
        modelId: "grok-3-fast us-east-1",
        contextWindow: 131072,
        maxOutputTokens: 8192,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT
        ],
        requestPerMinute: 600,
    },
    "moonshotai/kimi-k2-instruct": {
        id: "moonshotai/kimi-k2-instruct",
        name: "Kimi-K2-Instruct",
        provider: AiModelProvider.KIMI,
        modelId: "moonshotai/kimi-k2-instruct",
        contextWindow: 128000,
        maxOutputTokens: 32000,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT,
        ],
    },
    "claude-opus-4-20250514": {
        id: "claude-opus-4-20250514",
        name: "Claude Opus 4",
        provider: AiModelProvider.ANTHROPIC,
        modelId: "claude-opus-4-20250514",
        contextWindow: 200_000,
        maxOutputTokens: 32000,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT,
            AiModelCapability.REASONING,
            AiModelCapability.IMAGE_PROCESSING,
        ],
        knowledgeCutoffDate: new Date('2025-03-01'),
    },
    "claude-sonnet-4-20250514": {
        id: "claude-sonnet-4-20250514",
        name: "Claude Sonnet 4",
        provider: AiModelProvider.ANTHROPIC,
        modelId: "claude-sonnet-4-20250514",
        contextWindow: 200_000,
        maxOutputTokens: 64000,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT,
            AiModelCapability.REASONING,
            AiModelCapability.IMAGE_PROCESSING,
        ],
        knowledgeCutoffDate: new Date('2025-03-01'),
    },
    "claude-3-7-sonnet-20250219": {
        id: "claude-3-7-sonnet-20250219",
        name: "Claude 3.7 Sonnet",
        provider: AiModelProvider.ANTHROPIC,
        modelId: "claude-3-7-sonnet-20250219",
        contextWindow: 200_000,
        maxOutputTokens: 64000,
        capabilities: [
            AiModelCapability.TEXT,
            AiModelCapability.TOOLS,
            AiModelCapability.STRUCTURED_OUTPUT,
            AiModelCapability.REASONING,
            AiModelCapability.IMAGE_PROCESSING,
        ],
        knowledgeCutoffDate: new Date('2024-11-01'),
    },
} as const;

export const AI_MODELS = Object.values(AI_MODELS_MAP);
export const AI_MODELS_BY_PROVIDER = Object.groupBy(AI_MODELS, (model) => model.provider);
export const AI_MODEL_IDS = Object.keys(AI_MODELS_MAP);
