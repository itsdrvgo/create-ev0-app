import { z } from "zod";
import { answerSchema } from "./answer";

export const installerSchema = z.object({
    name: answerSchema.shape.name,
    auth: answerSchema.shape.auth,
    db: answerSchema.shape.db,
    features: answerSchema.shape.features,
    git: answerSchema.shape.git,
    install: answerSchema.shape.install,
});

export type InstallerData = z.infer<typeof installerSchema>;
