"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { confirmation } from "@/content/booking";
import { Button } from "../ui/Button";
import { SummaryList, type SummaryRow } from "./SummaryList";

/** The success state shown in place of the flow once a booking is confirmed. */
export function Confirmation({
  firstName,
  rows,
  onBookAnother,
}: {
  firstName: string;
  rows: SummaryRow[];
  onBookAnother: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // The flow was replaced under the reader: bring them to the top of the
  // message and move focus to it.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="mx-auto flex max-w-[40rem] flex-col items-center text-center"
    >
      <span className="flex size-14 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
        <Check aria-hidden="true" strokeWidth={1.5} className="size-6" />
      </span>
      <p className="type-label mt-8 text-burgundy">{confirmation.eyebrow}</p>
      <h1
        ref={titleRef}
        tabIndex={-1}
        className="type-h2 mt-5 max-w-[14ch] text-ink outline-none md:mt-6"
      >
        {confirmation.title}
      </h1>
      <p className="type-lead mt-5 max-w-[30rem] text-muted md:mt-6">
        {confirmation.body(firstName)}
      </p>

      <div className="mt-10 w-full rounded-2xl border border-line px-5 py-2 text-left sm:px-7 sm:py-3">
        <SummaryList rows={rows} />
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
        <Button href={confirmation.home.href} className="w-full sm:w-auto sm:min-w-52">
          {confirmation.home.label}
        </Button>
        <Button
          variant="secondary"
          onClick={onBookAnother}
          className="w-full sm:w-auto sm:min-w-52"
        >
          {confirmation.again}
        </Button>
      </div>
    </motion.div>
  );
}
