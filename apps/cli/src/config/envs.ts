import type { AnswerData } from "@/lib/validation/answer";

export function generateDbUrlEnv(db: AnswerData["db"]) {
    return db !== "none"
        ? {
              DATABASE_URL: `z
            .string()
            .url()
            .regex(
                ${db === "supabase" ? /postgres/ : /mongodb/}
            )
`,
          }
        : {};
}

export const UPLOADTHING_SECRET = `z
        .string()
        .min(1, "Missing UPLOADTHING_SECRET")
        .regex(/^sk_/)
`;

export const UPLOADTHING_APP_ID = `z
        .string()
        .min(1, "Missing UPLOADTHING_APP_ID")
`;

export const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = `z
        .string()
        .min(1, "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY")
`;

export const CLERK_SECRET_KEY = `z.string().min(1, "Missing CLERK_SECRET_KEY")
`;

export const SVIX_SECRET = `z
        .string()
        .min(1, "Missing SVIX_SECRET")
        .regex(/^whsec_/)
`;
