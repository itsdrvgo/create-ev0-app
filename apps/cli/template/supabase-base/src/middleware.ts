import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const url = new URL(req.url);
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({ req, res });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (url.pathname.startsWith("/auth")) {
        if (user) return NextResponse.redirect(new URL("/dashboard", req.url));
        return res;
    }

    if (!user) return NextResponse.redirect(new URL("/auth/signin", req.url));

    return res;
}

export const config = {
    // Assuming you have the auth routes as /auth/* (e.g. /auth/signin, /auth/signup)
    // and the dashboard routes as /dashboard/* (e.g. /dashboard, /dashboard/settings)
    matcher: ["/dashboard/:path*", "/auth/:path*"],
};
