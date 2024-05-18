import { supabase } from "@/lib/supabase";

export const useSupabase = () => {
    const getSession = async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        return session;
    };

    const refreshSession = async () => {
        const {
            data: { session },
        } = await supabase.auth.refreshSession();

        return session;
    };

    const setSession = async ({
        access_token,
        refresh_token,
    }: {
        access_token: string;
        refresh_token: string;
    }) => {
        const {
            data: { session },
        } = await supabase.auth.setSession({
            access_token,
            refresh_token,
        });

        return session;
    };

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        return user;
    };

    return {
        supabase,
        getSession,
        refreshSession,
        setSession,
        getUser,
    };
};
