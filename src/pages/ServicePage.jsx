import PageHero from "./PageHero.jsx";
import NotFound from "./NotFound.jsx";
import Reveal from "../components/Reveal.jsx";
import RelatedServices from "../components/RelatedServices.jsx";
import Contact from "../components/Contact.jsx";
import { serviceBySlug } from "../data/index.js";

export default function ServicePage({ slug }) {
  const s = serviceBySlug(slug);
  if (!s) {
    return (
      <NotFound
        title="Service not found"
        blurb="That service link doesn't exist (yet). Browse the full list instead."
        backHref="#/services"
        backLabel="All services"
      />
    );
  }

  return (
    <>
      <PageHero
        tag={s.name}
        title={s.headline}
        blurb={s.blurb}
        backHref="#/services"
        backLabel="All services"
        ctaLabel="Book a consultation"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-wide text-neutral-300">
          <span className="text-accent">✦</span> {s.tag}
        </span>
      </PageHero>

      {/* Capability sections */}
      <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {s.sections.map((sec, i) => (
            <Reveal
              key={sec.title}
              delay={i * 0.08}
              className="rounded-3xl border border-white/10 bg-ink-soft p-8 sm:p-10"
            >
              <h2 className="font-display text-2xl font-bold">{sec.title}</h2>
              <ul className="mt-6 space-y-3">
                {sec.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 leading-relaxed text-neutral-300"
                  >
                    <span className="mt-1 text-accent-2">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      {Array.isArray(s.process) && s.process.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mb-10 max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
              HOW IT RUNS
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
              From brief to wrap.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.process.map((step, i) => (
              <Reveal
                key={step}
                delay={(i % 3) * 0.06}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-soft p-6"
              >
                <span className="font-display text-4xl font-bold text-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 leading-relaxed text-neutral-300">{step}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <RelatedServices slugs={s.related} />
      <Contact />
    </>
  );
}
