import EV0Text from "@/../public/EV0.png";
import { REPO_URL } from "@/config/const";
import { cn } from "@/lib/utils";
import { GenericProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { CommandCopy } from "./";

export function Hero({ className, ...props }: GenericProps) {
    return (
        <section
            className={cn(
                "relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center p-5",
                className
            )}
            {...props}
        >
            <div className="z-10 flex max-w-6xl flex-col items-center gap-8 md:gap-10">
                <Image src={EV0Text} alt="EV0" width={200} height={200} />

                <p className="text-balance text-center text-3xl md:text-5xl">
                    <span className="bg-gradient-to-r from-violet-600 to-orange-400 bg-clip-text text-transparent">
                        The Best
                    </span>{" "}
                    <span>Stack for a Full Stack Developer</span>
                </p>

                <div className="flex w-full flex-col items-center gap-5 text-center md:w-3/4">
                    <p className="text-balance text-sm text-gray-400 md:text-base">
                        Used by thousands of developers worldwide to build{" "}
                        <span className="text-white">
                            Fast, Scalable, and Secure applications
                        </span>
                        . Join the community today and start building your next
                        project with EV0.
                    </p>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Link
                                href="/docs/get-started"
                                className={cn(buttonVariants())}
                            >
                                Get Started
                            </Link>

                            <Link
                                href={REPO_URL}
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        className: "space-x-2",
                                    })
                                )}
                                target="_blank"
                            >
                                <span>GitHub</span>
                                <div>
                                    <Icons.externalLink className="size-4" />
                                </div>
                            </Link>
                        </div>

                        <CommandCopy />
                    </div>
                </div>

                <p className="text-balance text-center text-sm md:text-base">
                    <span>
                        Already using EV0 in your project? Let us know your
                    </span>{" "}
                    <Link
                        href="/feedback"
                        className="underline underline-offset-2"
                    >
                        feedback
                    </Link>
                    .
                </p>
            </div>

            <div className="absolute inset-0 size-full bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:40px_40px]"></div>
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />

            <div className="bg_glow absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2" />
        </section>
    );
}
