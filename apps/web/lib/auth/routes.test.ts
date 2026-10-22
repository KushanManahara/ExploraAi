// apps/web/lib/auth/routes.test.ts
import { describe, expect, it } from "vitest";

import { decideRoute } from "./routes";

describe("decideRoute", () => {
  it("sends signed-out visitors from the workspace to sign-in, keeping the destination", () => {
    expect(decideRoute("/workspace/papers", "?id=1", false)).toEqual({
      redirectTo: "/sign-in?next=%2Fworkspace%2Fpapers%3Fid%3D1",
    });
  });
  it("does not treat look-alike paths as protected", () => {
    expect(decideRoute("/workspaces-info", "", false)).toBeNull();
  });
  it("lets signed-in users into the workspace", () => {
    expect(decideRoute("/workspace", "", true)).toBeNull();
  });
  it("moves signed-in users away from sign-in and sign-up", () => {
    expect(decideRoute("/sign-in", "", true)).toEqual({ redirectTo: "/workspace" });
    expect(decideRoute("/sign-up", "", true)).toEqual({ redirectTo: "/workspace" });
  });
  it("requires a recovery session for the reset page", () => {
    expect(decideRoute("/reset-password", "", false)).toEqual({
      redirectTo: "/forgot-password?expired=1",
    });
    expect(decideRoute("/reset-password", "", true)).toBeNull();
  });
  it("leaves public pages alone", () => {
    expect(decideRoute("/", "", false)).toBeNull();
    expect(decideRoute("/auth/confirm", "?token_hash=x", false)).toBeNull();
  });
});
