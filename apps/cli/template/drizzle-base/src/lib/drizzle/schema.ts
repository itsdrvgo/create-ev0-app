import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// SCHEMAS

export const users = pgTable(
    "users",
    {
        id: text("id").notNull().unique().primaryKey(),
        username: text("username").notNull().unique(),
        email: text("email").notNull().unique(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (table) => {
        return {
            usernameIdx: uniqueIndex("username_idx").on(table.username),
            emailIdx: uniqueIndex("email_idx").on(table.email),
        };
    }
);

// TYPES

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// ZOD SCHEMA

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
