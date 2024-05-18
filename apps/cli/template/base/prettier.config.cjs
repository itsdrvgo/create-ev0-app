/** @type {import("prettier").Config} */
module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
    ],
};
