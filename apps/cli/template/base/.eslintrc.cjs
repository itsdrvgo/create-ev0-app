/** @type {import("eslint").Linter.Config} */
const config = {
    plugins: ["unused-imports"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    root: true,
    extends: [
        "next/core-web-vitals",
        "prettier",
    ],
    rules: {
        semi: "error",
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": "warn",
    },
    settings: {
        next: {
            rootDir: ["./src/"],
        },
        ignorePatterns: [
            "node_modules/",
            ".next/",
            "assets/",
            "public/",
        ],
    },
};

module.exports = config;
