// apps/web/app/(auth)/layout.tsx
// SHARED FRAME FOR THE SIGN-IN, SIGN-UP AND PASSWORD PAGES: WORDMARK + ONE CENTRED CARD.
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <Link href="/" className="wordmark" aria-label="ExploraAi home">
        Explora<span className="wordmark-muted">Ai</span>
        <span className="wordmark-dot" aria-hidden="true" />
      </Link>
      <section className="auth-card">{children}</section>
    </main>
  );
}
