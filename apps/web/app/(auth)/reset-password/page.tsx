// apps/web/app/(auth)/reset-password/page.tsx
// REACHED FROM A PASSWORD-RESET EMAIL. THE LINK SIGNS THE USER IN FIRST; WITHOUT THAT SESSION THEY ARE SENT BACK.
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getVerifiedUser, tryCreateSupabaseServerClient } from "@/lib/supabase/server";

import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = { title: "Choose a new password · ExploraAi" };

export default async function ResetPasswordPage() {
  const supabase = await tryCreateSupabaseServerClient();
  const user = supabase ? await getVerifiedUser(supabase) : null;
  if (!user) redirect("/forgot-password?expired=1");
  return (
    <>
      <h1>Choose a new password</h1>
      <p className="auth-lede">
        For <strong>{user.email}</strong>. Saving it signs you out on all other devices.
      </p>
      <ResetPasswordForm />
    </>
  );
}
