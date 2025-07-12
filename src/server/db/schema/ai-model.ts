import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod';
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./user";

export const aiModelProvider = ['openai', 'perplexity', 'gemini',] as const;
export const aiModelProviderSchema = z.enum(aiModelProvider);

/**
 * Defines the AI models available for use in the platform.
 * This table stores information about different AI providers and their specific models,
 * including configuration details and associated user.
 */
export const aiModel = sqliteTable("ai_model", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(),
    provider: text('provider', { enum: aiModelProvider }).notNull(),
    modelId: text('model_id').notNull(), // The actual model identifier from the provider, e.g., "gpt-4o"
    config: text('config', { mode: 'json' }).$type<{
        temperature?: number;
    }>(),// model-specific configurations (e.g., temperature)
    key: text('key'), // API key for the model. Required if the user is subscribed to BYOK pricing model.
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
    metadata: text('metadata'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export type AiModel = typeof aiModel.$inferSelect;
export const selectAiModelSchema = createSelectSchema(aiModel);
export const insertAiModelSchema = createInsertSchema(aiModel);
export const updateAiModelSchema = createUpdateSchema(aiModel);
export type AiModelInsert = z.infer<typeof insertAiModelSchema>;
export type AiModelUpdate = z.infer<typeof updateAiModelSchema>;
export type AiModelSelect = z.infer<typeof selectAiModelSchema>;
