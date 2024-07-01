const DRIZZLE = {
    name: "drizzle",
    packages: {
        dependencies: {
            "drizzle-orm": "^0.30.10",
            "drizzle-zod": "^0.5.1",
        },
        devDependencies: {
            "drizzle-kit": "^0.21.4",
            "eslint-plugin-drizzle": "^0.2.3",
        },
    },
};

const SUPABASE = {
    name: "supabase",
    packages: {
        dependencies: {
            "@supabase/supabase-js": "^2.39.8",
            "@supabase/auth-helpers-nextjs": "^0.10.0",
        },
        devDependencies: {},
    },
};

export const PACKAGES = {
    SUPABASEAUTH: {
        name: "supabase-auth",
        packages: {
            dependencies: SUPABASE.packages.dependencies,
            devDependencies: {},
        },
    },
    CLERK: {
        name: "clerk-auth",
        packages: {
            dependencies: {
                "@clerk/nextjs": "^5.0.6",
                "@radix-ui/react-tabs": "^1.0.4",
                svix: "^1.24.0",
                zustand: "^4.5.2",
            },
            devDependencies: {},
        },
    },
    SUPABASEDB: {
        name: "supabase-db",
        packages: {
            dependencies: {
                "@paralleldrive/cuid2": "^2.2.2",
                ...SUPABASE.packages.dependencies,
                ...DRIZZLE.packages.dependencies,
                postgres: "^3.4.3",
            },
            devDependencies: {
                ...DRIZZLE.packages.devDependencies,
            },
        },
    },
    MONGODB: {
        name: "mongodb",
        packages: {
            dependencies: {
                "@prisma/client": "^5.16.1",
            },
            devDependencies: {
                prisma: "^5.16.1",
            },
        },
    },
    TRPC: {
        name: "trpc",
        packages: {
            dependencies: {
                "@trpc/client": "next",
                "@trpc/next": "next",
                "@trpc/react-query": "next",
                "@trpc/server": "next",
                "@tanstack/react-query": "^5.28.2",
                superjson: "^2.2.1",
            },
            devDependencies: {
                "@tanstack/react-query-devtools": "^5.29.2",
            },
        },
    },
    UPLOADTHING: {
        name: "uploadthing",
        packages: {
            dependencies: {
                "@uploadthing/react": "^6.4.0",
                uploadthing: "^6.6.0",
            },
            devDependencies: {},
        },
    },
};
