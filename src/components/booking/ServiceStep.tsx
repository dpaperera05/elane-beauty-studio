"use client";

import { Clock } from "lucide-react";
import type { BookingService } from "@/content/booking";
import { formatDuration, formatPrice } from "./model";
import { OptionTile, SelectedMark } from "./OptionTile";
import { useRadioGroup } from "./useRadioGroup";

/** Step 2: pick one treatment from the chosen category. */
export function ServiceStep({
  labelledBy,
  services,
  value,
  onChange,
}: {
  labelledBy: string;
  services: BookingService[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  const getRadioProps = useRadioGroup(
    services.map((service) => service.id),
    value,
    onChange,
  );

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:gap-5"
    >
      {services.map((service) => {
        const selected = service.id === value;
        return (
          <OptionTile
            key={service.id}
            {...getRadioProps(service.id)}
            selected={selected}
            layoutId="booking-service-selected"
            className="flex flex-col p-5 sm:p-6"
          >
            <span className="relative flex items-start justify-between gap-4">
              <span
                className={`type-h4 transition-colors duration-300 ${
                  selected ? "text-burgundy" : "text-ink"
                }`}
              >
                {service.name}
              </span>
              <SelectedMark selected={selected} />
            </span>
            <span className="type-small relative mt-1.5 block max-w-[38ch] flex-1 text-muted">
              {service.description}
            </span>
            <span className="type-small relative mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
              <span className="flex items-center gap-2 text-muted">
                <Clock aria-hidden="true" strokeWidth={1.5} className="size-4" />
                {formatDuration(service.duration)}
              </span>
              <span className="font-semibold text-ink">{formatPrice(service.price)}</span>
            </span>
          </OptionTile>
        );
      })}
    </div>
  );
}
