// Booking state, validation, formatting and the mock availability calendar.

import { timeSlots } from "@/content/booking";

export type BookingDetails = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type BookingState = {
  categoryId: string | null;
  serviceId: string | null;
  /** An artist id, `NO_PREFERENCE`, or null while nothing is chosen. */
  artistId: string | null;
  /** Local calendar date as YYYY-MM-DD. */
  date: string | null;
  /** A `timeSlots` label. */
  time: string | null;
  details: BookingDetails;
};

export const NO_PREFERENCE = "no-preference";

export const emptyBooking: BookingState = {
  categoryId: null,
  serviceId: null,
  artistId: null,
  date: null,
  time: null,
  details: { name: "", phone: "", email: "", notes: "" },
};

export type DetailErrors = Partial<Record<"name" | "phone" | "email", string>>;

export function validateDetails({ name, phone, email }: BookingDetails): DetailErrors {
  const errors: DetailErrors = {};

  if (name.trim().length < 2) errors.name = "Enter your full name.";

  const digits = phone.replace(/\D/g, "");
  if (!phone.trim()) errors.phone = "Enter your phone number.";
  else if (!/^\+?[\d\s()-]+$/.test(phone.trim()) || digits.length < 9 || digits.length > 15)
    errors.phone = "Enter a valid phone number, e.g. 077 123 4567.";

  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
    errors.email = "Enter a valid email address, e.g. name@example.com.";

  return errors;
}

export const formatPrice = (price: number) => `From LKR ${price.toLocaleString("en-US")}`;
export const formatDuration = (minutes: number) => `${minutes} min`;

const pad = (n: number) => String(n).padStart(2, "0");

export const toISODate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export function fromISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** "Thursday 15 October" */
export const formatDate = (iso: string) => longDate.format(fromISODate(iso));

/** How far ahead appointments can be booked. */
export const BOOKING_WINDOW_DAYS = 45;
/** Same-day appointments need at least this much notice. */
const MIN_NOTICE_MINUTES = 60;

export type DaySlot = { label: string; available: boolean };

/**
 * Mock availability. Deterministic per date, so a day always shows the same
 * free times: nothing in the past or beyond the booking window, the odd day
 * fully booked, and roughly two thirds of the remaining slots free.
 */
export function getDaySlots(iso: string, now: Date): DaySlot[] {
  const day = fromISODate(iso);
  const today = startOfDay(now);
  const inWindow = day >= today && day <= addDays(today, BOOKING_WINDOW_DAYS);

  let seed = 7;
  for (const char of iso) seed = (seed * 31 + char.charCodeAt(0)) % 9973;
  const fullyBooked = seed % 9 === 0;

  const isToday = day.getTime() === today.getTime();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return timeSlots.map((slot, index) => ({
    label: slot.label,
    available:
      inWindow &&
      !fullyBooked &&
      (seed + index * 7) % 3 !== 0 &&
      (!isToday || slot.minutes >= nowMinutes + MIN_NOTICE_MINUTES),
  }));
}
