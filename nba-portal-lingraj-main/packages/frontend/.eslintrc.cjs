module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "@stylistic"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": "warn",
    "@stylistic/linebreak-style": ["error","unix"],
    "@stylistic/indent": ["warn", 2],
    "@stylistic/jsx-indent": ["warn", 2],
    "@stylistic/quotes": ["warn", "double"],
    "@stylistic/semi": ["warn", "never"],
  },
}
