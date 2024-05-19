"use client";

import { Icons } from "@/components/icons";
import { REPO_API_ENDPOINT, REPO_URL } from "@/config/const";
import { menu } from "@/config/menu";
import { useNavbarStore } from "@/lib/store/navbar";
import { cFetch, cn, convertNumberToShortForm } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

export function NavbarMob() {
    const isMenuOpen = useNavbarStore((state) => state.isOpen);
    const setIsMenuOpen = useNavbarStore((state) => state.setIsOpen);

    useEffect(() => {
        if (typeof document === "undefined") return;

        if (isMenuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [isMenuOpen]);

    const { data: starCount } = useQuery({
        queryKey: ["ev0", "stars", "count"],
        queryFn: async () => {
            const data = await cFetch<{
                stargazers_count?: number;
            }>(REPO_API_ENDPOINT);
            return data.stargazers_count ?? 0;
        },
        initialData: 0,
    });

    return (
        <ul
            aria-label="Mobile Menu"
            data-menu-open={isMenuOpen}
            className={cn(
                "fixed inset-x-0 z-40 bg-background",
                "w-screen overflow-hidden px-4 py-3",
                "transition-all duration-500 ease-in-out",
                "h-0 data-[menu-open=true]:h-[calc(100vh-3.75rem)]",
                "-top-1/2 bottom-0 data-[menu-open=true]:top-[3.75rem]",
                "md:hidden"
            )}
            style={{
                backgroundImage: "url(./noise-light.png)",
            }}
        >
            {menu.map((item, index) => {
                const Icon = Icons[item.icon ?? "add"];

                return (
                    <li
                        key={index}
                        className="border-b"
                        aria-label="Mobile Menu Item"
                    >
                        <Link
                            href={item.href}
                            className="flex items-center justify-between gap-2 px-2 py-5 text-white"
                            target={item.isExternal ? "_blank" : "_self"}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>{item.title}</span>
                            <Icon className="size-5" />
                        </Link>
                    </li>
                );
            })}

            <Link
                href={REPO_URL}
                target="_blank"
                className="mt-5 flex items-center justify-between gap-4 rounded-md bg-primary p-3"
            >
                <span>Star us on GitHub</span>

                <div className="flex items-center gap-2">
                    <span className="text-white">
                        {convertNumberToShortForm(starCount)}
                    </span>
                    <Icons.star className="size-5" />
                </div>
            </Link>
        </ul>
    );
}
