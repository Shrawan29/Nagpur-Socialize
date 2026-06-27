import Reveal from "./Reveal.jsx";

const SERVICES = [
  {
    id: "event",
    tag: "01 / FOR EVENT",
    title: "We produce events people remember.",
    body: "From concept to last-song-of-the-night, we handle the full production — venue, staging, sound, lights, talent and crowd flow. You dream it, we run the floor.",
    points: [
      "Concerts & music festivals",
      "Weddings & private celebrations",
      "College fests & community events",
      "End-to-end production & logistics",
    ],
    accent: "from-accent/25",
  },
  {
    id: "brand",
    tag: "02 / FOR BRAND",
    title: "We make brands impossible to ignore.",
    body: "Launches, activations and experiences engineered for reach. We blend on-ground energy with content built to travel — so the buzz outlives the event.",
    points: [
      "Product launches & reveals",
      "On-ground brand activations",
      "Influencer & creator meets",
      "Content, coverage & amplification",
    ],
    accent: "from-accent-3/20",
  },
];

export default function Services() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-14 max-w-2xl">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
          WHAT WE DO
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
          Two things, done obsessively well.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.1}>
            <article
              id={s.id}
              className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-soft p-8 transition-colors duration-300 hover:border-white/20 sm:p-10"
            >
              <div className="relative">
                <p className="font-mono text-xs tracking-[0.25em] text-neutral-500">
                  {s.tag}
                </p>
                <h3 className="mt-5 max-w-md font-display text-2xl font-bold leading-snug sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-neutral-400">
                  {s.body}
                </p>

                <ul className="mt-8 space-y-3">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 font-mono text-sm text-neutral-300"
                    >
                      <span className="text-accent-2">→</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-9 inline-flex items-center gap-2 font-mono text-sm font-bold text-white"
                >
                  <span className="border-b border-accent pb-0.5 transition-colors group-hover:border-white">
                    Plan with us
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
