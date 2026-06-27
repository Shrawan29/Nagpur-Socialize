import Reveal from "../components/Reveal.jsx";

// A two-column grid of capability cards, reused by the Event and Brand pages.
export default function FeatureSection({ kicker, title, items }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <Reveal className="mb-12 max-w-2xl">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">{kicker}</p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
          {title}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-soft p-8 transition-colors duration-300 hover:border-white/20 sm:p-10">
              <div className="relative">
                <p className="font-mono text-xs tracking-[0.25em] text-neutral-500">
                  {it.no}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold leading-snug">
                  {it.title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-400">{it.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
