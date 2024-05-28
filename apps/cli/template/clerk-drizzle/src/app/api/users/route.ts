import { env } from "@/../env.mjs";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { CResponse, handleError } from "@/lib/utils";
import {
    userDeleteSchema,
    userWebhookSchema,
    WebhookData,
    webhookSchema,
} from "@/lib/validation/webhook";
import { SvixHeaders } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
    const payload = await req.json();

    const headers: SvixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };

    const wh = new Webhook(env.SVIX_SECRET);
    let body: WebhookData;

    try {
        body = wh.verify(JSON.stringify(payload), headers) as WebhookData;
    } catch (err) {
        return CResponse({
            message: "BAD_REQUEST",
            longMessage: "Invalid webhook signature",
        });
    }

    const { type, data } = webhookSchema.parse(body);

    switch (type) {
        case "user.created": {
            try {
                const user = userWebhookSchema.parse(data);

                await db.insert(users).values({
                    id: user.id,
                    username: user.username,
                    email: user.email_addresses[0].email_address,
                });

                return CResponse({
                    message: "CREATED",
                });
            } catch (err) {
                return handleError(err);
            }
        }

        case "user.updated": {
            const user = userWebhookSchema.parse(data);

            await db
                .update(users)
                .set({
                    username: user.username,
                    email: user.email_addresses[0].email_address,
                })
                .where(eq(users.id, user.id));

            return CResponse({
                message: "OK",
            });
        }

        case "user.deleted": {
            const { id } = userDeleteSchema.parse(data);

            await db.delete(users).where(eq(users.id, id));

            return CResponse({
                message: "OK",
            });
        }

        default: {
            return CResponse({
                message: "UNKNOWN_ERROR",
            });
        }
    }
}
