// apps/web/app/api/health/route.test.ts
// BASIC TEST: THE HEALTH ROUTE RETURNS 200 WITH THE EXPECTED PAYLOAD AND IS NOT CACHED.
import { describe, expect, it } from "vitest";

import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns ok", async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ status: "ok", service: "web" });
  });
});
