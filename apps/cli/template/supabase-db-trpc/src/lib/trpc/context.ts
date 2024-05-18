import {
    createRouteHandlerClient,
    SupabaseClient,
    User,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db } from "../drizzle";

type CreateContextOptions = {
    user: User | null;
    supabase: SupabaseClient;
    req: Request;
};

export const createContextInner = ({
    req,
    user,
    supabase,
}: CreateContextOptions) => {
    return {
        user,
        db,
        supabase,
        req,
    };
};

export const createContext = async ({ req }: { req: Request }) => {
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore,
    });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return createContextInner({
        req,
        user,
        supabase,
    });
};

export type Context = ReturnType<typeof createContextInner>;
