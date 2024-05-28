import { z } from "zod";
import { answerSchema } from "./answer";

export const flagsSchema = z
    .object({
        default: z.boolean().optional(),
        empty: z.boolean().optional(),
        name: answerSchema.shape.name.optional(),
        supabaseAuth: z.boolean().optional(),
        clerk: z.boolean().optional(),
        supabaseDb: z.boolean().optional(),
        mongodb: z.boolean().optional(),
        trpc: z.boolean().optional(),
        uploadthing: z.boolean().optional(),
    })
    .refine(
        (data) => !(data.supabaseAuth && data.clerk),
        "You can't use both Supabase and Clerk as authentication providers at the same time"
    )
    .refine(
        (data) => !(data.supabaseDb && data.mongodb),
        "You can't use both Supabase and MongoDB as database providers at the same time"
    );

export type FlagsData = z.infer<typeof flagsSchema>;
