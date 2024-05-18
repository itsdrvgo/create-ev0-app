import { createRouteHandler } from "uploadthing/next";
import { customFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
    router: customFileRouter,
});
