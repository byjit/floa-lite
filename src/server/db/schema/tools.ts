import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod';
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./user";
import { project } from "./project";

export const toolType = ['api', 'mcp', 'plugin', 'custom'] as const;
export const toolTypeSchema = z.enum(toolType);

/**
 * Defines the tools available for AI agents to use.
 * This table stores information about various tools (e.g., API integrations, MCP tools, plugins),
 * including their configuration and association with projects and users.
 */
export const tool = sqliteTable("tool", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(), // Name of the tool, e.g., "Weather API", "GitHub Tool"
    type: text('type', { enum: toolType }).notNull(), // Type of the tool, e.g., 'api', 'mcp'
    description: text('description'), // A brief description of what the tool does
    configuration: text('configuration', { mode: 'json' }), // JSON object for tool-specific configuration (e.g., API keys, endpoints)
    projectId: text('project_id').references(() => project.id, { onDelete: 'cascade' }), // Optional: if tool is project-specific
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }), // Optional: if tool is user-specific
    metadata: text('metadata'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => [
    index("user_id_idx").on(table.userId),
    index("project_id_idx").on(table.projectId),
    index("name_type_idx").on(table.name, table.type)
]);

export type Tool = typeof tool.$inferSelect;
export const selectToolSchema = createSelectSchema(tool);
export const insertToolSchema = createInsertSchema(tool);
export const updateToolSchema = createUpdateSchema(tool);
export type ToolInsert = z.infer<typeof insertToolSchema>;
export type ToolUpdate = z.infer<typeof updateToolSchema>;
export type ToolSelect = z.infer<typeof selectToolSchema>;
