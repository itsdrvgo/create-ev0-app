import { socials } from "@/config/socials";
import { cn } from "@/lib/utils";
import { GenericProps } from "@/types";
import Link from "next/link";
import { Icons } from "../icons";

export function Community({ className, ...props }: GenericProps) {
    return (
        <section
            className={cn("flex justify-center p-5 py-10", className)}
            {...props}
        >
            <div className="flex max-w-6xl flex-col items-center gap-10">
                <div className="space-y-2 text-center">
                    <p className="text-3xl text-white md:text-4xl">Community</p>

                    <p className="text-balance text-center text-sm text-muted-foreground md:text-base">
                        Join our community to get help, share your knowledge,
                        and connect with developers around the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {socials.map((social) => {
                        const Icon = Icons[social.icon];

                        return (
                            <Link
                                key={social.title}
                                href={social.href}
                                className="flex h-full flex-col items-center justify-center gap-5 rounded-md border border-border/20 bg-card p-10 py-14 text-center backdrop-blur-sm transition-all ease-in-out hover:bg-primary/60"
                            >
                                <Icon className="size-8" />
                                <p>{social.description}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
