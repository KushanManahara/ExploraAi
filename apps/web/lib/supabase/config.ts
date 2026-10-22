// apps/web/lib/supabase/config.ts
// SUPABASE SETTINGS FOR THE WEB SERVER. ALL AUTH CALLS RUN ON THE SERVER (SERVER ACTIONS, PROXY),
// SO NOTHING HERE IS SHIPPED TO THE BROWSER AND NO NEXT_PUBLIC_ PREFIX IS NEEDED.
import type { CookieOptionsWithName } from "@supabase/ssr";

export type SupabaseConfig = { url: string; publishableKey: string };

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

// SESSION COOKIES: THE BROWSER NEVER NEEDS TO READ THEM (NO BROWSER-SIDE SUPABASE CLIENT),
// SO THEY ARE HTTP-ONLY. THIS KEEPS TOKENS AWAY FROM ANY INJECTED SCRIPT.
export const sessionCookieOptions: CookieOptionsWithName = {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
