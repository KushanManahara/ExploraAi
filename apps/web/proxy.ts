// apps/web/proxy.ts
// RUNS BEFORE EVERY PAGE REQUEST (NEXT.JS 16 "PROXY", FORMERLY MIDDLEWARE):
//   1. REFRESHES THE SUPABASE SESSION AND WRITES UPDATED COOKIES TO THE RESPONSE;
//   2. REDIRECTS VISITORS WHO ARE IN THE WRONG PLACE (SEE lib/auth/routes.ts).
// THIS IS A CONVENIENCE GATE ONLY. PROTECTED PAGES AND THE API VERIFY THE USER AGAIN.
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { decideRoute } from "@/lib/auth/routes";
import { getSupabaseConfig, sessionCookieOptions } from "@/lib/supabase/config";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const config = getSupabaseConfig();
  let response = NextResponse.next({ request });
  let signedIn = false;

  if (config) {
    const supabase = createServerClient(config.url, config.publishableKey, {
      cookieOptions: sessionCookieOptions,
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          // NO-CACHE HEADERS FROM THE LIBRARY: A CDN MUST NEVER SERVE ONE USER'S SESSION COOKIE TO ANOTHER.
          for (const [key, value] of Object.entries(headers ?? {})) {
            response.headers.set(key, value);
          }
        },
      },
    });
    // VERIFIES THE ACCESS TOKEN (AND REFRESHES IT WHEN EXPIRED). DO NOT ADD CODE BETWEEN CLIENT CREATION AND THIS CALL.
    const { data } = await supabase.auth.getClaims();
    signedIn = Boolean(data?.claims?.sub) && data?.claims?.is_anonymous !== true;
  }

  const decision = decideRoute(request.nextUrl.pathname, request.nextUrl.search, signedIn);
  if (!decision) return response;

  const redirect = NextResponse.redirect(new URL(decision.redirectTo, request.url));
  // CARRY ANY REFRESHED OR CLEARED SESSION COOKIES OVER TO THE REDIRECT.
  for (const cookie of response.cookies.getAll()) redirect.cookies.set(cookie);
  redirect.headers.set("Cache-Control", "private, no-store");
  return redirect;
}

export const config = {
  // SKIP STATIC FILES, IMAGES AND THE HEALTH CHECK.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/health|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
