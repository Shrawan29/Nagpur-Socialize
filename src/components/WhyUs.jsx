import { useEffect, useRef, useState } from "react";
import WordStrip from "./WordStrip.jsx";

// "Why Choose Us" — the seven reasons from the brand brief.
const REASONS = [
  {
    title: "One-stop solution",
    body: "Strategy, production, hospitality and reporting under a single roof — no chasing ten vendors.",
  },
  {
    title: "Industry network",
    body: "Years of relationships across Nagpur's brands, media, venues and creators, working for you.",
  },
  {
    title: "Venue partnerships",
    body: "Direct access to the city's best restaurants, lounges, clubs and hotels — and the rates that come with it.",
  },
  {
    title: "Artist network",
    body: "DJs, singers, bands, comedians, hosts and headline acts — booked, briefed and looked after.",
  },
  {
    title: "Hospitality expertise",
    body: "Guest management, VIP handling and on-ground service that makes every attendee feel taken care of.",
  },
  {
    title: "Creative production team",
    body: "In-house stage, lighting, sound and fabrication crew that builds the moment, not just plans it.",
  },
  {
    title: "Data-driven reporting",
    body: "Reach, engagement, footfall and ROI — every campaign comes back with numbers, not just photos.",
  },
];

const pad = (n) => String(n).padStart(2, "0");

export default function WhyUs({ showHeader = true }) {
  const [active, setActive] = useState(0);
  const cards = useRef([]);

  // Scrollytelling: whichever reason crosses the middle of the viewport drives
  // the sticky panel on the left.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );
    cards.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="why">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sticky left panel */}
          <div className="min-w-0 self-start lg:sticky lg:top-24">
            {showHeader && (
              <>
                <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
                  WHY CHOOSE US
                </p>
                <h2 className="mt-4 font-poster text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
                  Seven reasons brands keep coming back.
                </h2>
              </>
            )}
            <p className="mt-5 max-w-md leading-relaxed text-neutral-400">
              From one-stop production to data-driven reporting — here&apos;s
              what keeps brands with us. Scroll through.
            </p>

            {/* Diagonal accent strip — lives inside the sticky panel so it
                stays visible the whole time the section is pinned */}
            <div className="mt-8 overflow-hidden rounded-2xl">
              <WordStrip
                reverse
                className="relative left-1/2 w-[150%] -translate-x-1/2 -rotate-2"
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Active reason readout — desktop sticky-scroll device, hidden on
                mobile where the panel doesn't pin */}
            <div className="mt-10 hidden lg:block">
              <div className="flex items-end gap-3">
                <span className="font-display text-6xl font-bold leading-none text-accent sm:text-7xl">
                  {pad(active + 1)}
                </span>
                <span className="mb-1.5 font-mono text-sm text-neutral-500">
                  / {pad(REASONS.length)}
                </span>
              </div>
              <p
                key={active}
                className="reason-pop mt-5 font-display text-2xl font-bold sm:text-3xl"
              >
                {REASONS[active].title}
              </p>
            </div>

            {/* Progress segments */}
            <div className="mt-6 hidden gap-2 lg:flex">
              {REASONS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-9 bg-accent" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scrolling right column */}
          <div className="min-w-0 space-y-5">
            {REASONS.map((r, i) => (
              <article
                key={r.title}
                data-index={i}
                ref={(el) => (cards.current[i] = el)}
                // Mobile: every card is solid + full opacity (no scrollytelling
                // dimming, since the panel doesn't pin). The active-highlight
                // only kicks in at lg.
                className={`rounded-3xl border border-white/10 bg-ink-soft p-6 sm:p-8 lg:p-10 lg:transition-all lg:duration-300 ${
                  i === active
                    ? "lg:border-accent/50 lg:shadow-xl lg:shadow-black/20"
                    : "lg:bg-ink-soft/70 lg:opacity-80"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-sm text-neutral-500 lg:transition-colors ${
                      i === active ? "lg:text-accent" : ""
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`h-px flex-1 bg-white/10 lg:transition-colors ${
                      i === active ? "lg:bg-accent/40" : ""
                    }`}
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl">
                  {r.title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-400">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
