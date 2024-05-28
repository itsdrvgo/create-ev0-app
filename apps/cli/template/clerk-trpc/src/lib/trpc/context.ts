import {
    SignedInAuthObject,
    SignedOutAuthObject,
} from "@clerk/backend/internal";
import { auth as clerkAuth } from "@clerk/nextjs/server";

type CreateContextOptions = {
    auth: SignedInAuthObject | SignedOutAuthObject | null;
    req: Request;
};

export const createContextInner = ({ req, auth }: CreateContextOptions) => {
    return {
        req,
        auth,
    };
};

export const createContext = async ({ req }: { req: Request }) => {
    const auth = clerkAuth();

    return createContextInner({
        req,
        auth,
    });
};

export type Context = Awaited<ReturnType<typeof createContextInner>>;
