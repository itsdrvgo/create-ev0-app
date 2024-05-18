const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        "eslint:recommended",
        "prettier",
        require.resolve("@vercel/style-guide/eslint/next"),
        "eslint-config-turbo",
        "plugin:tailwindcss/recommended",
    ],
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        node: true,
        browser: true,
    },
    plugins: ["only-warn", "tailwindcss", "unused-imports"],
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: [
        // Ignore dotfiles
        ".*.js",
        "node_modules/",
    ],
    rules: {
        semi: "error",
        "tailwindcss/no-custom-classname": "off",
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": "warn",
    },
    settings: {
        tailwindcss: {
            callees: ["cn"],
            config: "./tailwind.config.ts",
        },
        next: {
            rootDir: ["./src/"],
        },
        ignorePatterns: ["node_modules/", ".next/", "assets/", "public/"],
    },
    overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};
