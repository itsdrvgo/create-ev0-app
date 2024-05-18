import { LayoutProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "EV0",
        template: "%s | EV0",
    },
    description:
        "The best CLI for creating, building, and deploying your Next.js apps.",
};

function Layout({ children }: LayoutProps) {
    return <main className="main_container">{children}</main>;
}

export default Layout;
