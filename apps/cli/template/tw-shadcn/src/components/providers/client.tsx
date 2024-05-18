"use client";

import { LayoutProps } from "@/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ClientProvider({ children }: LayoutProps) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="light">
            {children}
        </NextThemesProvider>
    );
}

export default ClientProvider;
