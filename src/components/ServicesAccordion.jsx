import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal.jsx";
import { services } from "../data/index.js";

// "What we do" as a big, bold accordion: each service is an uppercase row with
// a red "+" that rotates to a "×" and expands to the blurb + a link. Rides the
// page theme (accent-2 drives the "+", fg the type/rules). One row open at a
// time.
const EASE = [0.4, 0, 0.2, 1];

export default function ServicesAccordion() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(null);
  const toggle = (slug) => setOpen((cur) => (cur === slug ? null : slug));

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <Reveal className="mb-12 max-w-2xl sm:mb-16">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
          WHAT WE DO
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
          Seventeen services. One crew.
        </h2>
      </Reveal>

      <div className="border-t border-white/15">
        {services.map((s, i) => {
          const isOpen = open === s.slug;
          return (
            <Reveal key={s.slug} delay={(i % 8) * 0.04}>
              <div className="border-b border-white/15">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(s.slug)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors sm:py-7"
                  >
                    <span
                      className={`font-poster text-2xl uppercase leading-none tracking-tight transition-colors duration-200 sm:text-4xl ${
                        isOpen ? "text-accent-2" : "group-hover:text-accent-2"
                      }`}
                    >
                      {s.name}
                    </span>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                      className={`shrink-0 text-accent-2 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-2xl pb-7 pr-10">
                        <p className="leading-relaxed text-neutral-400">
                          {s.blurb}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
