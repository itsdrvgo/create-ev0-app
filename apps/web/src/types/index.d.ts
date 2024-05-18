import { Icons } from "@/components/icons";
import { HTMLAttributes, ReactNode } from "react";

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

export type NavItem = {
    title: string;
    href: string;
    isExternal?: boolean;
    icon?: keyof typeof Icons;
};

export type Feature = {
    title: string;
    description: string;
    image?: string;
    href: string;
    isDisabled?: boolean;
};

export type Socials = {
    title: string;
    description: string;
    icon: keyof typeof Icons;
    href: string;
};
