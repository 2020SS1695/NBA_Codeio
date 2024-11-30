module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint", "@stylistic"
    ],
    "rules": {
        "no-console": "warn",
        "@stylistic/indent": ["warn",4],
        "@stylistic/linebreak-style": ["error","unix"],
        "@stylistic/quotes": ["warn","double"],
        "@stylistic/semi": ["warn", "never"]
    }
}