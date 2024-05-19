await Bun.build({
    entrypoints: ["src/index.ts"],
    target: "node",
    outdir: "dist",
    splitting: true,
    minify: true,
    format: "esm",
});
