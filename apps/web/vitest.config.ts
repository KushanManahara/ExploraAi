// apps/web/vitest.config.ts
// UNIT TESTS RUN IN NODE. ONLY FILES NAMED *.test.ts / *.test.tsx ARE PICKED UP.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
