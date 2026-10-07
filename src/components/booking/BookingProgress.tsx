import { Check } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The booking flow's step rail: one hairline segment per step. The current
 * step is solid burgundy, completed steps a lighter burgundy with a tick, and
 * the rest muted. From md each segment carries its number and name; below
 * that the names would not fit, so a single "Step 01 / 06" line names the
 * current step and the segments show the position. Steps up to `reachable`
 * are buttons that jump back (or forward again) to them.
 */
export function BookingProgress({
  steps,
  current,
  complete,
  reachable,
  onSelect,
}: {
  steps: readonly string[];
  /** Zero-based index of the active step. */
  current: number;
  /** Per step: whether its choices are made. */
  complete: boolean[];
  /** The furthest step the user may jump to. */
  reachable: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Booking progress">
      {/* Screen readers get the full list below instead. */}
      <p aria-hidden="true" className="type-label flex items-baseline justify-between md:hidden">
        <span className="text-burgundy">
          Step {pad(current + 1)} <span className="text-muted">/ {pad(steps.length)}</span>
        </span>
        <span className="text-ink">{steps[current]}</span>
      </p>

      <ol className="mt-3 grid grid-cols-6 gap-1.5 md:mt-0 md:gap-3 lg:gap-5">
        {steps.map((label, index) => {
          const active = index === current;
          const clickable = !active && index <= reachable;
          const done = clickable && complete[index];

          const content = (
            <>
              <span
                aria-hidden="true"
                className={`block h-0.5 rounded-full transition-colors duration-300 ${
                  active ? "bg-burgundy" : done ? "bg-burgundy/40" : "bg-line"
                }`}
              />
              <span className="sr-only md:not-sr-only">
                <span className="flex flex-col gap-1 pt-4">
                  <span
                    className={`type-label flex items-center gap-1.5 ${
                      active || done ? "text-burgundy" : "text-muted"
                    }`}
                  >
                    {pad(index + 1)}
                    {done && <Check aria-hidden="true" strokeWidth={3} className="size-3" />}
                  </span>
                  <span
                    className={`type-ui transition-colors ${
                      active
                        ? "font-semibold text-ink"
                        : done
                          ? "text-ink group-hover:text-burgundy"
                          : "text-muted"
                    }`}
                  >
                    {label}
                    {done && <span className="sr-only"> (completed)</span>}
                  </span>
                </span>
              </span>
            </>
          );

          return (
            <li key={label} aria-current={active ? "step" : undefined}>
              {clickable ? (
                // The padding (cancelled by the negative margin) gives the
                // thin segment a workable touch target on mobile.
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className="group -my-3 block w-full cursor-pointer rounded-sm py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                >
                  {content}
                </button>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
