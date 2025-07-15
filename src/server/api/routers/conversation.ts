import { z } from 'zod';

import {
    createTRPCRouter,
    protectedProcedure,
} from '@/server/api/trpc';
import { and, eq, desc } from 'drizzle-orm';
import { conversation, insertConversationSchema, updateConversationSchema } from '@/server/db/schema/conversation';

export const conversationRouter = createTRPCRouter({
    createConversation: protectedProcedure
        .input(insertConversationSchema.pick({ title: true, projectId: true, messages: true, summary: true, metadata: true }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db
                .insert(conversation)
                .values({
                    ...input,
                    userId: ctx.session.user.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .returning()
                .get();
        }),

    listConversations: protectedProcedure
        .input(z.object({ projectId: z.string().optional() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.query.conversation.findMany({
                where: and(
                    input.projectId ? eq(conversation.projectId, input.projectId) : undefined,
                    eq(conversation.userId, ctx.session.user.id)
                ),
                orderBy: (conversationTable, { desc }) => [desc(conversationTable.createdAt)],
            });
        }),

    getConversation: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.query.conversation.findFirst({
                where: and(
                    eq(conversation.id, input.id),
                    eq(conversation.userId, ctx.session.user.id)
                ),
            });
        }),
    deleteConversation: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(conversation)
                .where(and(eq(conversation.id, input.id), eq(conversation.userId, ctx.session.user.id)));
            return { id: input.id };
        }),

    updateConversation: protectedProcedure
        .input(updateConversationSchema)
        .mutation(async ({ ctx, input }) => {
            if (input.id === undefined) {
                throw new Error("Conversation id is required");
            }
            return ctx.db.update(conversation).set(input).where(and(eq(conversation.id, input.id), eq(conversation.userId, ctx.session.user.id))).returning().get();
        }),
});
