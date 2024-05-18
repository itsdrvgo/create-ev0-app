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
        "./package.json",
    ],
});
