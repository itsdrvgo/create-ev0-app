const DRIZZLE = {
    name: "drizzle",
    packages: {
        dependencies: {
            "drizzle-orm": "^0.30.2",
            "drizzle-zod": "^0.5.1",
        },
        devDependencies: {
            "drizzle-kit": "^0.21.2",
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

const TAILWINDDEVS = {
    autoprefixer: "^10.4.17",
    "class-variance-authority": "^0.7.0",
    clsx: "^2.1.0",
    "eslint-plugin-tailwindcss": "^3.14.3",
    postcss: "^8.4.35",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "tailwindcss-animate": "^1.0.7",
    "tailwind-merge": "^2.2.0",
    tailwindcss: "^3.4.1",
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
                "@clerk/types": "^4.2.0",
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
                "eslint-plugin-drizzle": "^0.2.3",
            },
        },
    },
    PLANETSCALEDB: {
        name: "planetscale",
        packages: {
            dependencies: {
                "@planetscale/database": "^1.18.0",
                ...DRIZZLE.packages.dependencies,
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
                "@prisma/client": "^4.1.3",
            },
            devDependencies: {
                prisma: "^5.13.0",
            },
        },
    },
    TAILWIND: {
        name: "tailwind",
        packages: {
            dependencies: {},
            devDependencies: TAILWINDDEVS,
        },
    },
    SHADCN: {
        name: "shadcn",
        packages: {
            dependencies: {
                "lucide-react": "^0.378.0",
                "next-themes": "^0.3.0",
            },
            devDependencies: TAILWINDDEVS,
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
