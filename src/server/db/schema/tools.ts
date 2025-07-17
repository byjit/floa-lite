import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod';
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { projectsToTools } from "./projects_to_tools";
import { float32Array } from "../custom";

export const toolType = ['integration', 'mcp'] as const;
export const toolTypeSchema = z.enum(toolType);

// Define the Zod schema for MCP server configuration
export const mcpServerConfigSchema = z.object({
  url: z.string().url(),
  headers: z.record(z.string(), z.string()).optional(),
  transport: z.enum(["sse", "http"]).optional(),
  reconnect: z.object({
    enabled: z.boolean(),
    maxAttempts: z.number().int().positive(),
    delayMs: z.number().int().positive(),
  }).optional(),
});

export type McpServerConfig = z.infer<typeof mcpServerConfigSchema>;

/**
 * Defines the tools available for AI agents to use.
 * This table stores information about various tools (e.g., API integrations, MCP tools, plugins),
 * including their configuration and association with projects and users.
 */
export const tool = sqliteTable("tool", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(), // Name of the tool, e.g., "Weather API", "GitHub Tool"
    type: text('type', { enum: toolType }).notNull(), // Type of the tool, e.g., 'api', 'mcp'
  description: text('description'),
  description_vector: float32Array('description_vector', { dimensions: 1536 }).$type<number[]>(),
  configuration: text('configuration', { mode: 'json' }).$type<McpServerConfig>(), // JSON object for tool-specific configuration (e.g., API keys, endpoints)
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }), // Optional: if tool is user-specific
    metadata: text('metadata'),
  is_active: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
}, (table) => [
    index("name_type_idx").on(table.name, table.type)
]);

export const toolsRelations = relations(tool, ({ many }) => ({
  projectsToTools: many(projectsToTools),
}));

export type Tool = typeof tool.$inferSelect;
export const selectToolSchema = createSelectSchema(tool);
export const insertToolSchema = createInsertSchema(tool);
export const updateToolSchema = createUpdateSchema(tool);
export type ToolInsert = z.infer<typeof insertToolSchema>;
export type ToolUpdate = z.infer<typeof updateToolSchema>;
export type ToolSelect = z.infer<typeof selectToolSchema>;
