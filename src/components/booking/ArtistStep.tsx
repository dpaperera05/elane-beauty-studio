"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { noPreference, type BookingArtist } from "@/content/booking";
import { NO_PREFERENCE } from "./model";
import { OptionTile, SelectedMark } from "./OptionTile";
import { useRadioGroup } from "./useRadioGroup";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

/** Step 3: "No preference" or one of the artists who offer the treatment. */
export function ArtistStep({
  labelledBy,
  artists,
  value,
  onChange,
}: {
  labelledBy: string;
  artists: BookingArtist[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  const getRadioProps = useRadioGroup(
    [NO_PREFERENCE, ...artists.map((artist) => artist.id)],
    value,
    onChange,
  );

  const tile = "flex items-center gap-4 p-4 sm:p-5";
  const portrait =
    "relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ivory text-burgundy";
  const name = (selected: boolean) =>
    `type-h4 block transition-colors duration-300 ${selected ? "text-burgundy" : "text-ink"}`;

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
    >
      <OptionTile
        {...getRadioProps(NO_PREFERENCE)}
        selected={value === NO_PREFERENCE}
        layoutId="booking-artist-selected"
        className={tile}
      >
        <span className={portrait}>
          <Users aria-hidden="true" strokeWidth={1.25} className="size-6" />
        </span>
        <span className="relative block min-w-0 flex-1">
          <span className={name(value === NO_PREFERENCE)}>{noPreference.name}</span>
          <span className="type-small mt-0.5 block text-muted">{noPreference.description}</span>
        </span>
        <SelectedMark selected={value === NO_PREFERENCE} />
      </OptionTile>

      {artists.map((artist) => {
        const selected = artist.id === value;
        return (
          <OptionTile
            key={artist.id}
            {...getRadioProps(artist.id)}
            selected={selected}
            layoutId="booking-artist-selected"
            className={tile}
          >
            <span className={portrait}>
              {artist.image ? (
                <Image
                  src={artist.image.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              ) : (
                <span aria-hidden="true" className="type-h4">
                  {initials(artist.name)}
                </span>
              )}
            </span>
            <span className="relative block min-w-0 flex-1">
              <span className={name(selected)}>{artist.name}</span>
              <span className="type-small block text-ink">{artist.role}</span>
              <span className="type-small block text-muted">{artist.specialties}</span>
            </span>
            <SelectedMark selected={selected} />
          </OptionTile>
        );
      })}
    </div>
  );
}
