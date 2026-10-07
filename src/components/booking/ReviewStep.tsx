import { SummaryList, type SummaryRow } from "./SummaryList";

function Panel({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: SummaryRow[];
  onEdit: () => void;
}) {
  return (
    <div className="rounded-2xl border border-line p-5 sm:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <h3 className="type-label text-burgundy">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="type-small link-underline -my-3 cursor-pointer py-3 font-semibold text-ink hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
        >
          Edit<span className="sr-only"> {title.toLowerCase()}</span>
        </button>
      </div>
      <SummaryList rows={rows} />
    </div>
  );
}

/** Step 6: everything chosen so far, with a way back to each part. */
export function ReviewStep({
  visit,
  contact,
  onEditVisit,
  onEditContact,
}: {
  visit: SummaryRow[];
  contact: SummaryRow[];
  onEditVisit: () => void;
  onEditContact: () => void;
}) {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-5">
      <Panel title="Your visit" rows={visit} onEdit={onEditVisit} />
      <Panel title="Your details" rows={contact} onEdit={onEditContact} />
    </div>
  );
}
