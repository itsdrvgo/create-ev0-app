import { LayoutProps } from "@/types";
import { ClerkProvider } from "@clerk/nextjs";

export function ServerProvider({ children }: LayoutProps) {
    return <ClerkProvider>{children}</ClerkProvider>;
}

