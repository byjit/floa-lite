import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod';
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./user";
import { project } from "./project";

/**
 * Represents a single conversation with an AI model.
 * Each conversation belongs to a user and a project, and is associated with a specific AI model.
 * It includes a summary for quick overview and stores messages as a JSON array.
 */
export const conversation = sqliteTable("conversation", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    title: text('title').notNull(), // A short title for the conversation
    summary: text('summary'), // Optional summary of the conversation
    messages: text('messages', { mode: 'json' }).notNull(), // JSON array of messages
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    projectId: text('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }),
    metadata: text('metadata'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => [
    index("user_id_idx").on(table.userId),
    index("project_id_idx").on(table.projectId),
    index("created_at_idx").on(table.createdAt)
]);

export type Conversation = typeof conversation.$inferSelect;
export const selectConversationSchema = createSelectSchema(conversation);
export const insertConversationSchema = createInsertSchema(conversation);
export const updateConversationSchema = createUpdateSchema(conversation);
export type ConversationInsert = z.infer<typeof insertConversationSchema>;
export type ConversationUpdate = z.infer<typeof updateConversationSchema>;
export type ConversationSelect = z.infer<typeof selectConversationSchema>;
