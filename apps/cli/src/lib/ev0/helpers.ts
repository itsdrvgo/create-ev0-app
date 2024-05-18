import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import pkg from "@/../package.json";
import { INTRO_TITLE, PKG_ROOT } from "@/config/const";
import {
    CLERK_SECRET_KEY,
    generateDbUrlEnv,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET,
} from "@/config/envs";
import { PACKAGES } from "@/config/packages";
import type { Dependency, PACKAGE_MANAGERS } from "@/types";
import { execa } from "execa";
import gs from "gradient-string";
import type { AnswerData } from "../validation/answer";

export function showIntro() {
    console.log("");
    console.log(gs("red", "blue")(INTRO_TITLE));
    console.log("- " + pkg.version);
    console.log("");
}

export function getSrc(route: string) {
    return path.join(PKG_ROOT, route);
}

export async function insertBaseFiles(dest: string) {
    const src = getSrc("template/base");
    await copyDir(src, dest);
}

export async function copyDir(src: string, dest: string) {
    await fs.promises.mkdir(dest, { recursive: true });

    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) await copyDir(srcPath, destPath);
        else {
            const content = await fs.promises.readFile(srcPath);
            await fs.promises.writeFile(destPath, content);
        }
    }
}

export async function generateEnvs({
    auth,
    db,
    features,
}: {
    auth: AnswerData["auth"];
    db: AnswerData["db"];
    features: AnswerData["features"];
}) {
    let envs = {};

    if (auth === "clerk")
        envs = {
            ...envs,
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
            CLERK_SECRET_KEY,
        };
    else if (auth === "supabase")
        envs = {
            ...envs,
            ...generateDbUrlEnv("supabase"),
        };

    if (db === "planetscale")
        envs = {
            ...envs,
            ...generateDbUrlEnv("planetscale"),
        };
    else if (db === "mongodb")
        envs = {
            ...envs,
            ...generateDbUrlEnv("mongodb"),
        };
    else if (db === "supabase")
        envs = {
            ...envs,
            ...generateDbUrlEnv("supabase"),
        };

    if (features.includes("uploadthing"))
        envs = {
            ...envs,
            UPLOADTHING_SECRET,
            UPLOADTHING_APP_ID,
        };

    return { keys: Object.keys(envs), envs };
}

export async function constructEnvs({
    auth,
    db,
    features,
    projectPath,
}: {
    auth: AnswerData["auth"];
    db: AnswerData["db"];
    features: AnswerData["features"];
    projectPath: string;
}) {
    const { envs } = await generateEnvs({ auth, db, features });

    await constructEnvDotMjs(envs, projectPath);
    await constructEnvDotLocal(envs, projectPath);
}

export async function constructEnvDotLocal(
    envs: Record<string, any>,
    projectPath: string
) {
    if (!Object.keys(envs).length) return;

    const envDotEnvContent = Object.entries(envs)
        .map(([key]) => `${key}=""`)
        .join("\n");

    const dest = path.join(projectPath, ".env.local");
    await fs.promises.writeFile(dest, envDotEnvContent).catch((e) => {
        console.error(e);
    });
}

export async function constructEnvDotMjs(
    envs: Record<string, any>,
    projectPath: string
) {
    if (!Object.keys(envs).length) return;

    const dest = path.join(projectPath, "env.mjs");

    const isClientEnvPresent = Object.keys(envs).some((key) =>
        key.startsWith("NEXT_PUBLIC")
    );

    const envDotMjsContent = `
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        ${Object.entries(envs)
            .filter(([key]) => !key.startsWith("NEXT_PUBLIC"))
            .map(([key, value]) => {
                return `${key}: ${value},`;
            })
            .join("\n")}
        NODE_ENV: z.enum(["development", "test", "production"]),
    },
    client: {
        ${
            isClientEnvPresent
                ? Object.entries(envs)
                      .filter(([key]) => key.startsWith("NEXT_PUBLIC"))
                      .map(([key, value]) => {
                          return `${key}: ${value},`;
                      })
                      .join("\n")
                : ""
        }
    },
    runtimeEnv: {
        ${Object.keys(envs)
            .map((key) => {
                return `${key}: process.env.${key},`;
            })
            .join("\n")}
        NODE_ENV: process.env.NODE_ENV,
    },
});
    `;

    await fs.promises
        .writeFile(dest, envDotMjsContent)
        .catch((e) => console.error(e));
}

