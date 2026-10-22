// apps/web/vitest.config.ts
// UNIT TESTS RUN IN NODE. ONLY FILES NAMED *.test.ts / *.test.tsx ARE PICKED UP.
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // SAME "@/..." IMPORT ALIAS AS tsconfig.json.
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
