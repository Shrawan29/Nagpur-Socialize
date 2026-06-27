import PageHero from "./PageHero.jsx";
import NotFound from "./NotFound.jsx";
import Reveal from "../components/Reveal.jsx";
import Contact from "../components/Contact.jsx";
import { caseStudyBySlug } from "../data/index.js";

export default function CaseStudyPage({ slug }) {
  const p = caseStudyBySlug(slug);
  if (!p) {
    return (
      <NotFound
        title="Case study not found"
        blurb="That project link doesn't exist. Browse the full portfolio instead."
        backHref="#/work"
        backLabel="All work"
      />
    );
  }

  return (
    <>
      <PageHero
        tag={`${p.category} · ${p.year}`}
        title={p.project}
        blurb={p.objective}
        backHref="#/work"
        backLabel="All work"
        ctaLabel="Start a project like this"
      >
        <div className="flex flex-wrap gap-2">
          {(p.services ?? []).map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs text-neutral-300"
            >
              {s}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-3xl border border-white/10 bg-ink-soft p-8 sm:p-10">
            <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
              THE CLIENT
            </p>
            <p className="mt-3 font-display text-xl font-bold capitalize">
              {p.client}
            </p>

            <p className="mt-8 font-mono text-xs tracking-[0.3em] text-accent-2">
              THE EXECUTION
            </p>
            <p className="mt-3 text-lg leading-relaxed text-neutral-300">
              {p.execution}
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col rounded-3xl border border-white/10 bg-ink-soft p-8 sm:p-10"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
              THE RESULTS
            </p>
            <ul className="mt-5 space-y-4">
              {(p.results ?? []).map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-1 text-accent">✦</span>
                  <span className="font-display text-lg font-bold leading-snug">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {p.testimonial && (
          <Reveal className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-accent/10 p-8 sm:p-12">
            <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">
              &ldquo;{p.testimonial.quote}&rdquo;
            </p>
            <p className="mt-5 font-mono text-sm text-neutral-300">
              {p.testimonial.author}
              {p.testimonial.role ? ` · ${p.testimonial.role}` : ""}
            </p>
          </Reveal>
        )}
      </section>

      <Contact />
    </>
  );
}
