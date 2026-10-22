// apps/web/app/(auth)/forgot-password/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { FormMessage } from "@/components/auth/form-parts";

import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = { title: "Reset password · ExploraAi" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const { expired } = await searchParams;
  return (
    <>
      <h1>Reset your password</h1>
      {expired ? (
        <FormMessage tone="info">
          Your reset session has ended. Request a new link below.
        </FormMessage>
      ) : null}
      <ForgotPasswordForm />
      <p className="auth-links">
        <Link href="/sign-in">← Back to sign in</Link>
      </p>
    </>
  );
}
