"use client";

import { PackageManager } from "@/config/const";
import { cn, generateInitCommand } from "@/lib/utils";
import { GenericProps } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Icons } from "../icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/drop-downmenu";

export function CommandCopy({ className }: GenericProps) {
    const [isClicked, setIsClicked] = useState(false);

    const handleCopy = (pkgManager: PackageManager) => {
        navigator.clipboard.writeText(generateInitCommand(pkgManager));
        setIsClicked(true);
        toast.success("Copied to clipboard");
    };

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => setIsClicked(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isClicked]);

    return (
        <div
            className={cn(
                "flex items-center gap-4 rounded-md border bg-muted p-2 px-5 text-sm text-muted-foreground md:text-base",
                className
            )}
        >
            <p>{generateInitCommand(PackageManager.NPM)}</p>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    {isClicked ? (
                        <Icons.check className="size-4" />
                    ) : (
                        <Icons.copy className="size-4" />
                    )}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {Object.values(PackageManager).map((pkgManager) => (
                        <DropdownMenuItem
                            key={pkgManager}
                            onSelect={() => handleCopy(pkgManager)}
                        >
                            {pkgManager}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
