// apps/web/app/(auth)/actions.ts
// SERVER ACTIONS FOR SIGN-UP, SIGN-IN, SIGN-OUT, PASSWORD RESET AND EMAIL-LINK CONFIRMATION.
// THEY RUN ONLY ON THE SERVER. NEXT.JS REJECTS CROSS-SITE CALLS (ORIGIN CHECK), AND SUPABASE AUTH
// APPLIES ITS OWN RATE LIMITS AND PASSWORD POLICY ON TOP OF THE CHECKS HERE.
"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { authErrorMessage, logAuthEvent } from "@/lib/auth/errors";
import type { FormState } from "@/lib/auth/form-state";
import {
  normalizeEmail,
  readField,
  safeNextPath,
  validateEmail,
  validatePasswordPair,
} from "@/lib/auth/validation";
import { getVerifiedUser, tryCreateSupabaseServerClient } from "@/lib/supabase/server";

const NOT_CONFIGURED: FormState = {
  status: "error",
  message: "Sign-in is not available right now. Please try again later.",
};

function client(): Promise<SupabaseClient | null> {
  return tryCreateSupabaseServerClient();
}

export async function signUpAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = normalizeEmail(readField(formData, "email"));
  const password = readField(formData, "password");
  const fieldErrors = validatePasswordPair(password, readField(formData, "confirmPassword"));
  const emailError = validateEmail(email);
  if (emailError) fieldErrors.email = emailError;
  if (Object.keys(fieldErrors).length > 0) return { status: "error", fieldErrors, email };

  const supabase = await client();
  if (!supabase) return { ...NOT_CONFIGURED, email };

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    logAuthEvent("sign-up", "error", error);
    // AN EXISTING ADDRESS GETS THE SAME "CHECK YOUR EMAIL" ANSWER, SO SIGN-UP CAN'T BE USED TO PROBE FOR ACCOUNTS.
    if (error.code === "user_already_exists" || error.code === "email_exists") {
      return { status: "success", email };
    }
    return { status: "error", message: authErrorMessage("sign-up", error), email };
  }
  logAuthEvent("sign-up", "ok");
  return { status: "success", email };
}

export async function signInAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = normalizeEmail(readField(formData, "email"));
  const password = readField(formData, "password");
  const next = safeNextPath(readField(formData, "next"));
  const emailError = validateEmail(email);
  if (emailError || !password) {
    return {
      status: "error",
      email,
      fieldErrors: {
        ...(emailError ? { email: emailError } : {}),
        ...(password ? {} : { password: "Enter your password." }),
      },
    };
  }

  const supabase = await client();
  if (!supabase) return { ...NOT_CONFIGURED, email };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    logAuthEvent("sign-in", "error", error);
    return { status: "error", message: authErrorMessage("sign-in", error), email };
  }
  logAuthEvent("sign-in", "ok");
  redirect(next);
}

export async function requestPasswordResetAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = normalizeEmail(readField(formData, "email"));
  const emailError = validateEmail(email);
  if (emailError) return { status: "error", fieldErrors: { email: emailError }, email };

  const supabase = await client();
  if (!supabase) return { ...NOT_CONFIGURED, email };

  // THE EMAIL TEMPLATE BUILDS THE LINK FROM THE PROJECT'S SITE URL, SO NO redirectTo IS PASSED.
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    logAuthEvent("reset-request", "error", error);
    if (error.code === "over_email_send_rate_limit" || error.code === "over_request_rate_limit") {
      return { status: "error", message: authErrorMessage("reset-request", error), email };
    }
  } else {
    logAuthEvent("reset-request", "ok");
  }
  // SAME ANSWER WHETHER OR NOT THE ACCOUNT EXISTS.
  return { status: "success", email };
}

export async function updatePasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const password = readField(formData, "password");
  const fieldErrors = validatePasswordPair(password, readField(formData, "confirmPassword"));
  if (Object.keys(fieldErrors).length > 0) return { status: "error", fieldErrors };

  const supabase = await client();
  if (!supabase) return NOT_CONFIGURED;

  const user = await getVerifiedUser(supabase);
  if (!user) {
    return {
      status: "error",
      message: authErrorMessage("update-password", { code: "session_not_found" }),
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    logAuthEvent("update-password", "error", error);
    return { status: "error", message: authErrorMessage("update-password", error) };
  }
  // END EVERY OTHER SESSION: IF SOMEONE ELSE HAD THE OLD PASSWORD, THEY ARE NOW SIGNED OUT.
  const { error: othersError } = await supabase.auth.signOut({ scope: "others" });
  if (othersError) logAuthEvent("update-password", "sign_out_others_failed", othersError);
  logAuthEvent("update-password", "ok");
  redirect("/workspace?password=updated");
}

const LINK_TYPES = new Set(["email", "recovery"] as const);
type LinkType = "email" | "recovery";

export async function confirmEmailLinkAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const tokenHash = readField(formData, "token_hash");
  const type = readField(formData, "type");
  if (!tokenHash || tokenHash.length > 512 || !LINK_TYPES.has(type as LinkType)) {
    return { status: "error", message: authErrorMessage("verify-link", null) };
  }

  const supabase = await client();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: type as LinkType,
  });
  if (error) {
    logAuthEvent("verify-link", "error", error);
    return { status: "error", message: authErrorMessage("verify-link", error) };
  }
  logAuthEvent("verify-link", "ok");
  redirect(type === "recovery" ? "/reset-password" : "/workspace?welcome=1");
}

export async function signOutAction(): Promise<void> {
  const supabase = await client();
  if (supabase) {
    // "local" SIGNS OUT THIS BROWSER ONLY. THE COOKIES ARE CLEARED EVEN IF THE SERVER CALL FAILS.
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) logAuthEvent("sign-out", "error", error);
    else logAuthEvent("sign-out", "ok");
  }
  redirect("/sign-in?signed_out=1");
}
