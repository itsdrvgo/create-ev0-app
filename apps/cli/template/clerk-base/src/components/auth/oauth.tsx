"use client";

import useAuthStore from "@/lib/store/auth";
import { cn, getAbsoluteURL } from "@/lib/utils";
import { GenericProps } from "@/types";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { OAuthStrategy } from "@clerk/types";
import { useState } from "react";
import { toast } from "sonner";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface OAuthProviders {
    name: string;
    provider: OAuthStrategy;
}

const providers: OAuthProviders[] = [
    {
        name: "Discord",
        provider: "oauth_discord",
    },
];

export function OAuth({ className, ...props }: GenericProps) {
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

    const [isLoading, setLoading] = useState<OAuthStrategy | null>(null);
    const { signIn, isLoaded: signInLoaded } = useSignIn();

    if (!signInLoaded)
        return (
            <div>
                <Icons.spinner className="size-6 animate-spin" />
            </div>
        );

    const handleLogin = async (provider: OAuthStrategy) => {
        try {
            setLoading(provider);
            await signIn.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: getAbsoluteURL("/sso-callback"),
                redirectUrlComplete: getAbsoluteURL("/profile"),
            });
        } catch (err) {
            setLoading(null);
            console.error(err);

            const unknownError = "Something went wrong, please try again.";

            isClerkAPIResponseError(err)
                ? toast.error(err.errors[0]?.longMessage ?? unknownError)
                : toast.error(unknownError);
        }
    };

    return (
        <div
            className={cn(
                "flex w-full items-center justify-center gap-2",
                className
            )}
            {...props}
        >
            {providers.map((provider) => {
                return (
                    <Button
                        aria-label={`Sign in with ${provider.name}`}
                        key={provider.provider}
                        className="w-full"
                        variant="outline"
                        onClick={() => handleLogin(provider.provider)}
                        disabled={
                            isAuthLoading || isLoading === provider.provider
                        }
                    >
                        {provider.name}
                    </Button>
                );
            })}
        </div>
    );
}
