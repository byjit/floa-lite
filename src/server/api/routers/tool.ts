import { z } from 'zod';

import {
    createTRPCRouter,
    protectedProcedure,
} from '@/server/api/trpc';
import { and, eq } from 'drizzle-orm';
import { tool, insertToolSchema, updateToolSchema } from '@/server/db/schema/tools';

export const toolRouter = createTRPCRouter({
  createTool: protectedProcedure
    .input(insertToolSchema.pick({ name: true, type: true, description: true, configuration: true, projectId: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .insert(tool)
        .values({
          ...input,
          userId: ctx.session.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning()
        .get();
    }),

  getTools: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(tool)
      .where(eq(tool.userId, ctx.session.user.id))
      .all();
  }),

  getTool: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(tool)
        .where(and(eq(tool.id, input.id), eq(tool.userId, ctx.session.user.id)))
        .get();
    }),

  updateTool: protectedProcedure
    .input(updateToolSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const { id, ...dataToUpdate } = input;
        return ctx.db
            .update(tool)
            .set({ ...dataToUpdate, updatedAt: new Date() })
            .where(and(eq(tool.id, id), eq(tool.userId, ctx.session.user.id)))
            .returning()
            .get();
    }),

  deleteTool: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(tool)
        .where(and(eq(tool.id, input.id), eq(tool.userId, ctx.session.user.id)));
      return { id: input.id };
    }),
});