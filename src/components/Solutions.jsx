import Reveal from "./Reveal.jsx";
import { solutions } from "../data/index.js";

// Expanding horizontal panels. Each panel is a narrow sliver showing only its
// heading (set vertically); hovering expands it and collapses the siblings,
// revealing the blurb + offerings. Fixed-height row → the whole section fits
// in one screen, no scrolling. Display only.
// Alternate the two page colours (violet primary / coral secondary).
const TINTS = [
  "bg-accent/20",
  "bg-accent-2/20",
  "bg-accent/15",
  "bg-accent-2/20",
  "bg-accent/20",
];

const pad = (n) => String(n).padStart(2, "0");

export default function Solutions() {
  const total = solutions.length;

  return (
    <section
      id="solutions"
      className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-20"
    >
      <Reveal className="mb-10 max-w-2xl">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
          SOLUTIONS
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
          Built around who you are.
        </h2>
      </Reveal>

      {/* Expanding panel row — fixed height keeps everything on one screen */}
      <div className="flex h-[58vh] min-h-[420px] gap-3 sm:gap-4">
        {solutions.map((s, i) => (
          <div
            key={s.slug}
            // grow:1 collapsed, grow:6 on hover → siblings squeeze down
            className="group relative grow basis-0 cursor-pointer overflow-hidden rounded-[2rem] border border-white/12 bg-ink-soft shadow-2xl shadow-black/40 transition-[flex-grow] duration-500 ease-out hover:grow-[6]"
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

            {/* COLLAPSED label — vertical heading anchored like a spine, fades out on hover */}
            <div className="absolute inset-0 flex items-end justify-start p-6 transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0">
              <h3 className="whitespace-nowrap font-display text-3xl font-bold leading-none tracking-tight [writing-mode:vertical-rl] rotate-180 sm:text-4xl">
                {s.name}
              </h3>
            </div>

            {/* EXPANDED content — anchored bottom, fades in on hover */}
            <div className="pointer-events-none absolute inset-0 flex min-w-[20rem] flex-col justify-end p-8 opacity-0 transition-opacity delay-150 duration-300 group-hover:opacity-100 sm:p-10">
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