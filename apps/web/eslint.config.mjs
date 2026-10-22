// apps/web/eslint.config.mjs
// ESLINT FLAT CONFIG: NEXT.JS CORE WEB VITALS + TYPESCRIPT RULES. GENERATED OUTPUT IS IGNORED.
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypeScript,
  {
    ignores: [".next/**", "out/**", "coverage/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default config;
