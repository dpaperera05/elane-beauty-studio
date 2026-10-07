"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addDays,
  BOOKING_WINDOW_DAYS,
  formatDate,
  fromISODate,
  getDaySlots,
  startOfDay,
  toISODate,
} from "./model";
import { useRadioGroup } from "./useRadioGroup";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthTitle = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });
const arrowDays: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7,
};

const monthButton =
  "flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy disabled:cursor-not-allowed disabled:text-muted/40 disabled:hover:border-line";

/**
 * Step 4: a month calendar and the day's time slots. Past and fully booked
 * days are disabled; picking a date reveals its times, and the chosen time is
 * kept when the new date also has it free.
 */
export function DateTimeStep({
  date,
  time,
  onChange,
}: {
  date: string | null;
  time: string | null;
  onChange: (date: string, time: string | null) => void;
}) {
  // One "now" for the whole visit to this step, so availability can't shift
  // between renders.
  const [now] = useState(() => new Date());
  const today = startOfDay(now);
  const [view, setView] = useState(() => {
    const base = date ? fromISODate(date) : today;
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const gridRef = useRef<HTMLDivElement>(null);

  const firstOfMonth = new Date(view.year, view.month, 1);
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  // Weeks start on Monday.
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const iso = toISODate(new Date(view.year, view.month, index + 1));
    return {
      iso,
      number: index + 1,
      available: getDaySlots(iso, now).some((slot) => slot.available),
    };
  });

  const canGoBack = firstOfMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoForward =
    new Date(view.year, view.month + 1, 1) <= addDays(today, BOOKING_WINDOW_DAYS);
  const shiftMonth = (by: number) => {
    const next = new Date(view.year, view.month + by, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  // The calendar is one tab stop: the chosen day, or the first free one.
  const tabStop = days.some((day) => day.iso === date)
    ? date
    : days.find((day) => day.available)?.iso;

  // Arrow keys move between free days in the visible month.
  const onDayKeyDown = (event: KeyboardEvent, iso: string) => {
    const by = arrowDays[event.key];
    if (!by) return;
    event.preventDefault();
    let target = fromISODate(iso);
    for (let tries = 0; tries < 6; tries++) {
      target = addDays(target, by);
      const button = gridRef.current?.querySelector<HTMLButtonElement>(
        `[data-date="${toISODate(target)}"]:not(:disabled)`,
      );
      if (button) {
        button.focus();
        return;
      }
    }
  };

  const slots = date ? getDaySlots(date, now) : [];
  const selectDate = (iso: string) => {
    const stillFree = getDaySlots(iso, now).some((slot) => slot.available && slot.label === time);
    onChange(iso, stillFree ? time : null);
  };

  const getTimeProps = useRadioGroup(
    slots.filter((slot) => slot.available).map((slot) => slot.label),
    time,
    (label) => date && onChange(date, label),
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
      {/* Calendar */}
      <div>
        <div className="flex items-center justify-between">
          <p aria-live="polite" className="type-h4 text-ink">
            {monthTitle.format(firstOfMonth)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={!canGoBack}
              aria-label="Previous month"
              className={monthButton}
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              disabled={!canGoForward}
              aria-label="Next month"
              className={monthButton}
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="type-label mt-6 grid grid-cols-7 text-center text-muted">
          {weekdays.map((weekday) => (
            <span key={weekday}>{weekday}</span>
          ))}
        </div>

        <div
          ref={gridRef}
          role="group"
          aria-label="Choose a date"
          className="mt-3 grid grid-cols-7 gap-y-1"
        >
          {days.map((day, index) => {
            const selected = day.iso === date;
            const isToday = day.iso === toISODate(today);
            return (
              <button
                key={day.iso}
                type="button"
                data-date={day.iso}
                disabled={!day.available}
                aria-pressed={selected}
                aria-current={isToday ? "date" : undefined}
                aria-label={`${formatDate(day.iso)}${day.available ? "" : ", unavailable"}`}
                tabIndex={day.iso === tabStop ? 0 : -1}
                onClick={() => selectDate(day.iso)}
                onKeyDown={(event) => onDayKeyDown(event, day.iso)}
                style={index === 0 ? { gridColumnStart: leadingBlanks + 1 } : undefined}
                className={`type-ui relative mx-auto flex aspect-square w-full max-w-12 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
                  selected
                    ? "cursor-pointer bg-burgundy text-ivory"
                    : day.available
                      ? "cursor-pointer text-ink hover:bg-burgundy/10"
                      : "cursor-not-allowed text-muted/40"
                }`}
              >
                {day.number}
                {isToday && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1.5 size-1 rounded-full bg-current"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Times for the chosen day */}
      <div className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
        <p className="type-label text-burgundy">Available times</p>
        <p aria-live="polite" className="type-h4 mt-2 text-ink">
          {date ? formatDate(date) : "Choose a date first"}
        </p>

        {date ? (
          <div
            role="radiogroup"
            aria-label={`Available times on ${formatDate(date)}`}
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {slots.map((slot) => {
              const selected = slot.label === time;
              const shape =
                "type-ui flex h-12 items-center justify-center rounded-full border transition-colors duration-200";
              return slot.available ? (
                <button
                  key={slot.label}
                  {...getTimeProps(slot.label)}
                  className={`${shape} cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy ${
                    selected
                      ? "border-burgundy bg-burgundy text-ivory"
                      : "border-line text-ink hover:border-ink/35"
                  }`}
                >
                  {slot.label}
                </button>
              ) : (
                <button
                  key={slot.label}
                  type="button"
                  role="radio"
                  aria-checked={false}
                  disabled
                  className={`${shape} cursor-not-allowed border-line/60 text-muted/50 line-through`}
                >
                  {slot.label}
                  <span className="sr-only">, unavailable</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="type-small mt-4 max-w-[34ch] text-muted">
            Pick a day on the calendar to see the times we have free.
          </p>
        )}
      </div>
    </div>
  );
}
