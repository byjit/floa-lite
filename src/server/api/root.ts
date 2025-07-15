import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import { systemRouter, userRouter } from './routers';
import { projectRouter } from './routers/project';
import { toolRouter } from './routers/tool';
import { conversationRouter } from './routers/conversation';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  system: systemRouter,
  user: userRouter,
  project: projectRouter,
  tool: toolRouter,
  conversation: conversationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
