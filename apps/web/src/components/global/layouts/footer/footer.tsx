import { cn } from "@/lib/utils";
import { GenericProps } from "@/types";
import Link from "next/link";
import Vercel from "../../svgs/Vercel";

export function Footer({ className }: GenericProps) {
    return (
        <footer
            className={cn(
                "flex items-center justify-center border-t p-5",
                className
            )}
        >
            <div className="flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-5 md:flex-row">
                <p className="text-sm">
                    <span>© {new Date().getFullYear()} </span>
                    <Link
                        href="https://itsdrvgo.me/"
                        className="text-sm text-blue-200 underline"
                        target="_blank"
                    >
                        DRVGO
                    </Link>
                    <span>. All rights reserved.</span>
                </p>

                <Link
                    href="https://vercel.com?utm_source=ev0&utm_campaign=oss"
                    className="flex items-center gap-2 md:gap-4"
                    target="_blank"
                >
                    <p className="flex gap-1 text-end text-xs md:flex-col md:gap-0">
                        <span>Powered</span>
                        <span>by</span>
                    </p>
                    <Vercel width={88} height={20} />
                </Link>
            </div>
        </footer>
    );
}