export function generateBaseFiles({
    auth,
    db,
    features,
}: {
    auth: AnswerData["auth"];
    db: AnswerData["db"];
    features: AnswerData["features"];
}) {
    const foldersToCopy: string[] = [];
    const rawDeps: Dependency[] = [];
    const rawDevDeps: Dependency[] = [];

    switch (auth) {
        case "supabase":
            foldersToCopy.push("supabase-base");
            rawDeps.push(PACKAGES.SUPABASEAUTH.packages.dependencies);
            rawDevDeps.push(PACKAGES.SUPABASEAUTH.packages.devDependencies);
            break;
        case "clerk":
            foldersToCopy.push("clerk-auth");
            rawDeps.push(PACKAGES.CLERK.packages.dependencies);
            rawDevDeps.push(PACKAGES.CLERK.packages.devDependencies);
            break;
    }

    switch (db) {
        case "supabase":
            foldersToCopy.push("supabase-base", "supabase-db", "drizzle-base");
            rawDeps.push(PACKAGES.SUPABASEDB.packages.dependencies);
            rawDevDeps.push(PACKAGES.SUPABASEDB.packages.devDependencies);
            if (features.includes("tailwind")) foldersToCopy.push("tw-drizzle");
            break;
        case "planetscale":
            foldersToCopy.push("planetscale-db");
            rawDeps.push(PACKAGES.PLANETSCALEDB.packages.dependencies);
            rawDevDeps.push(PACKAGES.PLANETSCALEDB.packages.devDependencies);
            break;
        case "mongodb":
            foldersToCopy.push("mongodb-db");
            rawDeps.push(PACKAGES.MONGODB.packages.dependencies);
            rawDevDeps.push(PACKAGES.MONGODB.packages.devDependencies);
            break;
    }

    if (features.includes("tailwind") && features.includes("shadcn")) {
        foldersToCopy.push("tw-base", "tw-shadcn");
        rawDeps.push(PACKAGES.SHADCN.packages.dependencies);
        rawDevDeps.push(PACKAGES.SHADCN.packages.devDependencies);
    } else {
        if (features.includes("tailwind")) {
            foldersToCopy.push("tw-base");
            rawDeps.push(PACKAGES.TAILWIND.packages.dependencies);
            rawDevDeps.push(PACKAGES.TAILWIND.packages.devDependencies);
        }

        if (features.includes("shadcn")) {
            foldersToCopy.push("tw-shadcn");
            rawDeps.push(PACKAGES.SHADCN.packages.dependencies);
            rawDevDeps.push(PACKAGES.SHADCN.packages.devDependencies);
        }
    }

    if (features.includes("trpc")) {
        foldersToCopy.push("trpc-base");
        if (features.includes("shadcn")) foldersToCopy.push("trpc-tw-shadcn");
        if (auth === "supabase") foldersToCopy.push("supabase-auth-trpc");
        if (db === "supabase") foldersToCopy.push("supabase-db-trpc");

        rawDeps.push(PACKAGES.TRPC.packages.dependencies);
        rawDevDeps.push(PACKAGES.TRPC.packages.devDependencies);
    }

    if (features.includes("uploadthing")) {
        foldersToCopy.push("ut-base");
        rawDeps.push(PACKAGES.UPLOADTHING.packages.dependencies);
        rawDevDeps.push(PACKAGES.UPLOADTHING.packages.devDependencies);
    }

    const dependencies = rawDeps.reduce((acc, cur) => ({ ...acc, ...cur }), {});
    const devDependencies = rawDevDeps.reduce(
        (acc, cur) => ({ ...acc, ...cur }),
        {}
    );

    return { foldersToCopy, dependencies, devDependencies };
}

