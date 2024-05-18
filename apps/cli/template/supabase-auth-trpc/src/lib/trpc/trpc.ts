import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { Context } from "./context";

export const cacheMap = new Map<string, number>();

export const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

const isAuth = t.middleware(async ({ ctx, next }) => {
    if (!ctx.user?.id)
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You're not authorized",
        });

    return next({
        ctx: {
            ...ctx,
            user: ctx.user,
        },
    });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(isAuth);
