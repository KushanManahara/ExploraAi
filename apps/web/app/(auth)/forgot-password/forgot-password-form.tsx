// apps/web/app/(auth)/forgot-password/forgot-password-form.tsx
"use client";

import { useActionState } from "react";

import { Field, FormMessage, SubmitButton } from "@/components/auth/form-parts";
import { initialFormState } from "@/lib/auth/form-state";

import { requestPasswordResetAction } from "../actions";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, initialFormState);
  if (state.status === "success") {
    return (
      <FormMessage tone="success">
        If an account uses <strong>{state.email}</strong>, we&apos;ve sent a link to reset the
        password. The link expires in 1 hour.
      </FormMessage>
    );
  }
  return (
    <form action={action} noValidate>
      {state.message ? <FormMessage tone="error">{state.message}</FormMessage> : null}
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        defaultValue={state.email}
        error={state.fieldErrors?.email}
      />
      <SubmitButton pending={pending}>Send reset link →</SubmitButton>
    </form>
  );
}
