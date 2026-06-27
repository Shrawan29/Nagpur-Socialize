import Reveal from "./Reveal.jsx";
import { resolveServices } from "../data/index.js";

// Chip links to related services — shown at the foot of service & solution pages.
export default function RelatedServices({ slugs = [], title = "Pairs well with" }) {
  const items = resolveServices(slugs);
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
      <Reveal className="rounded-3xl border border-white/10 bg-ink-soft/60 p-8 sm:p-10">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
          {title.toUpperCase()}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {items.map((s) => (
            <a
              key={s.slug}
              href={`#/services/${s.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-sm text-neutral-300 transition-colors hover:border-accent hover:text-white"
            >
              {s.name}
              <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
