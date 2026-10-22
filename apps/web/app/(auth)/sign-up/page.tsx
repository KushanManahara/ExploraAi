// apps/web/app/(auth)/sign-up/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = { title: "Create account · ExploraAi" };

export default function SignUpPage() {
  return (
    <>
      <h1>Create your account</h1>
      <SignUpForm />
      <p className="auth-links">
        <span>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </span>
      </p>
    </>
  );
}
