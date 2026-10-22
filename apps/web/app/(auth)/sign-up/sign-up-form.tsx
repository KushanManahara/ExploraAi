// apps/web/app/(auth)/sign-up/sign-up-form.tsx
"use client";

import { useActionState } from "react";

import { Field, FormMessage, SubmitButton } from "@/components/auth/form-parts";
import { initialFormState } from "@/lib/auth/form-state";
import { PASSWORD_MIN_LENGTH } from "@/lib/auth/validation";

import { signUpAction } from "../actions";

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUpAction, initialFormState);
  if (state.status === "success") {
    return (
      <FormMessage tone="success">
        Check your inbox. If <strong>{state.email}</strong> can be used, we&apos;ve sent a link to
        confirm it. The link expires in 1 hour.
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
      <Field
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint={`At least ${PASSWORD_MIN_LENGTH} characters, with letters and numbers.`}
        error={state.fieldErrors?.password}
      />
      <Field
        name="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        error={state.fieldErrors?.confirmPassword}
      />
      <SubmitButton pending={pending}>Create account →</SubmitButton>
    </form>
  );
}
