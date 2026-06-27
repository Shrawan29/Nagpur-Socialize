import Reveal from "./Reveal.jsx";
import { portfolio } from "../data/index.js";

// Bento spans that make the first/fourth tiles hero-sized for visual rhythm.
const SPANS = ["sm:col-span-2 sm:row-span-2", "", "", "sm:col-span-2", "", ""];

function Card({ p, span }) {
  return (
    <Reveal className={span}>
      <a
        href={`#/work/${p.slug}`}
        className="group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-ink-soft p-6 transition-transform duration-300 hover:-translate-y-1"
      >
        <div
          className={`absolute inset-0 ${p.color} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1 font-mono text-[11px] tracking-wider text-white backdrop-blur">
          {p.year}
        </span>

        <div className="relative translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <p className="font-mono text-xs tracking-widest text-white/70">
            {(p.category || "").toUpperCase()}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">
            {p.project}
          </h3>
          <p className="mt-2 max-h-0 overflow-hidden font-mono text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
            {p.client} · View case study →
          </p>
        </div>
      </a>
    </Reveal>
  );
}

export default function Work({ showHeader = true }) {
  if (!portfolio.length) return null;

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      {showHeader && (
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
              OUR WORK
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Recent productions.
            </h2>
          </div>
          <a
            href="#/work"
            className="font-mono text-sm text-neutral-400 transition-colors hover:text-white"
          >
            View all case studies →
          </a>
        </Reveal>
      )}

      <div className="grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-3">
        {portfolio.map((p, i) => (
          <Card key={p.slug} p={p} span={SPANS[i % SPANS.length]} />
        ))}
      </div>
    </section>
  );
}
