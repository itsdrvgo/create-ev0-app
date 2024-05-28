"use client";

import { OAuth } from "@/components/auth";
import { SignInForm, SignUpForm } from "@/components/globals/forms";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

function Page() {
    const [selected, setSelected] = useState("signin");

    return (
        <section className="flex flex-1 items-center justify-center p-5">
            <Card className="w-full max-w-sm">
                <CardContent className="p-5">
                    <Tabs value={selected} onValueChange={setSelected}>
                        <TabsList className="w-full">
                            <TabsTrigger value="signin" className="w-full">
                                Sign In
                            </TabsTrigger>
                            <TabsTrigger value="signup" className="w-full">
                                Sign Up
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin">
                            <div className="space-y-4">
                                <OAuth />

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="rounded-md bg-card px-2 text-muted-foreground">
                                            Or
                                        </span>
                                    </div>
                                </div>

                                <SignInForm />

                                <div className="flex-1 cursor-default text-xs text-muted-foreground md:text-sm">
                                    Don&apos;t have an account?{" "}
                                    <span
                                        onClick={() => setSelected("signup")}
                                        className="cursor-pointer text-sky-400 underline"
                                    >
                                        Sign up
                                    </span>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="signup">
                            <div className="space-y-4">
                                <OAuth />

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="rounded-md bg-card px-2 text-muted-foreground">
                                            Or
                                        </span>
                                    </div>
                                </div>

                                <SignUpForm />

                                <div className="flex-1 cursor-default text-xs text-muted-foreground md:text-sm">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setSelected("signin")}
                                        className="cursor-pointer text-sky-400 underline"
                                    >
                                        Sign in
                                    </span>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </section>
    );
}

export default Page;
