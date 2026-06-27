import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import { solutions } from "../data/index.js";

// Expanding horizontal panels on hover-capable desktops: each panel is a narrow
// sliver showing only its (vertical) heading; hovering expands it and squeezes
// the siblings, revealing the blurb + offerings.
// On phones AND any touch device (no hover) the panels instead STACK with their
// content shown directly — hover-to-expand can't work without a pointer, so
// tapping a sliver would do nothing.
// Alternate the two page colours (violet primary / coral secondary).
const TINTS = [
  "bg-accent/20",
  "bg-accent-2/20",
  "bg-accent/15",
  "bg-accent-2/20",
  "bg-accent/20",
];

const pad = (n) => String(n).padStart(2, "0");

// True on devices whose primary input can't hover (phones, tablets) — they get
// the always-open stacked layout at every width instead of the hover row.
function useNoHover() {
  const [noHover, setNoHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setNoHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return noHover;
}

export default function Solutions() {
  const total = solutions.length;
  // Only hover-capable devices get the lg expanding-row interaction.
  const hoverable = !useNoHover();

  return (
    <section
      id="solutions"
      className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-16 max-lg:justify-start sm:px-8 sm:py-20"
    >
      {/* On mobile the heading pins to the top while the panels stack under it */}
      <Reveal className="mb-5 max-w-2xl max-lg:sticky max-lg:top-0 max-lg:z-30 max-lg:bg-ink max-lg:pb-4 max-lg:pt-2 sm:mb-6">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
          SOLUTIONS
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
          Built around who you are.
        </h2>
      </Reveal>

      {/* Hover-capable desktops get the fixed-height expanding row; everyone
          else stacks. */}
      <div
        className={`flex flex-col gap-4${
          hoverable ? " lg:h-[58vh] lg:min-h-[420px] lg:flex-row lg:gap-4" : ""
        }`}
      >
        {solutions.map((s, i) => (
          <div
            key={s.slug}
            // grow:1 collapsed, grow:6 on hover → siblings squeeze down.
            // Stacked (touch/mobile): each panel locks near the top on scroll.
            style={{ top: `calc(8rem + ${i * 0.5}rem)` }}
            className={`group relative overflow-hidden rounded-[1.25rem] border border-white/12 bg-ink-soft shadow-2xl shadow-black/40 max-lg:sticky${
              hoverable
                ? " cursor-pointer lg:grow lg:basis-0 lg:rounded-[2rem] lg:transition-[flex-grow] lg:duration-500 lg:ease-out lg:hover:grow-[6]"
                : ""
            }`}
          >
            {/* tint + dot texture */}
            <div
              className={`pointer-events-none absolute inset-0 ${TINTS[i % TINTS.length]
                }`}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "26px 26px",
              }}
            />

            {/* number — top corner, always visible */}
            <span className="absolute left-6 top-6 z-10 font-mono text-sm tracking-[0.3em] text-accent-2">
              {pad(i + 1)} / {pad(total)}
            </span>

            {/* COLLAPSED label — vertical heading spine, only in the hover row */}
            {hoverable && (
              <div className="absolute inset-0 hidden items-end justify-start p-6 lg:flex lg:transition-opacity lg:duration-300 lg:group-hover:pointer-events-none lg:group-hover:opacity-0">
                <h3 className="whitespace-nowrap font-display text-3xl font-bold leading-none tracking-tight [writing-mode:vertical-rl] rotate-180 sm:text-4xl">
                  {s.name}
                </h3>
              </div>
            )}

            {/* EXPANDED content — shown directly when stacked; fades in on hover
                in the desktop row. Extra top padding clears the absolute number. */}
            <div
              className={`flex flex-col justify-end px-6 pb-6 pt-16${
                hoverable
                  ? " lg:pointer-events-none lg:absolute lg:inset-0 lg:min-w-[20rem] lg:p-10 lg:opacity-0 lg:transition-opacity lg:delay-150 lg:duration-300 lg:group-hover:opacity-100"
                  : ""
              }`}
            >
              <h3 className="font-display text-4xl font-bold leading-[0.95] sm:text-5xl">
                {s.name}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                {s.blurb}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {(s.offerings ?? []).map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-neutral-300"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
