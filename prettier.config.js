/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  endOfLine: "auto",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};
