import { features } from "@/config/features";
import { cn } from "@/lib/utils";
import { Feature, GenericProps } from "@/types";
import Link from "next/link";

export function Features({ className, ...props }: GenericProps) {
    return (
        <section
            className={cn("flex justify-center p-5 py-10", className)}
            {...props}
        >
            <div className="flex max-w-6xl flex-col items-center gap-10">
                <div className="space-y-4 text-center">
                    <p className="flex items-center justify-center text-base text-blue-200 md:text-2xl">
                        <span className="text-balance">
                            Top Typesafe Ecosystem Picks, Unified
                        </span>
                    </p>

                    <div className="space-y-2">
                        <p className="text-2xl text-white md:text-4xl">
                            Explore enhanced tools for seamless development
                        </p>
                        <p className="text-sm text-muted-foreground md:text-base">
                            Select according to your needs
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ title, description, href, isDisabled }: Feature) {
    return (
        <Link
            href={href}
            className={cn(
                "group h-full overflow-hidden rounded-md border border-border/40 transition-all ease-in-out hover:border-border/70",
                isDisabled && "pointer-events-none opacity-50"
            )}
        >
            <div className="flex items-center gap-3 border-b border-border/30 bg-card p-5 py-3 backdrop-blur-sm transition-all ease-in-out group-hover:bg-primary/60">
                <p>
                    {title}
                    {isDisabled && (
                        <span className="text-xs text-red-500">
                            {" "}
                            (Coming Soon)
                        </span>
                    )}
                </p>
            </div>

            <div className="p-5 text-sm md:text-base">
                <p>{description}</p>
            </div>
        </Link>
    );
}
