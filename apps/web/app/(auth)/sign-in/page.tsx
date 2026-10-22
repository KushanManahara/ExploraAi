// apps/web/app/(auth)/sign-in/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { FormMessage } from "@/components/auth/form-parts";
import { safeNextPath } from "@/lib/auth/validation";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign in · ExploraAi" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({ searchParams }: Props) {
  const params = await searchParams;
  const next = safeNextPath(first(params.next));
  return (
    <>
      <h1>Sign in</h1>
      {first(params.signed_out) ? (
        <FormMessage tone="info">You&apos;re signed out.</FormMessage>
      ) : null}
      <SignInForm next={next} />
      <p className="auth-links">
        <Link href="/forgot-password">Forgot your password?</Link>
        <span>
          New here? <Link href="/sign-up">Create an account</Link>
        </span>
      </p>
    </>
  );
}
