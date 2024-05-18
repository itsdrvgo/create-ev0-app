import { dummyRouter } from "./routers/dummy";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
    dummies: dummyRouter,
});

export type AppRouter = typeof appRouter;
