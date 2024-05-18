import path from "path";
import { PKG_ROOT } from "@/config/const";
import { generateBaseFiles, generateEnvs, getSrc } from "@/lib/ev0/helpers";
import { describe, expect, test } from "bun:test";

describe("helpers", () => {
    test("getSrc", () => {
        console.log("PKG_ROOT", PKG_ROOT);
        expect(getSrc("template")).toBe(path.join(PKG_ROOT, "template"));
        expect(getSrc("template/base")).toBe(
            path.join(PKG_ROOT, "template/base")
        );
    });

    test("generateEnvs", async () => {
        const { keys: keys1 } = await generateEnvs({
            auth: "clerk",
            db: "supabase",
            features: ["shadcn", "tailwind"],
        });

        const { keys: keys2 } = await generateEnvs({
            auth: "supabase",
            db: "supabase",
            features: ["shadcn", "tailwind", "trpc", "uploadthing"],
        });

        const { keys: keys3 } = await generateEnvs({
            auth: "none",
            db: "none",
            features: [],
        });

        expect(keys1).toEqual([
            "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
            "CLERK_SECRET_KEY",
            "DATABASE_URL",
        ]);

        expect(keys2).toEqual([
            "DATABASE_URL",
            "UPLOADTHING_SECRET",
            "UPLOADTHING_APP_ID",
        ]);

        expect(keys3).toEqual([]);
    });

    test("generateBaseFiles", () => {
        const {
            foldersToCopy: foldersToCopy1,
            dependencies: dependencies1,
            devDependencies: devDependencies1,
        } = generateBaseFiles({
            auth: "clerk",
            db: "supabase",
            features: ["shadcn", "tailwind"],
        });

        const {
            foldersToCopy: foldersToCopy2,
            dependencies: dependencies2,
            devDependencies: devDependencies2,
        } = generateBaseFiles({
            auth: "supabase",
            db: "supabase",
            features: ["shadcn", "tailwind", "trpc", "uploadthing"],
        });

        expect(foldersToCopy1).toEqual([
            "clerk-auth",
            "supabase-base",
            "supabase-db",
            "drizzle-base",
            "tw-drizzle",
            "tw-base",
            "tw-shadcn",
        ]);

        expect(Object.keys(dependencies1)).toEqual([
            "@clerk/nextjs",
            "@clerk/types",
            "@paralleldrive/cuid2",
            "@supabase/supabase-js",
            "@supabase/auth-helpers-nextjs",
            "drizzle-orm",
            "drizzle-zod",
            "postgres",
            "lucide-react",
            "next-themes",
        ]);

        expect(Object.keys(devDependencies1)).toEqual([
            "drizzle-kit",
            "eslint-plugin-drizzle",
            "autoprefixer",
            "class-variance-authority",
            "clsx",
            "eslint-plugin-tailwindcss",
            "postcss",
            "prettier-plugin-tailwindcss",
            "tailwindcss-animate",
            "tailwind-merge",
            "tailwindcss",
        ]);

        expect(foldersToCopy2).toEqual([
            "supabase-base",
            "supabase-base",
            "supabase-db",
            "drizzle-base",
            "tw-drizzle",
            "tw-base",
            "tw-shadcn",
            "trpc-base",
            "trpc-tw-shadcn",
            "supabase-auth-trpc",
            "supabase-db-trpc",
            "ut-base",
        ]);

        expect(Object.keys(dependencies2)).toEqual([
            "@supabase/supabase-js",
            "@supabase/auth-helpers-nextjs",
            "@paralleldrive/cuid2",
            "drizzle-orm",
            "drizzle-zod",
            "postgres",
            "lucide-react",
            "next-themes",
            "@trpc/client",
            "@trpc/next",
            "@trpc/react-query",
            "@trpc/server",
            "@tanstack/react-query",
            "superjson",
            "@uploadthing/react",
            "uploadthing",
        ]);

        expect(Object.keys(devDependencies2)).toEqual([
            "drizzle-kit",
            "eslint-plugin-drizzle",
            "autoprefixer",
            "class-variance-authority",
            "clsx",
            "eslint-plugin-tailwindcss",
            "postcss",
            "prettier-plugin-tailwindcss",
            "tailwindcss-animate",
            "tailwind-merge",
            "tailwindcss",
            "@tanstack/react-query-devtools",
        ]);
    });
});
