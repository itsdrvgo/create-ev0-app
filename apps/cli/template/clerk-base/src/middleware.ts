import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
    const url = new URL(req.url);
    const res = NextResponse.next();

    const { userId } = auth();

    if (url.pathname.startsWith("/auth")) {
        if (userId) return NextResponse.redirect(new URL("/profile", url));
        return res;
    }

    if (!userId) return NextResponse.redirect(new URL("/auth", url));
    return res;
});

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*", "/profile/:path*"],
};
