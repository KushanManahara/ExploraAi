// apps/web/lib/supabase/server.ts
// PER-REQUEST SUPABASE CLIENT FOR SERVER COMPONENTS, SERVER ACTIONS AND ROUTE HANDLERS.
// A NEW CLIENT IS CREATED FOR EVERY REQUEST; IT IS NEVER SHARED BETWEEN USERS.
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { getSupabaseConfig, sessionCookieOptions } from "./config";

export class AuthNotConfiguredError extends Error {
  constructor() {
    super("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set");
  }
}

export async function createSupabaseServerClient(): Promise<SupabaseClient> {
  // READ COOKIES FIRST: THIS MARKS THE PAGE AS PER-REQUEST, SO IT IS NEVER PRE-RENDERED AT BUILD TIME.
  const cookieStore = await cookies();
  const config = getSupabaseConfig();
  if (!config) throw new AuthNotConfiguredError();

  return createServerClient(config.url, config.publishableKey, {
    cookieOptions: sessionCookieOptions,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // SERVER COMPONENTS CAN'T SET COOKIES. THE PROXY REFRESHES THE SESSION ON EVERY REQUEST INSTEAD.
        }
      },
    },
  });
}

// FOR PAGES: RETURNS NULL (TREATED AS "SIGNED OUT") WHEN AUTH ISN'T CONFIGURED, INSTEAD OF CRASHING.
export async function tryCreateSupabaseServerClient(): Promise<SupabaseClient | null> {
  try {
    return await createSupabaseServerClient();
  } catch (error) {
    if (error instanceof AuthNotConfiguredError) {
      console.error(JSON.stringify({ event: "auth", outcome: "not_configured" }));
      return null;
    }
    throw error;
  }
}

export type VerifiedUser = { id: string; email: string | null };

// THE ONLY WAY PAGES SHOULD READ "WHO IS SIGNED IN". getClaims() VERIFIES THE ACCESS TOKEN'S
// SIGNATURE AGAINST THE PROJECT'S PUBLIC KEYS; THE RAW COOKIE IS NEVER TRUSTED ON ITS OWN.
export async function getVerifiedUser(supabase: SupabaseClient): Promise<VerifiedUser | null> {
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims || typeof claims.sub !== "string" || claims.role !== "authenticated") {
    return null;
  }
  if (claims.is_anonymous === true) return null;
  return { id: claims.sub, email: typeof claims.email === "string" ? claims.email : null };
}
