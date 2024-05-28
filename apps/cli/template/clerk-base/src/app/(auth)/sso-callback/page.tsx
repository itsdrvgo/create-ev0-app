"use client";

import { Icons } from "@/components/icons";
import { getAbsoluteURL } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

function Page() {
    const { handleRedirectCallback } = useClerk();

    useEffect(() => {
        void handleRedirectCallback({
            redirectUrl: getAbsoluteURL("/profile"),
            afterSignInUrl: getAbsoluteURL("/profile"),
            afterSignUpUrl: getAbsoluteURL("/profile"),
        });
    }, [handleRedirectCallback]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-5">
            <Icons.spinner className="size-10 animate-spin" />
            <p>Validating, please wait...</p>
        </div>
    );
}

export default Page;
