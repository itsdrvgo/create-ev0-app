/** @type {import("eslint").Linter.Config} */
const config = {
    plugins: ["unused-imports"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    root: true,
    extends: ["prettier"],
    rules: {
        semi: "error",
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": "warn",
    },
    settings: {
        ignorePatterns: ["node_modules/", "assets/", "public/", "template/"],
    },
};

module.exports = config;
