"use client";

import { cn } from "@/lib/utils";
import { GenericProps } from "@/types";
import { forwardRef, ReactNode } from "react";
import { Icons } from "../icons";

interface EmptyPlaceholderProps extends GenericProps {
    title: string;
    description: string;
    icon?: keyof typeof Icons;
    endContent?: ReactNode;
    isBackgroundVisible?: boolean;
    fullWidth?: boolean;
}

const EmptyPlaceholder = forwardRef<HTMLDivElement, EmptyPlaceholderProps>(
    (
        {
            className,
            title,
            description,
            icon,
            endContent,
            isBackgroundVisible = true,
            fullWidth,
            ...props
        },
        ref
    ) => {
        const Icon = icon ? Icons[icon] : undefined;

        return (
            <div
                ref={ref}
                className={cn(
                    "space-y-5 rounded-xl border bg-card p-10 shadow",
                    !isBackgroundVisible && "bg-transparent shadow-none",
                    fullWidth && "w-full",
                    className
                )}
                {...props}
            >
                {Icon && (
                    <div className="flex items-center justify-center">
                        <div className="rounded-full bg-primary p-5">
                            <Icon />
                        </div>
                    </div>
                )}

                <div className="space-y-3 text-center">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="max-w-xs text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                {endContent && (
                    <div className="flex items-center justify-center">
                        {endContent}
                    </div>
                )}
            </div>
        );
    }
);
EmptyPlaceholder.displayName = "EmptyPlaceholder";

export { EmptyPlaceholder, type EmptyPlaceholderProps };
