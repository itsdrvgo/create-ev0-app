import { PackageManager } from "@/config/const";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getAbsoluteURL(path: string = "/") {
    if (process.env.VERCEL_URL) return "https://ev0.vercel.app" + path;
    return "http://localhost:" + (process.env.PORT ?? 3000) + path;
}

export async function cFetch<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<T> {
    const response = await fetch(input, init);
    const data = await response.json();
    return data;
}

export function convertNumberToShortForm(count: number) {
    const suffixes = ["", "K", "M", "B", "T"];
    let i = 0;

    while (count >= 1000) {
        count /= 1000;
        i++;
    }

    return `${Math.round(count)}${suffixes[i]}`;
}

export function generateInitCommand(packageManager: PackageManager) {
    const command = "create-ev0-app@latest init";

    switch (packageManager) {
        case PackageManager.BUN:
            return `bunx --bun ${command}`;
        case PackageManager.NPM:
            return `npx ${command}`;
        case PackageManager.Yarn:
            return `yarn create ${command}`;
        case PackageManager.PNPM:
            return `pnpx ${command}`;
    }
}
