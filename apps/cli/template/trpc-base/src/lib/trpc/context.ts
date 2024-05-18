type CreateContextOptions = {
    req: Request;
};

export const createContextInner = ({ req }: CreateContextOptions) => {
    return {
        req,
    };
};

export const createContext = async ({ req }: { req: Request }) => {
    return createContextInner({
        req,
    });
};

export type Context = ReturnType<typeof createContextInner>;
