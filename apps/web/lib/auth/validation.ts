// apps/web/lib/auth/validation.ts
// INPUT RULES FOR THE AUTH FORMS. PURE FUNCTIONS, SHARED BY SERVER ACTIONS AND TESTS.
// THE SAME PASSWORD RULE IS SET IN SUPABASE AUTH (supabase/config.toml), SO THE SERVER CHECKS IT TWICE.

export const PASSWORD_MIN_LENGTH = 10;
// SUPABASE HASHES PASSWORDS WITH BCRYPT, WHICH ONLY USES THE FIRST 72 BYTES.
export const PASSWORD_MAX_BYTES = 72;
const EMAIL_MAX_LENGTH = 254;
// DELIBERATELY SIMPLE: ONE "@", NO SPACES, A DOT IN THE DOMAIN. THE CONFIRMATION EMAIL IS THE REAL CHECK.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors = Partial<Record<"email" | "password" | "confirmPassword", string>>;

export function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateEmail(email: string): string | undefined {
  if (!email) return "Enter your email address.";
  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }
  return undefined;
}

export function validateNewPassword(password: string): string | undefined {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
  }
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) {
    return "Use a shorter password (at most 72 bytes).";
  }
  if (!/\p{L}/u.test(password) || !/\p{Nd}/u.test(password)) {
    return "Use both letters and numbers.";
  }
  return undefined;
}

export function validatePasswordPair(password: string, confirmPassword: string): FieldErrors {
  const errors: FieldErrors = {};
  const passwordError = validateNewPassword(password);
  if (passwordError) errors.password = passwordError;
  if (password !== confirmPassword) errors.confirmPassword = "The passwords don't match.";
  return errors;
}

// AFTER SIGN-IN WE SEND THE USER BACK TO WHERE THEY WERE GOING. ONLY SAME-SITE PATHS ARE ALLOWED,
// SO A CRAFTED LINK CAN'T BOUNCE A FRESHLY SIGNED-IN USER TO ANOTHER WEBSITE (OPEN REDIRECT).
export const DEFAULT_AFTER_SIGN_IN = "/workspace";

export function safeNextPath(raw: string | null | undefined): string {
  if (!raw || raw.length > 512) return DEFAULT_AFTER_SIGN_IN;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) {
    return DEFAULT_AFTER_SIGN_IN;
  }
  // BLOCK CONTROL CHARACTERS AND BACKSLASHES THAT SOME BROWSERS TREAT AS "/".
  if (/[\u0000-\u001f\u007f\\]/.test(raw)) return DEFAULT_AFTER_SIGN_IN;
  try {
    const url = new URL(raw, "https://exploraai.invalid");
    if (url.origin !== "https://exploraai.invalid") return DEFAULT_AFTER_SIGN_IN;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_AFTER_SIGN_IN;
  }
}
