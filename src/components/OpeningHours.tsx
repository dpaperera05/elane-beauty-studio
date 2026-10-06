"use client";

import { useEffect, useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const pad = (h: number) => `${String(h).padStart(2, "0")}:00`;

/** Reads the current weekday and hour in the studio's own time zone. */
function studioNow(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  return {
    day: parts.find((p) => p.type === "weekday")?.value ?? "",
    hour: Number(parts.find((p) => p.type === "hour")?.value ?? 0),
  };
}

export function OpeningHours({
  open,
  close,
  timeZone,
}: {
  open: number;
  close: number;
  timeZone: string;
}) {
  // Resolved after mount so server and client markup match.
  const [now, setNow] = useState<{ day: string; hour: number } | null>(null);

  useEffect(() => {
    const update = () => setNow(studioNow(timeZone));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [timeZone]);

  const isOpen = now !== null && now.hour >= open && now.hour < close;

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="type-label">Opening hours</h3>
        {now && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 type-label ${
              isOpen ? "bg-moss/10 text-moss" : "bg-burgundy/10 text-burgundy"
            }`}
          >
            <span className={`size-1.5 rounded-full ${isOpen ? "bg-moss" : "bg-burgundy"}`} />
            {isOpen ? "Open now" : "Closed"}
          </span>
        )}
      </div>
      <dl className="type-small flex flex-col gap-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className={`flex justify-between gap-4 ${now?.day === day ? "font-medium text-ink" : "text-muted"}`}
          >
            <dt>{day}</dt>
            <dd className="tabular-nums">
              {pad(open)} – {pad(close)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
