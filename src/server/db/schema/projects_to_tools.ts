import { sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { project } from "./project";
import { tool } from "./tools";
import { relations } from "drizzle-orm";

export const projectsToTools = sqliteTable(
  "projects_to_tools",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    toolId: text("tool_id")
      .notNull()
      .references(() => tool.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.toolId] })]
);

export const projectsToToolsRelations = relations(projectsToTools, ({ one }) => ({
    project: one(project, {
        fields: [projectsToTools.projectId],
        references: [project.id]
    }),
    tool: one(tool, {
        fields: [projectsToTools.toolId],
        references: [tool.id]
    })
}));
