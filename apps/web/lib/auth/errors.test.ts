// apps/web/lib/auth/errors.test.ts
import { describe, expect, it } from "vitest";

import { authErrorMessage } from "./errors";

describe("authErrorMessage", () => {
  it("gives one message for wrong email and wrong password", () => {
    expect(authErrorMessage("sign-in", { code: "invalid_credentials" })).toBe(
      "Email or password is incorrect.",
    );
  });
  it("does not reveal existing accounts on sign-up or reset", () => {
    for (const code of ["user_already_exists", "email_exists", "user_not_found"]) {
      expect(authErrorMessage("sign-up", { code })).toBe("Something went wrong. Please try again.");
      expect(authErrorMessage("reset-request", { code })).toBe(
        "Something went wrong. Please try again.",
      );
    }
  });
  it("explains rate limits", () => {
    expect(authErrorMessage("sign-in", { code: "over_request_rate_limit" })).toMatch(/wait/);
  });
  it("treats any link failure the same way", () => {
    expect(authErrorMessage("verify-link", { code: "otp_expired" })).toMatch(/new one/);
    expect(authErrorMessage("verify-link", null)).toMatch(/new one/);
  });
});
