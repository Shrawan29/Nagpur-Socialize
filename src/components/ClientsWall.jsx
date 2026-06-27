import Reveal from "./Reveal.jsx";
import { clients } from "../data/index.js";

// Logo wall stand-in: until real client logos are supplied, we show the
// categories of brands and venues we work with. Drop logo images in later.
export default function ClientsWall() {
  if (!clients.length) return null;

  return (
    <section id="clients" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <Reveal className="mb-12 max-w-2xl">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">CLIENTS</p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
          Trusted across the city&apos;s scene.
        </h2>
        <p className="mt-4 leading-relaxed text-neutral-400">
          From homegrown cafés to national FMCG brands — here&apos;s the kind of
          company we keep.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
        {clients.map((c) => (
          <div
            key={c.category}
            className="group flex min-h-[140px] flex-col justify-between bg-ink-soft p-6 transition-colors duration-300 hover:bg-pill"
          >
            <span className="text-accent">✦</span>
            <div>
              <h3 className="font-display text-lg font-bold leading-snug">
                {c.category}
              </h3>
              <p className="mt-1 font-mono text-xs leading-relaxed text-neutral-500">
                {c.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
