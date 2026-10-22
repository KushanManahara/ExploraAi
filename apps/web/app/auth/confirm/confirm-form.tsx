// apps/web/app/auth/confirm/confirm-form.tsx
"use client";

import { useActionState } from "react";

import { FormMessage, SubmitButton } from "@/components/auth/form-parts";
import { initialFormState } from "@/lib/auth/form-state";

import { confirmEmailLinkAction } from "../../(auth)/actions";

type Props = { tokenHash: string; type: "email" | "recovery" };

export function ConfirmForm({ tokenHash, type }: Props) {
  const [state, action, pending] = useActionState(confirmEmailLinkAction, initialFormState);
  return (
    <form action={action}>
      {state.message ? <FormMessage tone="error">{state.message}</FormMessage> : null}
      <input type="hidden" name="token_hash" value={tokenHash} />
      <input type="hidden" name="type" value={type} />
      <SubmitButton pending={pending}>
        {type === "recovery" ? "Continue to new password →" : "Confirm my email →"}
      </SubmitButton>
    </form>
  );
}
