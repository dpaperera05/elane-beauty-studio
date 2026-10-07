"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ChevronDown, CircleAlert } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { bookingLine, contactForm, enquiryTypes } from "@/content/contact";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

gsap.registerPlugin(ScrollTrigger);

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
 * The enquiry form, beside its heading: name, email, phone (optional), enquiry
 * type and message. Nothing is sent anywhere; a valid submit only swaps the
 * form for a thank-you. A field's error appears once it has been visited and
 * clears as soon as the value is valid; submitting with errors shows them all
 * and moves focus to the first. "Send another" keeps the contact details and
 * clears the enquiry. A small line under the section points to booking.
 */
export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState(untouched);
  const [sent, setSent] = useState(false);
  const errors = validate(values);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal='item']", {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "clamp(top 80%)", once: true },
      });
    });

    return () => mm.revert();
  }, []);

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
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="message"
        aria-labelledby="message-title"
        className="container-site section-space"
      >
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <p data-reveal="item" className="type-label flex items-center gap-4 text-ink sm:gap-5">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 sm:w-10" />
              {contactForm.eyebrow}
            </p>
            <h2
              id="message-title"
              data-reveal="item"
              className="type-h2 mt-5 max-w-[11ch] leading-[0.94] tracking-[-0.035em] text-burgundy md:mt-6"
            >
              {contactForm.title}
            </h2>
            <p data-reveal="item" className="type-lead mt-6 max-w-[24rem] text-ink">
              {contactForm.body}
            </p>
          </div>

          <div data-reveal="item" className="lg:col-span-7 lg:col-start-6">
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
                  className="bg-ivory px-6 py-10 outline-none sm:px-10 sm:py-12"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-burgundy text-ivory">
                    <Check aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  </span>
                  <h3 className="type-h3 mt-6 text-ink">{contactForm.success.title}</h3>
                  <p className="type-lead mt-3 max-w-[30rem] text-ink">{contactForm.success.body}</p>
                  <div className="mt-8">
                    <Button variant="secondary" onClick={sendAnother}>
                      {contactForm.success.again}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <p className="type-small text-muted">
                    Fields marked <span className="text-burgundy">*</span> {contactForm.requiredNote}
                  </p>

                  <div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">
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
                    <Button type="submit" className="w-full sm:w-auto sm:min-w-52">
                      {contactForm.submit}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* A pointer to booking, kept small on purpose. */}
        <p className="type-small mt-14 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-6 text-muted md:mt-16">
          {bookingLine.text}
          <a
            href={bookingLine.link.href}
            className="type-ui group inline-flex h-11 items-center gap-2 text-burgundy transition-colors hover:text-burgundy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          >
            <span className="underline decoration-burgundy/30 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-burgundy">
              {bookingLine.link.label}
            </span>
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </p>
      </section>
    </MotionConfig>
  );
}
