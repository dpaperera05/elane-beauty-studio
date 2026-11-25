"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Check, ChevronDown, CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { contactForm, enquiryTypes } from "@/content/contact";
import { Button } from "../ui/Button";

type Values = { name: string; email: string; phone: string; type: string; message: string };
type FieldName = keyof Values;
type Errors = Partial<Record<FieldName, string>>;

const empty: Values = { name: "", email: "", phone: "", type: "", message: "" };
const fieldOrder: FieldName[] = ["name", "email", "phone", "type", "message"];
const untouched = Object.fromEntries(fieldOrder.map((field) => [field, false])) as Record<
  FieldName,
  boolean
>;

/** Phone is optional, but checked when given. The rules match the booking form's. */
function validate({ name, email, phone, type, message }: Values): Errors {
  const errors: Errors = {};

  if (name.trim().length < 2) errors.name = "Enter your full name.";

  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
    errors.email = "Enter a valid email address, e.g. name@example.com.";

  const digits = phone.replace(/\D/g, "");
  if (phone.trim() && (!/^\+?[\d\s()-]+$/.test(phone.trim()) || digits.length < 9 || digits.length > 15))
    errors.phone = "Enter a valid phone number, e.g. 077 123 4567.";

  if (!type) errors.type = "Choose an enquiry type.";

  if (!message.trim()) errors.message = "Enter your message.";
  else if (message.trim().length < 10) errors.message = "Add a little more detail (at least 10 characters).";

  return errors;
}

// The booking form's control style, so the two forms look alike.
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

const ease = [0.2, 0.8, 0.2, 1] as const;

/**
 * The enquiry form as a centred ivory card: name, email, phone (optional),
 * enquiry type and message. Nothing is sent anywhere; a valid submit swaps the
 * form for a thank-you inside the same card. A field's error appears once it
 * has been visited and clears as soon as the value is valid; submitting with
 * errors shows them all and moves focus to the first. "Send another" keeps the
 * contact details and clears the enquiry.
 */
export function ContactForm({ className = "" }: { className?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState(untouched);
  const [sent, setSent] = useState(false);
  const errors = validate(values);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const firstInvalid = fieldOrder.find((field) => errors[field]);
    if (firstInvalid) {
      setTouched(Object.fromEntries(fieldOrder.map((field) => [field, true])) as typeof touched);
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }
    setSent(true);
  };

  const sendAnother = () => {
    setValues((current) => ({ ...current, type: "", message: "" }));
    setTouched(untouched);
    setSent(false);
  };

  const bind = (field: FieldName, sizing: string) => {
    const error = touched[field] ? errors[field] : undefined;
    return {
      error,
      props: {
        id: `contact-${field}`,
        name: field,
        value: values[field],
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `contact-${field}-error` : undefined,
        onChange: (event: { target: { value: string } }) =>
          setValues((current) => ({ ...current, [field]: event.target.value })),
        onBlur: () => setTouched((current) => ({ ...current, [field]: true })),
        className: `${control} ${sizing} ${error ? "border-burgundy" : "border-line"}`,
      },
    };
  };

  const name = bind("name", "h-13");
  const email = bind("email", "h-13");
  const phone = bind("phone", "h-13");
  const type = bind("type", `h-13 appearance-none pr-11 ${values.type ? "" : "text-muted"}`);
  const message = bind("message", "resize-y py-3 leading-relaxed");
  const { fields } = contactForm;

  return (
    <section
      id="message"
      aria-labelledby="message-title"
      className={`mx-auto w-full max-w-190 rounded-[1.75rem] border border-line/60 bg-ivory-light px-5 py-10 sm:px-12 sm:py-14 md:px-16 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="success"
            // Takes focus as it mounts (after the form has faded out), so
            // keyboard and screen-reader users land on the confirmation.
            ref={(element) => element?.focus({ preventScroll: true })}
            role="status"
            tabIndex={-1}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col items-center py-6 text-center outline-none"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-burgundy text-ivory">
              <Check aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </span>
            <h2 id="message-title" className="type-h3 mt-6 font-medium text-ink">
              {contactForm.success.title}
            </h2>
            <p className="type-lead mt-3 max-w-120 text-ink">{contactForm.success.body}</p>
            <div className="mt-8">
              <Button variant="secondary" onClick={sendAnother}>
                {contactForm.success.again}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <h2 id="message-title" className="type-h3 font-medium text-ink">
              {contactForm.title}
            </h2>
            <p className="type-small mt-2 text-muted">
              Fields marked <span className="text-burgundy">*</span> {contactForm.requiredNote}
            </p>

            <form ref={formRef} noValidate onSubmit={submit} className="mt-8">
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                <Field
                  id="contact-name"
                  label={fields.name}
                  required
                  error={name.error}
                  className="sm:col-span-2"
                >
                  <input {...name.props} type="text" autoComplete="name" required />
                </Field>

                <Field id="contact-email" label={fields.email} required error={email.error}>
                  <input
                    {...email.props}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                  />
                </Field>

                <Field id="contact-phone" label={fields.phone} error={phone.error}>
                  <input {...phone.props} type="tel" inputMode="tel" autoComplete="tel" />
                </Field>

                <Field
                  id="contact-type"
                  label={fields.type}
                  required
                  error={type.error}
                  className="sm:col-span-2"
                >
                  <div className="relative">
                    <select {...type.props} required>
                      <option value="" disabled>
                        {contactForm.typePlaceholder}
                      </option>
                      {enquiryTypes.map((option) => (
                        <option key={option} value={option} className="text-ink">
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="pointer-events-none absolute top-1/2 right-4 mt-1 size-5 -translate-y-1/2 text-muted"
                    />
                  </div>
                </Field>

                <Field
                  id="contact-message"
                  label={fields.message}
                  required
                  error={message.error}
                  className="sm:col-span-2"
                >
                  <textarea
                    {...message.props}
                    rows={5}
                    required
                    placeholder={contactForm.messagePlaceholder}
                  />
                </Field>
              </div>

              <div className="mt-8">
                <Button type="submit" className="h-14 w-full">
                  {contactForm.submit}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
