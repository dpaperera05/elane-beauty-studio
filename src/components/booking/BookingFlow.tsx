"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import {
  bookingActions,
  bookingArtists,
  bookingCategories,
  bookingIntro,
  bookingServices,
  bookingSteps,
  noPreference,
  stepCopy,
} from "@/content/booking";
import { Button } from "../ui/Button";
import { ArtistStep } from "./ArtistStep";
import { BookingProgress } from "./BookingProgress";
import { CategoryStep } from "./CategoryStep";
import { Confirmation } from "./Confirmation";
import { DateTimeStep } from "./DateTimeStep";
import { DetailsStep } from "./DetailsStep";
import {
  emptyBooking,
  formatDate,
  formatDuration,
  formatPrice,
  NO_PREFERENCE,
  preselectFromSearch,
  validateDetails,
  type BookingState,
} from "./model";
import { ReviewStep } from "./ReviewStep";
import { ServiceStep } from "./ServiceStep";
import type { SummaryRow } from "./SummaryList";

const ease = [0.2, 0.8, 0.2, 1] as const;
const TITLE_ID = "booking-step-title";
const REVIEW = bookingSteps.length - 1;

// Page entrance: each block rises in, one after the other.
const rise = (order: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.1 + order * 0.12, ease },
});

// Step change: the old step slips out one way as the new one arrives from the
// other, following the direction of travel. The shift stays inside the page
// gutter so it can never cause horizontal scroll.
const stepMotion = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 16 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -16 }),
};

/** A step's heading and body. After a step change the heading takes focus. */
function StepShell({
  title,
  focusTitle,
  children,
}: {
  title: string;
  focusTitle: boolean;
  children: ReactNode;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusTitle) titleRef.current?.focus({ preventScroll: true });
  }, [focusTitle]);

  return (
    <section aria-labelledby={TITLE_ID}>
      <h2 ref={titleRef} id={TITLE_ID} tabIndex={-1} className="type-h3 text-ink outline-none">
        {title}
      </h2>
      <div className="mt-6 md:mt-8">{children}</div>
    </section>
  );
}

/**
 * The /booking page body: intro, step rail, the current step and its
 * Back / Continue row, then the confirmation. All booking state lives here;
 * there is no backend, so confirming only switches to the success state.
 */
