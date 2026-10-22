// apps/web/app/page.tsx
// PUBLIC HOME PAGE. PRODUCT CONTENT ARRIVES WITH THE DESIGN WORK IN M8.
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="auth-page">
      <span className="wordmark">
        Explora<span className="wordmark-muted">Ai</span>
        <span className="wordmark-dot" aria-hidden="true" />
      </span>
      <section className="auth-card">
        <h1>
          Read papers. <span className="em-muted">Ask with sources.</span>
        </h1>
        <p className="auth-lede">An AI research workspace, in development.</p>
        <p className="auth-links">
          <Link href="/sign-in" className="button-primary">
            Sign in →
          </Link>
          <Link href="/sign-up">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
