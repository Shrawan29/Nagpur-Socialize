import PageHero from "./PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Contact from "../components/Contact.jsx";
import { posts } from "../data/index.js";

export default function ArticlesPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        tag="ARTICLES"
        title="Notes from the floor."
        blurb="Playbooks, trends and behind-the-scenes on events, marketing, hospitality and the nightlife scene across Nagpur and beyond."
        ctaLabel="Work with us"
      />

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        {/* Featured lead article */}
        {lead && (
          <Reveal className="mb-8">
            <a
              href={`#/articles/${lead.slug}`}
              className="group relative grid overflow-hidden rounded-3xl border border-white/10 bg-ink-soft p-8 transition-colors duration-300 hover:border-white/25 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:gap-10"
            >
              <div className="relative">
                <div className="flex items-center gap-3 font-mono text-xs tracking-wider text-neutral-500">
                  <span className="text-accent-2">{lead.category}</span>
                  <span>·</span>
                  <span>{lead.date}</span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-5xl">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
                  {lead.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 font-mono text-sm font-bold text-accent">
                  Read the article
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          </Reveal>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.08}>
              <a
                href={`#/articles/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-soft p-7 transition-colors duration-300 hover:border-white/25"
              >
                <div className="flex items-center justify-between font-mono text-xs tracking-wider text-neutral-500">
                  <span className="text-accent-2">{a.category}</span>
                  <span>{a.date}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold leading-snug">
                  {a.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-neutral-400">
                  {a.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between font-mono text-sm">
                  <span className="font-bold text-accent transition-transform duration-200 group-hover:translate-x-1">
                    Read →
                  </span>
                  <span className="text-neutral-500">{a.read} read</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </>
  );
}
