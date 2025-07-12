import { z } from 'zod';

import {
    createTRPCRouter,
    protectedProcedure,
} from '@/server/api/trpc';
import { and, eq } from 'drizzle-orm';
import { project, insertProjectSchema, updateProjectSchema } from '@/server/db/schema/project';
import { projectsToTools } from '@/server/db/schema/projects_to_tools';
import { tool } from '@/server/db/schema/tools';

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(insertProjectSchema.pick({ title: true, instruction: true, metadata: true }).extend({ tools: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { tools, ...projectData } = input;
      const newProject = await ctx.db
        .insert(project)
        .values({
          ...projectData,
          userId: ctx.session.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning()
        .get();

      if (tools.length > 0) {
        await ctx.db.insert(projectsToTools).values(
          tools.map((toolId) => ({
            projectId: newProject.id,
            toolId,
          }))
        );
      }

      return newProject;
    }),

  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.query.project.findMany({
      where: eq(project.userId, ctx.session.user.id),
      with: {
        projectsToTools: {
          with: {
            tool: true,
          },
        },
      },
    });
    return projects.map(p => ({ ...p, tools: p.projectsToTools.map(pt => pt.tool) }));
  }),

  getProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const p = await ctx.db.query.project.findFirst({
        where: and(eq(project.id, input.id), eq(project.userId, ctx.session.user.id)),
        with: {
          projectsToTools: {
            with: {
              tool: true,
            },
          },
        },
      });
      if (!p) return null;
      return { ...p, tools: p.projectsToTools.map(pt => pt.tool) };
    }),

  updateProject: protectedProcedure
    .input(updateProjectSchema.extend({ id: z.string(), tools: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
        const { id, tools, ...dataToUpdate } = input;
        const updatedProject = await ctx.db
            .update(project)
            .set({ ...dataToUpdate, updatedAt: new Date() })
            .where(and(eq(project.id, id), eq(project.userId, ctx.session.user.id)))
            .returning()
            .get();

        await ctx.db.delete(projectsToTools).where(eq(projectsToTools.projectId, id));
        if (tools.length > 0) {
          await ctx.db.insert(projectsToTools).values(
            tools.map((toolId) => ({
              projectId: id,
              toolId,
            }))
          );
        }

        return updatedProject;
    }),

  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(project)
        .where(and(eq(project.id, input.id), eq(project.userId, ctx.session.user.id)));
      return { id: input.id };
    }),
});