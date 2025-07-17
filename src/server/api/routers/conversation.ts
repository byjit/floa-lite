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
        .input(z.object({
            projectId: z.string().optional(),
            limit: z.number().min(1).max(100).default(10),
            offset: z.number().min(0).default(0),
        }))
        .query(async ({ ctx, input }) => {
            const conversations = await ctx.db.query.conversation.findMany({
                where: and(
                    input.projectId ? eq(conversation.projectId, input.projectId) : undefined,
                    eq(conversation.userId, ctx.session.user.id)
                ),
                orderBy: (conversationTable, { desc }) => [desc(conversationTable.createdAt)],
                limit: input.limit,
                offset: input.offset,
            });

            // Get total count for pagination
            const totalCount = await ctx.db.query.conversation.findMany({
                where: and(
                    input.projectId ? eq(conversation.projectId, input.projectId) : undefined,
                    eq(conversation.userId, ctx.session.user.id)
                ),
            }).then(results => results.length);

            return {
                conversations,
                totalCount,
                hasMore: input.offset + input.limit < totalCount,
            };
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
