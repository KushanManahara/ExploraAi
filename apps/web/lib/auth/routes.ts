// apps/web/lib/auth/routes.ts
// WHICH PAGES NEED A SIGNED-IN USER, AND WHERE TO SEND PEOPLE WHO ARE IN THE WRONG PLACE.
// USED BY THE PROXY. PAGES CHECK THE USER AGAIN THEMSELVES (DEFENCE IN DEPTH).

const PROTECTED_PREFIXES = ["/workspace"];
// SIGNED-IN USERS DON'T NEED THESE, SO THEY GO STRAIGHT TO THE WORKSPACE.
const SIGNED_OUT_ONLY = ["/sign-in", "/sign-up", "/forgot-password"];
// REACHED ONLY THROUGH A PASSWORD-RESET LINK, WHICH CREATES A SHORT SESSION FIRST.
const NEEDS_RECOVERY_SESSION = ["/reset-password"];

function matches(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export type RouteDecision = { redirectTo: string } | null;

export function decideRoute(pathname: string, search: string, signedIn: boolean): RouteDecision {
  if (!signedIn && matches(pathname, PROTECTED_PREFIXES)) {
    const next = encodeURIComponent(`${pathname}${search}`);
    return { redirectTo: `/sign-in?next=${next}` };
  }
  if (!signedIn && matches(pathname, NEEDS_RECOVERY_SESSION)) {
    return { redirectTo: "/forgot-password?expired=1" };
  }
  if (signedIn && matches(pathname, SIGNED_OUT_ONLY)) {
    return { redirectTo: "/workspace" };
  }
  return null;
}
