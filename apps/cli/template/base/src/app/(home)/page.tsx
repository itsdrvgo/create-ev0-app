import EV0Text from "@/../public/EV0.png";
import { Icons } from "@/components/icons";
import { DRVGO } from "@/components/svg";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

const cards = [
    {
        href: "/docs",
        title: "Docs",
        description:
            "Read the documentation to learn more about EV0 and how to get started.",
    },
    {
        href: siteConfig.links?.discord!,
        title: "Support",
        description:
            "Join our Discord server to get help and support from the community.",
    },
    {
        href: "#",
        title: "Tutorial",
        description:
            "Follow the tutorial to learn how to use EV0 to build your Next.js apps.",
    },
];

function Page() {
    return (
        <section className="relative flex w-full flex-1 justify-center p-5 py-10">
            <div className="z-10 flex w-full max-w-6xl flex-col items-center justify-around">
                <div className="flex w-full items-center justify-center gap-10 md:justify-between">
                    <p className="hidden rounded-md border bg-muted p-3 text-sm md:inline-block">
                        Get started by editing{" "}
                        <code className="rounded-sm bg-white p-[2px] px-1 text-black">
                            `src/app/(home)/page.tsx`
                        </code>
                    </p>

                    <Link href={siteConfig.links?.drvgo!} target="_blank">
                        <DRVGO width={50} height={50} />
                    </Link>
                </div>

                <Image src={EV0Text} alt="EV0" width={300} />

                <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
                    {cards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.href}
                            className="space-y-2 rounded-md border bg-muted p-5"
                            target="_blank"
                        >
                            <div className="flex items-center gap-1">
                                <p className="text-lg font-medium">
                                    {card.title}
                                </p>
                                <Icons.chevronRight />
                            </div>

                            <p className="max-w-xs text-sm text-muted-foreground">
                                {card.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 size-full bg-[radial-gradient(#404040_1px,transparent_1px)] [background-size:40px_40px]" />

            <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-background to-transparent" />
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />

            <div className="bg_glow absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2" />
        </section>
    );
}

export default Page;
