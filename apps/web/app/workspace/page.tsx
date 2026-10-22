// apps/web/app/workspace/page.tsx
// FIRST PROTECTED PAGE. THE PROXY ALREADY REDIRECTS SIGNED-OUT VISITORS, BUT THE PAGE CHECKS AGAIN
// ITSELF (A PROXY MISCONFIGURATION MUST NEVER EXPOSE A USER'S WORKSPACE).
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { FormMessage } from "@/components/auth/form-parts";
import { apiGet } from "@/lib/api/server";
import { getVerifiedUser, tryCreateSupabaseServerClient } from "@/lib/supabase/server";

import { signOutAction } from "../(auth)/actions";

export const metadata: Metadata = { title: "Workspace · ExploraAi" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function WorkspacePage({ searchParams }: Props) {
  const supabase = await tryCreateSupabaseServerClient();
  const user = supabase ? await getVerifiedUser(supabase) : null;
  if (!supabase || !user) redirect("/sign-in?next=%2Fworkspace");

  const params = await searchParams;
  const api = await apiGet<{ user_id: string }>(supabase, "/me");
  const apiStatus = api.ok
    ? api.data.user_id === user.id
      ? "Connected. The API confirmed your identity."
      : "The API returned a different user. Please sign out and in again."
    : api.reason === "not_configured"
      ? "Not connected in this environment."
      : "Not reachable right now.";

  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <span className="wordmark">
          Explora<span className="wordmark-muted">Ai</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </span>
        <form action={signOutAction}>
          <button type="submit" className="button-soft">
            Sign out
          </button>
        </form>
      </header>
      {params.password === "updated" ? (
        <FormMessage tone="success">Password saved. Other devices were signed out.</FormMessage>
      ) : null}
      {params.welcome ? <FormMessage tone="success">Email confirmed. Welcome.</FormMessage> : null}
      <h1>
        Your workspace. <span className="em-muted">Papers arrive in M2.</span>
      </h1>
      <dl className="facts">
        <dt>Signed in as</dt>
        <dd>{user.email ?? "—"}</dd>
        <dt>API</dt>
        <dd>{apiStatus}</dd>
      </dl>
    </main>
  );
}
