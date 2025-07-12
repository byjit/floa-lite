import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod';
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { projectsToTools } from "./projects_to_tools";

/**
 * A project represents a logical grouping of AI instructions, knowledge, and tools.
 * It is used to maintain a consistent and isolated context for the AI, enabling users
 * to organize their workflows, resources, and agent configurations effectively.
*/
export const project = sqliteTable("project", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  instruction: text('instruction'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  metadata: text('metadata'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const projectRelations = relations(project, ({ many }) => ({
  projectsToTools: many(projectsToTools),
}));

export type Project = typeof project.$inferSelect;
export const selectProjectSchema = createSelectSchema(project);
export const insertProjectSchema = createInsertSchema(project);
export const updateProjectSchema = createUpdateSchema(project);
export type ProjectInsert = z.infer<typeof insertProjectSchema>;
export type ProjectUpdate = z.infer<typeof updateProjectSchema>;
export type ProjectSelect = z.infer<typeof selectProjectSchema>;
