import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const dummyRouter = createTRPCRouter({
    getDummyData: publicProcedure.query(async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        return {
            data,
        };
    }),
    doSomething: protectedProcedure.mutation(() => {
        return {
            data: "Hello, world!",
        };
    }),
});
