export const PROMPT_LENGTH_LIMIT = 300
export const SYSTEM_ADMIN_EMAIL = "Jit <jit@byjit.com>"

export const TONES = ['professional', 'casual', 'inspirational', 'educational', 'technical', 'persuasive', 'narrative', 'descriptive'] as const;
export type Tone = (typeof TONES)[number];

export const DEFAULT_AI_MODEL_ID = 'gpt-4o';

export const CREATIVITY_LEVELS = [{
    value: 0,
    label: 'Low'
}, {
    value: 0.6,
    label: 'Balanced'
}, {
    value: 1,
    label: 'High'
}] as const;