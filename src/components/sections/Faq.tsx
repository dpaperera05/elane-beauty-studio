"use client";

import { useState } from "react";
import { faq } from "@/content/home";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-space">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal>
          <h2 className="type-h2">{faq.title}</h2>
          <p className="mt-6 max-w-md text-muted">{faq.body}</p>
        </Reveal>

        <Reveal delay={150}>
          <ul className="border-t border-line">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              const id = `faq-${i}`;
              return (
                <li key={item.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 type-h4 text-left transition-colors hover:text-burgundy"
                    >
                      {item.q}
                      <Icon
                        name="chevron"
                        className={`size-6 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={id}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-muted">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