export function BookingFlow() {
  const [booking, setBooking] = useState<BookingState>(emptyBooking);
  const [nav, setNav] = useState({
    step: 0,
    direction: 1,
    // The furthest step reached with Continue.
    furthest: 0,
    // False until the first step change, so the page doesn't steal focus on load.
    moved: false,
  });
  const [confirmed, setConfirmed] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  // Arriving from a "Book this service" link: take the category and service
  // from the URL and open on the first step still to answer (Artist, or
  // Treatment when only the category is known). Applied after hydration, as
  // the page is prerendered without the query string.
  useEffect(() => {
    const preselected = preselectFromSearch(window.location.search);
    if (!preselected) return;
    const frame = requestAnimationFrame(() => {
      const step = preselected.serviceId ? 2 : 1;
      setBooking((current) => ({ ...current, ...preselected }));
      setNav({ step, direction: 1, furthest: step, moved: false });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const { step } = nav;
  const category = bookingCategories.find((item) => item.id === booking.categoryId);
  const services = category ? (bookingServices[category.id] ?? []) : [];
  const service = services.find((item) => item.id === booking.serviceId);
  const artists = category
    ? bookingArtists.filter((artist) => artist.categories.includes(category.id))
    : [];
  const artist = artists.find((item) => item.id === booking.artistId);
  const artistName = booking.artistId === NO_PREFERENCE ? noPreference.name : artist?.name;
  const { details } = booking;

  // One flag per step. Review is only ever "complete" by confirming.
  const complete = [
    Boolean(category),
    Boolean(service),
    Boolean(artistName),
    Boolean(booking.date && booking.time),
    Object.keys(validateDetails(details)).length === 0,
    false,
  ];
  // Jumping is allowed back to any visited step, and forward only as far as
  // the first step that still needs an answer.
  const reachable = Math.min(nav.furthest, complete.indexOf(false));

  const goTo = (next: number) => {
    setNav((current) => ({
      step: next,
      direction: next > current.step ? 1 : -1,
      furthest: Math.max(current.furthest, next),
      moved: true,
    }));
    // Steps differ in height; keep the rail in view if it has scrolled away.
    const rail = railRef.current;
    if (rail && rail.getBoundingClientRect().top < 80) rail.scrollIntoView({ block: "start" });
  };

  // An earlier choice changing clears the later ones that depended on it.
  const selectCategory = (categoryId: string) =>
    setBooking((current) => {
      if (current.categoryId === categoryId) return current;
      const keepsArtist =
        current.artistId === NO_PREFERENCE ||
        bookingArtists.some(
          (item) => item.id === current.artistId && item.categories.includes(categoryId),
        );
      return {
        ...current,
        categoryId,
        serviceId: null,
        artistId: keepsArtist ? current.artistId : null,
      };
    });

  const next = () => {
    // Review can only be reached with every earlier step complete.
    if (step === REVIEW) setConfirmed(true);
    else if (complete[step]) goTo(step + 1);
  };

  const bookAnother = () => {
    // Contact details are kept for the next booking.
    setBooking({ ...emptyBooking, details });
    setNav({ step: 0, direction: -1, furthest: 0, moved: true });
    setConfirmed(false);
  };

  const visitRows: SummaryRow[] =
    category && service && artistName && booking.date && booking.time
      ? [
          { label: "Category", value: category.name },
          { label: "Service", value: service.name },
          { label: "Artist", value: artistName },
          { label: "Date", value: formatDate(booking.date) },
          { label: "Time", value: booking.time },
          { label: "Duration", value: formatDuration(service.duration) },
          { label: "Estimated price", value: formatPrice(service.price), emphasis: true },
        ]
      : [];
  const contactRows: SummaryRow[] = [
    { label: "Name", value: details.name.trim() },
    { label: "Phone", value: details.phone.trim() },
    { label: "Email", value: details.email.trim() },
    ...(details.notes.trim() ? [{ label: "Notes", value: details.notes.trim() }] : []),
  ];

  if (confirmed) {
    return (
      <MotionConfig reducedMotion="user">
        <div className="container-site pt-12 pb-20 md:pt-16 md:pb-28">
          <Confirmation
            firstName={details.name.trim().split(/\s+/)[0]}
            rows={visitRows.filter((row) => row.label !== "Category" && row.label !== "Duration")}
            onBookAnother={bookAnother}
          />
        </div>
      </MotionConfig>
    );
  }

  const status = [
    category && `${category.name} selected.`,
    service && `${service.name} selected.`,
    artistName && `${artistName} selected.`,
    booking.date && booking.time
      ? `${formatDate(booking.date)} at ${booking.time}.`
      : booking.date && "Choose a time to continue.",
    complete[4] && "Your details are complete.",
    null,
  ][step];

  const body = [
    <CategoryStep
      key="category"
      labelledBy={TITLE_ID}
      categories={bookingCategories}
      value={booking.categoryId}
      onChange={selectCategory}
    />,
    <ServiceStep
      key="service"
      labelledBy={TITLE_ID}
      services={services}
      value={booking.serviceId}
      onChange={(serviceId) => setBooking((current) => ({ ...current, serviceId }))}
    />,
    <ArtistStep
      key="artist"
      labelledBy={TITLE_ID}
      artists={artists}
      value={booking.artistId}
      onChange={(artistId) => setBooking((current) => ({ ...current, artistId }))}
    />,
    <DateTimeStep
      key="date-time"
      date={booking.date}
      time={booking.time}
      onChange={(date, time) => setBooking((current) => ({ ...current, date, time }))}
    />,
    <DetailsStep
      key="details"
      details={details}
      onChange={(value) => setBooking((current) => ({ ...current, details: value }))}
      onSubmit={next}
    />,
    <ReviewStep
      key="review"
      visit={visitRows}
      contact={contactRows}
      onEditVisit={() => goTo(0)}
      onEditContact={() => goTo(4)}
    />,
  ][step];

  return (
    <MotionConfig reducedMotion="user">
      <div className="container-site pt-12 pb-20 md:pt-16 md:pb-28">
        <motion.header {...rise(0)} className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          {/* Matches the homepage sections' SectionHeading in its "accent"
              tone: ink label and intro, burgundy title set tight. */}
          <p className="type-label flex items-center gap-4 text-ink sm:gap-5">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 sm:w-10" />
            {bookingIntro.eyebrow}
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 sm:w-10" />
          </p>
          <h1 className="type-h2 mt-5 max-w-[16ch] leading-[0.94] tracking-[-0.035em] text-burgundy md:mt-6">
            {bookingIntro.title}
          </h1>
          <p className="type-lead mt-5 max-w-[34rem] text-ink md:mt-6">{bookingIntro.body}</p>
        </motion.header>

        <div className="mx-auto mt-12 max-w-[68rem] md:mt-16">
          <motion.div ref={railRef} {...rise(1)}>
            <BookingProgress
              steps={bookingSteps}
              current={step}
              complete={complete}
              reachable={reachable}
              onSelect={goTo}
            />
          </motion.div>

          <motion.div {...rise(2)} className="mt-10 md:mt-16">
            <AnimatePresence mode="wait" initial={false} custom={nav.direction}>
              <motion.div
                key={step}
                custom={nav.direction}
                variants={stepMotion}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.26, ease }}
              >
                <StepShell title={stepCopy[step].title} focusTitle={nav.moved}>
                  {body}
                </StepShell>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-10">
              <p aria-live="polite" className={`type-small ${status ? "text-ink" : "text-muted"}`}>
                {status || stepCopy[step].hint}
              </p>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-7">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="type-ui flex h-12 cursor-pointer items-center justify-center gap-2 text-ink transition-colors hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
                  >
                    <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-4" />
                    {bookingActions.back}
                  </button>
                )}
                <Button
                  disabled={!complete[step] && step !== REVIEW}
                  onClick={next}
                  className="w-full sm:w-auto sm:min-w-48"
                >
                  {step === REVIEW ? bookingActions.confirm : bookingActions.continue}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
