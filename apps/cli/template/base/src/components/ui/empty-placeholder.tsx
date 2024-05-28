"use client";

import { ReactNode } from "react";
import { Icons } from "../icons";
import { Card, CardContent, CardFooter, CardHeader } from "./card";

export interface EmptyPlaceholderProps {
    title: string;
    description: string;
    icon: keyof typeof Icons;
    endContent?: ReactNode;
}

export function EmptyPlaceholder({
    title,
    description,
    icon,
    endContent,
    ...props
}: EmptyPlaceholderProps) {
    const Icon = Icons[icon];

    return (
        <Card className="gap-3 py-10" {...props}>
            <CardHeader className="items-center justify-center">
                <div className="rounded-full border bg-blue-300 p-5">
                    <div>
                        <Icon />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 text-center">
                <p className="text-2xl font-bold">{title}</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                    {description}
                </p>
            </CardContent>

            {endContent && (
                <CardFooter className="flex items-center justify-center">
                    {endContent}
                </CardFooter>
            )}
        </Card>
    );
}
