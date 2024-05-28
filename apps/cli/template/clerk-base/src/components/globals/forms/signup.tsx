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
import { SignUpData, signupSchema } from "@/lib/validation/auth";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignUpForm() {
    const router = useRouter();

    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

    const [expired, setExpired] = useState(false);
    const [verified, setVerified] = useState(false);

    const { signUp, isLoaded: signUpLoaded, setActive } = useSignUp();

    const form = useForm<SignUpData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            username: "",
        },
    });

    if (!signUpLoaded)
        return (
            <div>
                <Icons.spinner className="size-6 animate-spin" />
            </div>
        );

    const { startEmailLinkFlow } = signUp.createEmailLinkFlow();

    const onSubmit = async (data: SignUpData) => {
        setAuthLoading(true);
        setExpired(false);
        setVerified(false);

        try {
            await signUp.create({
                username: data.username,
                emailAddress: data.email,
            });

            toast.success(
                "A sign up link has been sent to your email. Please check your inbox"
            );
        } catch (err) {
            setAuthLoading(false);

            const unknownError = "Something went wrong, please try again.";

            isClerkAPIResponseError(err)
                ? toast.error(err.errors[0]?.longMessage ?? unknownError)
                : toast.error(unknownError);

            return;
        }

        const su = await startEmailLinkFlow({
            redirectUrl: getAbsoluteURL("/verification"),
        });

        const verification = su.verifications.emailAddress;

        if (verification.verifiedFromTheSameClient()) {
            setVerified(true);
            return;
        } else if (verification.status === "expired") setExpired(true);

        if (su.status === "complete") {
            setAuthLoading(false);
            setActive({ session: su.createdSessionId }).then(() => {
                router.push("/profile");
                toast.success(
                    "Welcome to DRVGO! You have successfully signed in. Please wait while we redirect you to your profile"
                );
            });
            return;
        }
    };

    if (expired) {
        setAuthLoading(false);
        router.push("/");
        toast.error("Verification link expired, please try again!");
    }
    if (verified) {
        setAuthLoading(false);
        router.push("/profile");
        toast.success("Welcome to DRVGO! You have successfully signed in");
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) => form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    className="lowercase"
                                    placeholder="duckymomo60"
                                    disabled={isAuthLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    inputMode="email"
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
                    {isAuthLoading ? "Signing up" : "Sign Up"}
                </Button>
            </form>
        </Form>
    );
}
