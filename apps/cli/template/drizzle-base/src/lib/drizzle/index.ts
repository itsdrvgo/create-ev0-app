import { env } from "@/../env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as Schema from "./schema";

const connection = postgres(env.DATABASE_URL, {
    prepare: false,
});

export const db = drizzle(connection, { schema: Schema });
