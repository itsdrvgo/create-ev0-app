import { env } from "@/../env.mjs";
import { CResponse, handleError } from "@/lib/utils";
import {
    userDeleteSchema,
    userWebhookSchema,
    WebhookData,
    webhookSchema,
} from "@/lib/validation/webhook";
import { SvixHeaders } from "@/types";
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
                console.log(user);

                return CResponse({
                    message: "CREATED",
                });
            } catch (err) {
                return handleError(err);
            }
        }

        case "user.updated": {
            const user = userWebhookSchema.parse(data);
            console.log(user);

            return CResponse({
                message: "OK",
            });
        }

        case "user.deleted": {
            const { id } = userDeleteSchema.parse(data);
            console.log(id);

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
