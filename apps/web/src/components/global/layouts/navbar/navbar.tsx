"use client";

import EV0Text from "@/../public/EV0.png";
import { Icons } from "@/components/icons";
import { REPO_API_ENDPOINT, REPO_URL } from "@/config/const";
import { menu } from "@/config/menu";
import { useNavbarStore } from "@/lib/store/navbar";
import { cFetch, cn, convertNumberToShortForm } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const isMenuOpen = useNavbarStore((state) => state.isOpen);
    const setIsMenuOpen = useNavbarStore((state) => state.setIsOpen);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest > previous && latest > 150) setIsMenuHidden(true);
        else setIsMenuHidden(false);
    });

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
        <motion.header
            variants={{
                visible: {
                    y: 0,
                },
                hidden: {
                    y: "-100%",
                },
            }}
            animate={isMenuHidden ? "hidden" : "visible"}
            transition={{
                duration: 0.35,
                ease: "easeInOut",
            }}
            className={cn(
                "sticky inset-x-0 top-0 z-50 flex h-auto w-full items-center justify-center px-4 py-3 backdrop-blur-md backdrop-saturate-100 md:py-4",
                isMenuOpen && "bg-background"
            )}
            data-menu-open={isMenuOpen}
        >
            <nav className="relative z-10 flex w-full max-w-7xl items-center justify-between gap-5">
                <Link href="/" className="flex items-center gap-2 md:gap-3">
                    <Image src={EV0Text} alt="EV0" width={100} height={100} />
                </Link>

                <div className="hidden items-center gap-1 sm:flex md:gap-4">
                    {!!menu.length &&
                        menu.map((item, index) => (
                            <Link
                                className="font-medium"
                                href={item.href}
                                target={item.isExternal ? "_blank" : "_self"}
                                key={index}
                            >
                                {item.title}
                            </Link>
                        ))}

                    <Link
                        className="flex items-center gap-2 rounded-md border border-border/50 bg-muted p-2 py-0"
                        href={REPO_URL}
                        target="_blank"
                    >
                        <div className="py-1">
                            <Icons.star className="size-4" />
                        </div>
                        <p className="border-r border-border/50 py-1 pr-2 text-sm">
                            {convertNumberToShortForm(starCount)}
                        </p>
                        <div>
                            <Icons.github className="size-4" />
                        </div>
                    </Link>
                </div>

                <div className="flex items-center justify-end sm:hidden">
                    <button
                        aria-label="Mobile Menu Toggle Button"
                        aria-pressed={isMenuOpen}
                        className="sm:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <Icons.cross className="size-6" />
                        ) : (
                            <Icons.menu className="size-6" />
                        )}
                    </button>
                </div>
            </nav>

            <div
                className={cn(
                    "absolute inset-0 size-full bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:40px_40px]",
                    isMenuOpen && "hidden"
                )}
            ></div>
        </motion.header>
    );
}
