// apps/web/lib/auth/validation.test.ts
import { describe, expect, it } from "vitest";

import {
  DEFAULT_AFTER_SIGN_IN,
  normalizeEmail,
  safeNextPath,
  validateEmail,
  validateNewPassword,
  validatePasswordPair,
} from "./validation";

describe("validateEmail", () => {
  it("accepts a normal address", () => {
    expect(validateEmail("person@example.com")).toBeUndefined();
  });
  it.each(["", "no-at-sign", "a@b", "a b@example.com", `${"x".repeat(250)}@example.com`])(
    "rejects %j",
    (email) => {
      expect(validateEmail(email)).toBeDefined();
    },
  );
  it("normalizes case and spaces", () => {
    expect(normalizeEmail("  Person@Example.COM ")).toBe("person@example.com");
  });
});

describe("validateNewPassword", () => {
  it("accepts 10+ characters with letters and digits", () => {
    expect(validateNewPassword("correcthorse9")).toBeUndefined();
  });
  it.each([
    ["too short", "abc123"],
    ["no digits", "onlyletterslong"],
    ["no letters", "12345678901"],
    ["over 72 bytes", `a1${"é".repeat(36)}`],
  ])("rejects %s", (_, password) => {
    expect(validateNewPassword(password)).toBeDefined();
  });
  it("flags a mismatched confirmation", () => {
    expect(validatePasswordPair("correcthorse9", "correcthorse8")).toEqual({
      confirmPassword: "The passwords don't match.",
    });
  });
});

describe("safeNextPath", () => {
  it.each([
    ["/workspace", "/workspace"],
    ["/workspace?paper=1#p2", "/workspace?paper=1#p2"],
  ])("keeps same-site path %j", (raw, expected) => {
    expect(safeNextPath(raw)).toBe(expected);
  });
  it.each([
    null,
    "",
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/%0d%0aSet-Cookie:x",
    "javascript:alert(1)",
    "workspace",
    "/a\\b",
    "/x\u0000",
    `/${"a".repeat(600)}`,
  ])("falls back for %j", (raw) => {
    const result = safeNextPath(raw);
    expect(result.startsWith("/")).toBe(true);
    expect(result.startsWith("//")).toBe(false);
    if (raw === null || !raw.startsWith("/%0d")) expect(result).toBe(DEFAULT_AFTER_SIGN_IN);
  });
});
