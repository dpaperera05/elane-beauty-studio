"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { validateDetails, type BookingDetails, type DetailErrors } from "./model";

type RequiredField = keyof DetailErrors;

const control =
  "mt-2 block w-full rounded-xl border bg-white px-4 text-base text-ink outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-burgundy focus:ring-1 focus:ring-burgundy";

/** A label, its control and the inline error under it. */
function Field({
  id,
  label,
  required = false,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="type-ui text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-burgundy">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="type-small mt-2 flex items-start gap-2 text-burgundy">
          <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Step 5: contact details. A field's error appears once it has been visited
 * and clears as soon as the value is valid.
 */
export function DetailsStep({
  details,
  onChange,
  onSubmit,
}: {
  details: BookingDetails;
  onChange: (details: BookingDetails) => void;
  /** Enter in a field; the flow decides whether it can move on. */
  onSubmit: () => void;
}) {
  // Fields that already hold a value (coming back to this step) count as visited.
  const [touched, setTouched] = useState<Record<RequiredField, boolean>>(() => ({
    name: details.name !== "",
    phone: details.phone !== "",
    email: details.email !== "",
  }));
  const errors = validateDetails(details);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    onSubmit();
  };

  const input = (field: RequiredField) => {
    const error = touched[field] ? errors[field] : undefined;
    return {
      error,
      props: {
        id: `booking-${field}`,
        name: field,
        required: true,
        value: details[field],
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `booking-${field}-error` : undefined,
        onChange: (event: { target: { value: string } }) =>
          onChange({ ...details, [field]: event.target.value }),
        onBlur: () => setTouched((current) => ({ ...current, [field]: true })),
        className: `${control} h-13 ${error ? "border-burgundy" : "border-line"}`,
      },
    };
  };

  const name = input("name");
  const phone = input("phone");
  const email = input("email");

  return (
    <form noValidate onSubmit={submit} className="max-w-[46rem]">
      <p className="type-small text-muted">
        Fields marked <span className="text-burgundy">*</span> are required.
      </p>

      <div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field
          id="booking-name"
          label="Full Name"
          required
          error={name.error}
          className="sm:col-span-2"
        >
          <input {...name.props} type="text" autoComplete="name" />
        </Field>

        <Field id="booking-phone" label="Phone Number" required error={phone.error}>
          <input {...phone.props} type="tel" inputMode="tel" autoComplete="tel" />
        </Field>

        <Field id="booking-email" label="Email" required error={email.error}>
          <input {...email.props} type="email" inputMode="email" autoComplete="email" />
        </Field>

        <Field id="booking-notes" label="Notes / Preferences" className="sm:col-span-2">
          <textarea
            id="booking-notes"
            name="notes"
            rows={4}
            value={details.notes}
            onChange={(event) => onChange({ ...details, notes: event.target.value })}
            placeholder="Allergies, hair history, anything you’d like your artist to know."
            className={`${control} resize-y border-line py-3 leading-relaxed`}
          />
        </Field>
      </div>

      {/* Lets Enter submit; the visible Continue button sits outside the form. */}
      <button type="submit" hidden />
    </form>
  );
}
