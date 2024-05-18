import { appRouter } from "@/lib/trpc";
import { createContext } from "@/lib/trpc/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

const handler = (req: NextRequest) => {
    return fetchRequestHandler({
        req,
        endpoint: "/api/trpc",
        router: appRouter,
        createContext,
        onError:
            process.env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? "<no-path>"}: ${
                              error.message
                          }`
                      );
                  }
                : undefined,
    });
};

export { handler as GET, handler as POST };
