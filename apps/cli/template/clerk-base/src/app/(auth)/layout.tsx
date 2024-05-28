import { siteConfig } from "@/config/site";
import { LayoutProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex flex-1">{children}</main>
        </div>
    );
}
