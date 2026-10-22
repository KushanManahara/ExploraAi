// apps/web/app/(auth)/sign-in/sign-in-form.tsx
"use client";

import { useActionState } from "react";

import { Field, FormMessage, SubmitButton } from "@/components/auth/form-parts";
import { initialFormState } from "@/lib/auth/form-state";

import { signInAction } from "../actions";

export function SignInForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signInAction, initialFormState);
  return (
    <form action={action} noValidate>
      {state.message ? <FormMessage tone="error">{state.message}</FormMessage> : null}
      <input type="hidden" name="next" value={next} />
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
        autoComplete="current-password"
        error={state.fieldErrors?.password}
      />
      <SubmitButton pending={pending}>Sign in →</SubmitButton>
    </form>
  );
}
