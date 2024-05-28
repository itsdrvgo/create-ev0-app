"use client";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { getAbsoluteURL } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { EmailLinkErrorCode, isEmailLinkError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
    const router = useRouter();
    const [verificationStatus, setVerificationStatus] = useState("loading");
    const [isOtherDevice, setIsOtherDevice] = useState(false);

    const { handleEmailLinkVerification } = useClerk();

    useEffect(() => {
        const verify = () => {
            handleEmailLinkVerification({
                redirectUrl: getAbsoluteURL("/"),
                redirectUrlComplete: getAbsoluteURL("/profile"),
                onVerifiedOnOtherDevice: () => {
                    setIsOtherDevice(true);
                },
            })
                .then(() => {
                    !isOtherDevice && setVerificationStatus("verified");
                    toast.success(
                        "Welcome to DRVGO! You have successfully signed in"
                    );
                })
                .catch((err) => {
                    let status = "failed";
                    if (
                        isEmailLinkError(err) &&
                        err.code === EmailLinkErrorCode.Expired
                    ) {
                        status = "expired";
                    }
                    setVerificationStatus(status);
                });
        };
        verify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOtherDevice]);

    let description: string;

    switch (verificationStatus) {
        case "loading":
            description =
                "Please wait while we verify your email. This may take a few seconds.";
            break;
        case "failed":
            description = "Verification failed. Please try again.";
            break;
        case "expired":
            description = "Verification link expired, please try again.";
            break;
        case "verified":
            description =
                "Successfully signed in. Click the button below to go to your profile.";
            break;
        default:
            description =
                "Please verify your email by clicking the link in your inbox.";
            break;
    }

    return (
        <section className="flex h-screen items-center justify-center bg-background p-5">
            <EmptyPlaceholder
                icon="warning"
                title="Verification"
                description={
                    isOtherDevice
                        ? "You have successfully signed in. Check your device from where you signed in initially, to continue."
                        : description
                }
                endContent={
                    !isOtherDevice &&
                    verificationStatus === "verified" && (
                        <Button onClick={() => router.push("/profile")}>
                            Go to Profile
                        </Button>
                    )
                }
            />
        </section>
    );
}

export default Page;
