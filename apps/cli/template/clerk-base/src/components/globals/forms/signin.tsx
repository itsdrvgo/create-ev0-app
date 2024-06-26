"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store/auth";
import { getAbsoluteURL } from "@/lib/utils";
import { LoginData, loginSchema } from "@/lib/validation/auth";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { EmailLinkFactor, SignInResource } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignInForm() {
    const router = useRouter();

    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

    const [expired, setExpired] = useState(false);
    const [verified, setVerified] = useState(false);

    const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        },
    });

    if (!signInLoaded)
        return (
            <div>
                <Icons.spinner className="size-6 animate-spin" />
            </div>
        );

    const { startEmailLinkFlow } = signIn.createEmailLinkFlow();

    const onSubmit = async (data: LoginData) => {
        setAuthLoading(true);
        setExpired(false);
        setVerified(false);

        let si: SignInResource;

        try {
            si = await signIn.create({ identifier: data.email });

            toast.success(
                "A sign in link has been sent to your email. Please check your inbox"
            );
        } catch (err) {
            setAuthLoading(false);

            const unknownError = "Something went wrong, please try again.";

            isClerkAPIResponseError(err)
                ? toast.error(err.errors[0]?.longMessage ?? unknownError)
                : toast.error(unknownError);

            return;
        }

        const siFactor = si.supportedFirstFactors.find(
            (x) =>
                x.strategy === "email_link" && x.safeIdentifier === data.email
        ) as EmailLinkFactor | undefined;

        if (!siFactor || !siFactor.emailAddressId)
            return toast.success(
                "A sign in link has been sent to your email. Please check your inbox"
            );

        const res = await startEmailLinkFlow({
            emailAddressId: siFactor.emailAddressId,
            redirectUrl: getAbsoluteURL("/verification"),
        });

        const verification = res.firstFactorVerification;

        if (verification.verifiedFromTheSameClient()) {
            setVerified(true);
            return;
        } else if (verification.status === "expired") setExpired(true);

        if (res.status === "complete") {
            setAuthLoading(false);
            setActive({ session: res.createdSessionId }).then(() => {
                router.push("/profile");
                toast.success(
                    "Welcome to DRVGO! You have successfully signed in"
                );
            });
            return;
        }
    };

    if (expired) {
        setAuthLoading(false);
        router.push("/");
        toast.error("Verification link expired, please try again");
    }

    if (verified) {
        setAuthLoading(false);
        router.push("/profile");
        toast.error("Welcome to DRVGO! You have successfully signed in");
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) => form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ryomensukuna@jjk.jp"
                                    disabled={isAuthLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="font-semibold"
                    type="submit"
                    disabled={isAuthLoading}
                >
                    {isAuthLoading ? "Signing In" : "Sign In"}
                </Button>
            </form>
        </Form>
    );
}
