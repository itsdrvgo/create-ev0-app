import { db } from "../prisma";

type CreateContextOptions = {
    req: Request;
};

export const createContextInner = ({ req }: CreateContextOptions) => {
    return {
        db,
        req,
    };
};

export const createContext = ({ req }: { req: Request }) => {
    return createContextInner({
        req,
    });
};

export type Context = ReturnType<typeof createContextInner>;
