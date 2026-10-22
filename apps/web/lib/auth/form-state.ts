// apps/web/lib/auth/form-state.ts
// THE SHAPE EVERY AUTH SERVER ACTION RETURNS TO ITS FORM (USED WITH REACT'S useActionState).
import type { FieldErrors } from "./validation";

export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: FieldErrors;
  // ECHOED BACK SO THE USER DOESN'T RETYPE IT. PASSWORDS ARE NEVER ECHOED.
  email?: string;
};

export const initialFormState: FormState = { status: "idle" };
