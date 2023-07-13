import { createTRPCRouter } from "@/server/api/trpc";
import { greetifyRouter } from "./routers/greetify";
import { journeyRouter } from "./routers/journey";
import { storytimeRouter } from "./routers/storytime";
import { summariserRouter } from "./routers/summariser";
import { wordSmithRouter } from "./routers/wordsmith";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  greetify: greetifyRouter,
  journey: journeyRouter,
  wordsmith: wordSmithRouter,
  storytime: storytimeRouter,
  summariser: summariserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
