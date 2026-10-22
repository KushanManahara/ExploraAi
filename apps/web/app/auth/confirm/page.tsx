// apps/web/app/auth/confirm/page.tsx
// LANDING PAGE FOR CONFIRMATION AND PASSWORD-RESET EMAILS. THE ONE-TIME TOKEN IS ONLY USED WHEN THE
// PERSON PRESSES THE BUTTON (A POST), SO EMAIL SECURITY SCANNERS THAT PRE-OPEN LINKS CAN'T USE IT UP.
// next.config.ts SENDS "Referrer-Policy: no-referrer" FOR THIS PATH SO THE TOKEN NEVER LEAKS IN A REFERER.
import type { Metadata } from "next";
import Link from "next/link";

import { FormMessage } from "@/components/auth/form-parts";

import { ConfirmForm } from "./confirm-form";

export const metadata: Metadata = { title: "Confirm · ExploraAi", robots: { index: false } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ConfirmPage({ searchParams }: Props) {
  const params = await searchParams;
  const tokenHash = typeof params.token_hash === "string" ? params.token_hash : "";
  const type = params.type === "recovery" ? "recovery" : params.type === "email" ? "email" : null;

  return (
    <main className="auth-page">
      <Link href="/" className="wordmark" aria-label="ExploraAi home">
        Explora<span className="wordmark-muted">Ai</span>
        <span className="wordmark-dot" aria-hidden="true" />
      </Link>
      <section className="auth-card">
        {tokenHash && type ? (
          <>
            <h1>{type === "recovery" ? "Reset your password" : "Confirm your email"}</h1>
            <ConfirmForm tokenHash={tokenHash} type={type} />
          </>
        ) : (
          <>
            <h1>Link not valid</h1>
            <FormMessage tone="error">
              This link is incomplete. Open the latest email from us, or request a new link.
            </FormMessage>
            <p className="auth-links">
              <Link href="/sign-in">← Back to sign in</Link>
            </p>
          </>
        )}
      </section>
    </main>
  );
}
