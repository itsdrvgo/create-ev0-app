import { z, ZodType } from "zod";

export const responseMessages = z.union([
    z.literal("OK"),
    z.literal("ERROR"),
    z.literal("UNAUTHORIZED"),
    z.literal("FORBIDDEN"),
    z.literal("NOT_FOUND"),
    z.literal("BAD_REQUEST"),
    z.literal("TOO_MANY_REQUESTS"),
    z.literal("INTERNAL_SERVER_ERROR"),
    z.literal("SERVICE_UNAVAILABLE"),
    z.literal("GATEWAY_TIMEOUT"),
    z.literal("UNKNOWN_ERROR"),
    z.literal("UNPROCESSABLE_ENTITY"),
    z.literal("NOT_IMPLEMENTED"),
    z.literal("CREATED"),
    z.literal("BAD_GATEWAY"),
]);

const responseSchema = <DataType extends z.ZodTypeAny>(dataType: DataType) =>
    z.object({
        code: z.number(),
        message: responseMessages,
        longMessage: z.string().optional(),
        data: dataType.optional(),
    });

export type ResponseMessages = z.infer<typeof responseMessages>;
type ResponseType<DataType extends z.ZodTypeAny> = ReturnType<
    typeof responseSchema<DataType>
>;
export type ResponseData<T> = z.infer<ResponseType<ZodType<T>>>;
