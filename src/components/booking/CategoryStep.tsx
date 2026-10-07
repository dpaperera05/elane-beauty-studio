"use client";

import type { BookingCategory } from "@/content/booking";
import { OptionTile, SelectedMark } from "./OptionTile";
import { useRadioGroup } from "./useRadioGroup";

/** Step 1: pick one service category. */
export function CategoryStep({
  labelledBy,
  categories,
  value,
  onChange,
}: {
  /** Id of the heading that names the group. */
  labelledBy: string;
  categories: BookingCategory[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  const getRadioProps = useRadioGroup(
    categories.map((category) => category.id),
    value,
    onChange,
  );

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
    >
      {categories.map((category) => {
        const selected = category.id === value;
        const CategoryIcon = category.icon;
        return (
          <OptionTile
            key={category.id}
            {...getRadioProps(category.id)}
            selected={selected}
            layoutId="booking-category-selected"
            className="flex min-h-20 items-center gap-4 px-5 py-4 sm:grid sm:min-h-44 sm:grid-cols-[1fr_auto] sm:content-between sm:items-start sm:p-6 lg:p-7"
          >
            <CategoryIcon
              aria-hidden="true"
              strokeWidth={1.25}
              className={`relative size-6 shrink-0 transition-colors duration-300 sm:size-7 ${
                selected ? "text-burgundy" : "text-ink/70"
              }`}
            />

            <span className="relative block min-w-0 flex-1 sm:order-last sm:col-span-2">
              <span
                className={`type-h4 block transition-colors duration-300 ${
                  selected ? "text-burgundy" : "text-ink"
                }`}
              >
                {category.name}
              </span>
              <span className="type-small mt-0.5 block text-muted sm:mt-1">
                {category.descriptor}
              </span>
            </span>

            <SelectedMark selected={selected} />
          </OptionTile>
        );
      })}
    </div>
  );
}
