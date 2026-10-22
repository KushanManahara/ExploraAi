// apps/web/components/auth/form-parts.tsx
// SMALL BUILDING BLOCKS SHARED BY THE AUTH FORMS: LABELLED FIELD, STATUS MESSAGE, SUBMIT BUTTON.
import type { ReactNode } from "react";

type FieldProps = {
  name: string;
  label: string;
  type: "email" | "password";
  autoComplete: string;
  error?: string | undefined;
  defaultValue?: string | undefined;
  hint?: string;
};

export function Field({ name, label, type, autoComplete, error, defaultValue, hint }: FieldProps) {
  const describedBy = [hint ? `${name}-hint` : null, error ? `${name}-error` : null]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...(type === "email" ? { inputMode: "email" as const, spellCheck: false } : {})}
      />
      {hint ? (
        <p id={`${name}-hint`} className="field-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormMessage({
  tone,
  children,
}: {
  tone: "error" | "success" | "info";
  children: ReactNode;
}) {
  return (
    <p
      className={`form-message form-message--${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button type="submit" className="button-primary" disabled={pending} aria-busy={pending}>
      {pending ? "Please wait…" : children}
    </button>
  );
}
