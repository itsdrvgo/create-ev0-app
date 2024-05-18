"use client";

import { trpc } from "@/lib/trpc/client";
import { getAbsoluteURL } from "@/lib/utils";
import { LayoutProps } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink, loggerLink } from "@trpc/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import superjson from "superjson";

function ClientProvider({ children }: LayoutProps) {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: getAbsoluteURL("/api/trpc"),
                    transformer: superjson,
                }),
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <NextThemesProvider attribute="class" defaultTheme="light">
                    {children}
                </NextThemesProvider>

                <ReactQueryDevtools />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default ClientProvider;
