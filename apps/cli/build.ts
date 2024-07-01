import fs from "fs";
import path from "path";

await Bun.build({
    entrypoints: ["src/index.ts"],
    target: "node",
    outdir: "dist",
    splitting: true,
    minify: true,
    format: "esm",
    external: [
        "commander",
        "execa",
        "gradient-string",
        "inquirer",
        "loading-cli",
        "zod",
    ],
});

const shebang = "#!/usr/bin/env node\n";
const distPath = path.join(__dirname, "dist/index.js");

const isFilePresent = await fs.promises.exists(distPath);
if (isFilePresent) {
    const data = await fs.promises.readFile(distPath, "utf-8");
    if (!data.startsWith(shebang)) {
        await fs.promises.writeFile(distPath, shebang + data);
    }
}
