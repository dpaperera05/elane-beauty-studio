export type SummaryRow = {
  label: string;
  value: string;
  /** Sets the value in the serif accent (the price). */
  emphasis?: boolean;
};

/** Label / value rows separated by hairlines; used by the review and confirmation. */
export function SummaryList({ rows }: { rows: SummaryRow[] }) {
  return (
    <dl>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[5.25rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-line py-3.5 last:border-b-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-4"
        >
          <dt className="type-small text-muted">{row.label}</dt>
          <dd
            className={`wrap-anywhere whitespace-pre-line ${
              row.emphasis
                ? "font-serif text-xl leading-tight font-medium text-burgundy sm:text-2xl"
                : "type-ui text-ink"
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
