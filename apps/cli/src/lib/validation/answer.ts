import { DEFAULT_PROJECT_NAME } from "@/config/const";
import { z } from "zod";

export const answerSchema = z.object({
    name: z
        .string()
        .min(1, "Name must be at least 1 character")
        .default(DEFAULT_PROJECT_NAME),
    auth: z.enum(["supabase", "clerk", "none"]).default("supabase"),
    db: z.enum(["supabase", "mongodb", "none"]).default("supabase"),
    features: z.array(z.enum(["trpc", "uploadthing"])).default([]),
    git: z.boolean().default(true),
    install: z.boolean().default(true),
});

export type AnswerData = z.infer<typeof answerSchema>;
