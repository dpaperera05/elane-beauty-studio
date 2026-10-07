import { useRef, type KeyboardEvent } from "react";

/**
 * Radio-group behaviour for a set of buttons: Tab enters the group at the
 * chosen option (or the first), and the arrow keys move and select, as with
 * native radios. Spread `getRadioProps(id)` onto each selectable button.
 */
export function useRadioGroup(
  /** Selectable option ids, in visual order. */
  ids: string[],
  value: string | null,
  onChange: (id: string) => void,
) {
  const nodes = useRef(new Map<string, HTMLButtonElement>());
  const tabStop = value !== null && ids.includes(value) ? value : ids[0];

  return (id: string) => ({
    ref: (node: HTMLButtonElement | null) => {
      if (node) nodes.current.set(id, node);
      else nodes.current.delete(id);
    },
    type: "button" as const,
    role: "radio" as const,
    "aria-checked": id === value,
    tabIndex: id === tabStop ? 0 : -1,
    onClick: () => onChange(id),
    onKeyDown: (event: KeyboardEvent) => {
      const step =
        event.key === "ArrowRight" || event.key === "ArrowDown"
          ? 1
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? -1
            : 0;
      if (!step) return;
      event.preventDefault();
      const next = ids[(ids.indexOf(id) + step + ids.length) % ids.length];
      onChange(next);
      nodes.current.get(next)?.focus();
    },
  });
}
