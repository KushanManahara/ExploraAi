// apps/web/lib/auth/errors.ts
// TURNS SUPABASE AUTH ERROR CODES INTO SHORT, SAFE MESSAGES. MESSAGES NEVER SAY WHETHER AN ACCOUNT EXISTS.

export type AuthAction =
  "sign-in" | "sign-up" | "sign-out" | "reset-request" | "update-password" | "verify-link";

type AuthErrorLike = { code?: string | undefined; status?: number | undefined } | null | undefined;

const GENERIC = "Something went wrong. Please try again.";

export function authErrorMessage(action: AuthAction, error: AuthErrorLike): string {
  const code = error?.code;
  switch (code) {
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "weak_password":
      return "That password is too weak. Use at least 10 characters with letters and numbers.";
    case "request_timeout":
      return "The sign-in service is slow right now. Please try again.";
    default:
      break;
  }
  switch (action) {
    case "sign-in":
      if (code === "invalid_credentials") return "Email or password is incorrect.";
      // ONLY RETURNED AFTER A CORRECT PASSWORD, SO IT DOESN'T HELP ANYONE GUESS ACCOUNTS.
      if (code === "email_not_confirmed") {
        return "Please confirm your email first. Check your inbox for the link.";
      }
      return GENERIC;
    case "update-password":
      if (code === "same_password") return "Choose a password you haven't used for this account.";
      if (code === "reauthentication_needed" || code === "session_not_found") {
        return "For your security, request a new password-reset link and try again.";
      }
      return GENERIC;
    case "verify-link":
      return "This link is invalid, already used or expired. Please request a new one.";
    case "sign-up":
    case "sign-out":
    case "reset-request":
      return GENERIC;
  }
}

// SERVER-SIDE LOG LINE. RECORDS THE ACTION AND ERROR CODE ONLY: NEVER EMAILS, PASSWORDS OR TOKENS.
export function logAuthEvent(action: AuthAction, outcome: string, error?: AuthErrorLike): void {
  const entry = { event: "auth", action, outcome, code: error?.code, status: error?.status };
  if (outcome === "ok") console.info(JSON.stringify(entry));
  else console.warn(JSON.stringify(entry));
}
