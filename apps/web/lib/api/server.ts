// apps/web/lib/api/server.ts
// CALLS THE EXPLORAAI API FROM THE WEB SERVER ON BEHALF OF THE SIGNED-IN USER.
// THE USER'S SUPABASE ACCESS TOKEN IS SENT AS A BEARER TOKEN; THE API VERIFIES IT AND SCOPES
// EVERY RESULT TO THAT USER. THE TOKEN NEVER REACHES BROWSER JAVASCRIPT.
import type { SupabaseClient } from "@supabase/supabase-js";

const TIMEOUT_MS = 8000;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "not_configured" | "signed_out" | "unavailable" | "rejected" };

export function getApiBaseUrl(): string | null {
  const raw = process.env.EXPLORAAI_API_URL?.trim().replace(/\/+$/, "");
  return raw ? raw : null;
}

export async function apiGet<T>(supabase: SupabaseClient, path: string): Promise<ApiResult<T>> {
  const base = getApiBaseUrl();
  if (!base) return { ok: false, reason: "not_configured" };

  // CALLERS VERIFY THE USER WITH getVerifiedUser() FIRST. THE TOKEN IS THEN READ FROM THE SESSION
  // ONLY TO FORWARD IT; THE API CHECKS ITS SIGNATURE, ISSUER, AUDIENCE AND EXPIRY INDEPENDENTLY.
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return { ok: false, reason: "signed_out" };

  try {
    const response = await fetch(`${base}${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.status === 401 || response.status === 403)
      return { ok: false, reason: "rejected" };
    if (!response.ok) return { ok: false, reason: "unavailable" };
    return { ok: true, data: (await response.json()) as T };
  } catch (error) {
    console.warn(
      JSON.stringify({ event: "api_call", path, outcome: "error", error: String(error) }),
    );
    return { ok: false, reason: "unavailable" };
  }
}
