import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod';
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./user";
import { project } from "./project";

export const knowledgeType = ['image', 'pdf', 'text'] as const;
export const knowledgeTypeSchema = z.enum(knowledgeType);

/**
 * Defines the knowledge base for the AI agent platform.
 * This table stores user-uploaded resources (e.g., images, PDFs, text files) that can be 
 * used for retrieval-augmented generation (RAG) and to enhance AI responses.
 * Similar to how ChatGPT allows users to upload files for context-aware answers.
 */
export const knowledge = sqliteTable("knowledge", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  url: text('url'),
  type: text('type', { enum: knowledgeType }).notNull(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
  projectId: text('project_id').references(() => project.id, { onDelete: 'cascade' }),
  metadata: text('metadata'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => [
    index("user_id_idx").on(table.userId),
    index("project_id_idx").on(table.projectId)
]);

export type Knowledge = typeof knowledge.$inferSelect;
export const selectKnowledgeSchema = createSelectSchema(knowledge);
export const insertKnowledgeSchema = createInsertSchema(knowledge);
export const updateKnowledgeSchema = createUpdateSchema(knowledge);
export type KnowledgeInsert = z.infer<typeof insertKnowledgeSchema>;
export type KnowledgeUpdate = z.infer<typeof updateKnowledgeSchema>;
export type KnowledgeSelect = z.infer<typeof selectKnowledgeSchema>;
