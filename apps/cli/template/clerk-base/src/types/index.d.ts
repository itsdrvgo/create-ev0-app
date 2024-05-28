import { IncomingHttpHeaders } from "http";
import { HTMLAttributes, ReactNode } from "react";
import { WebhookRequiredHeaders } from "svix";

export type SiteConfig = {
    name: string;
    description: string;
    ogImage: string;
    keywords?: string[];
    links?: {
        [key: string]: string;
    };
};

export type GenericProps = HTMLAttributes<HTMLElement>;
export interface LayoutProps {
    children: ReactNode;
}

export type SvixHeaders = IncomingHttpHeaders & WebhookRequiredHeaders;
