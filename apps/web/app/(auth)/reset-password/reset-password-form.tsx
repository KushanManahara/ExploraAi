// apps/web/app/(auth)/reset-password/reset-password-form.tsx
"use client";

import { useActionState } from "react";

import { Field, FormMessage, SubmitButton } from "@/components/auth/form-parts";
import { initialFormState } from "@/lib/auth/form-state";
import { PASSWORD_MIN_LENGTH } from "@/lib/auth/validation";

import { updatePasswordAction } from "../actions";

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(updatePasswordAction, initialFormState);
  return (
    <form action={action} noValidate>
      {state.message ? <FormMessage tone="error">{state.message}</FormMessage> : null}
      <Field
        name="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        hint={`At least ${PASSWORD_MIN_LENGTH} characters, with letters and numbers.`}
        error={state.fieldErrors?.password}
      />
      <Field
        name="confirmPassword"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        error={state.fieldErrors?.confirmPassword}
      />
      <SubmitButton pending={pending}>Save new password →</SubmitButton>
    </form>
  );
}
