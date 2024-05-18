import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const DEFAULT_PROJECT_NAME = "ev0-app";
export const EV0 = "ev0";

export const INTRO_TITLE = "EV0 App CLI";
