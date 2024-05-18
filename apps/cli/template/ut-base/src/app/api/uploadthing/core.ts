import { createUploadthing, UTApi } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();
export const utapi = new UTApi();

export const customFileRouter = {
    thumbnail: f({
        "image/jpeg": {
            maxFileCount: 1,
            maxFileSize: "2MB",
        },
        "image/png": {
            maxFileCount: 1,
            maxFileSize: "2MB",
        },
    })
        .input(
            z.object({
                uploaderId: z.string(),
            })
        )
        .middleware(({ input }) => {
            const { uploaderId } = input;
            return {
                uploaderId,
            };
        })
        .onUploadComplete(() => {}),
};

export type CustomFileRouter = typeof customFileRouter;
