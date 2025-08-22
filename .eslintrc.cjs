module.exports = {
    root: true,
    env: { browser: true, es2021: true},
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: {jsx: true}},
    plugins: ["react", "@typescript-eslint", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    settings: {react:{version : "detect"}},
    rules: {
        "react/react-in-jsx-scope": "off"
    }
};