export async function writeDependencies({
    projectPath,
    dependencies,
    devDependencies,
}: {
    projectPath: string;
    dependencies: Dependency;
    devDependencies: Dependency;
}) {
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(
        await fs.promises.readFile(packageJsonPath, "utf-8")
    );

    packageJson.name = path.basename(projectPath);
    packageJson.dependencies = { ...packageJson.dependencies, ...dependencies };
    packageJson.dependencies = Object.keys(packageJson.dependencies)
        .sort()
        .reduce((acc: Dependency, key) => {
            acc[key] = packageJson.dependencies[key];
            return acc;
        }, {});

    packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...devDependencies,
    };
    packageJson.devDependencies = Object.keys(packageJson.devDependencies)
        .sort()
        .reduce((acc: Dependency, key) => {
            acc[key] = packageJson.devDependencies[key];
            return acc;
        }, {});

    await fs.promises.writeFile(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
    );

    return packageJson;
}

export async function insertUILib(foldersToCopy: string[], dest: string) {
    if (foldersToCopy.includes("tw-base")) {
        const src = getSrc("template/tw-base");
        await copyDir(src, dest);
    }

    if (foldersToCopy.includes("tw-shadcn")) {
        const src = getSrc("template/tw-shadcn");
        await copyDir(src, dest);
    }
}

export async function insertTRPC(foldersToCopy: string[], dest: string) {
    if (foldersToCopy.includes("trpc-base")) {
        const src = getSrc("template/trpc-base");
        await copyDir(src, dest);
    }

    if (foldersToCopy.includes("trpc-tw-shadcn")) {
        const src = getSrc("template/trpc-tw-shadcn");
        await copyDir(src, dest);
    }
}

export async function insertUploadThing(foldersToCopy: string[], dest: string) {
    if (foldersToCopy.includes("ut-base")) {
        const src = getSrc("template/ut-base");
        await copyDir(src, dest);
    }
}

export async function insertSupabase(foldersToCopy: string[], dest: string) {
    if (foldersToCopy.includes("supabase-base")) {
        const src = getSrc("template/supabase-base");
        await copyDir(src, dest);
    }

    if (foldersToCopy.includes("supabase-db")) {
        const src = getSrc("template/supabase-db");
        await copyDir(src, dest);
    }

    if (foldersToCopy.includes("supabase-auth-trpc")) {
        const src = getSrc("template/supabase-auth-trpc");
        await copyDir(src, dest);
    }

    if (foldersToCopy.includes("supabase-db-trpc")) {
        const src = getSrc("template/supabase-db-trpc");
        await copyDir(src, dest);
    }
}

export async function insertDrizzle(foldersToCopy: string[], dest: string) {
    if (foldersToCopy.includes("drizzle-base")) {
        const src = getSrc("template/drizzle-base");
        await copyDir(src, dest);
    }

    if (foldersToCopy.includes("tw-drizzle")) {
        const src = getSrc("template/tw-drizzle");
        await copyDir(src, dest);
    }
}

export function getPackageManager() {
    try {
        execSync("bun --version", { stdio: "ignore" });
        return "bun";
    } catch (e) {
        try {
            execSync("pnpm --version", { stdio: "ignore" });
            return "pnpm";
        } catch (e) {
            try {
                execSync("yarn --version", { stdio: "ignore" });
                return "yarn";
            } catch (e) {
                return "npm";
            }
        }
    }
}

export async function installDependencies({
    packageManager,
    projectPath,
}: {
    packageManager: PACKAGE_MANAGERS;
    projectPath: string;
}) {
    switch (packageManager) {
        case "npm":
            await execa(packageManager, ["install"], {
                cwd: projectPath,
                stderr: "inherit",
            });
            break;

        case "yarn":
            await execa(packageManager, ["install"], {
                cwd: projectPath,
                stdout: "pipe",
            });
            break;

        case "pnpm":
            await execa(packageManager, ["install"], {
                cwd: projectPath,
                stdout: "pipe",
            });
            break;

        case "bun":
            await execa(packageManager, ["install"], {
                cwd: projectPath,
                stdout: "inherit",
            });
            break;
    }
}

export function checkGit() {
    try {
        execSync("git --version", { stdio: "ignore" });
        return true;
    } catch (e) {
        return false;
    }
}

export async function initializeGit(projectPath: string) {
    const isGitInstalled = checkGit();
    if (!isGitInstalled)
        throw new Error("Git is not installed!", {
            cause: "GIT_NOT_INSTALLED",
        });

    await execa("git", ["init"], {
        cwd: projectPath,
        stdout: "ignore",
    });
}
