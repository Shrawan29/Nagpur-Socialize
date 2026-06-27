import Reveal from "./Reveal.jsx";
import { services } from "../data/index.js";

// A compact card per service, linking to its own page. `limit` lets the home
// page show a teaser while the /#/services index shows all 17.
export default function ServicesGrid({ limit, showHeader = true }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      {showHeader && (
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
              WHAT WE DO
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Seventeen services. One crew.
            </h2>
          </div>
          {limit && (
            <a
              href="#/services"
              className="inline-flex min-h-[40px] items-center font-mono text-sm text-neutral-400 transition-colors hover:text-white"
            >
              All services →
            </a>
          )}
        </Reveal>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.06}>
            <a
              href={`#/services/${s.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs tracking-[0.25em] text-neutral-500">
                  {s.number}
                </span>
                <span className="font-mono text-sm text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  →
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold leading-snug">
                {s.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                {s.blurb}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
