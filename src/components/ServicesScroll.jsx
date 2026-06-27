import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ServicesGrid from "./ServicesGrid.jsx";
import { services } from "../data/index.js";

const pad = (n) => String(n).padStart(2, "0");

function Card({ s, i }) {
  return (
    <a
      href={`#/services/${s.slug}`}
      className="group relative flex h-[min(52vh,380px)] w-[80vw] max-w-[340px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/12 bg-ink-soft p-7 transition-colors duration-300 hover:border-white/30 sm:w-[340px]"
    >
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-sm tracking-[0.25em] text-accent-2">
          {pad(i + 1)}
        </span>
        <span className="font-mono text-xl text-accent transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
      <div className="relative">
        <h3 className="font-display text-2xl font-bold leading-snug sm:text-3xl">
          {s.name}
        </h3>
        <p className="mt-3 line-clamp-4 leading-relaxed text-neutral-400">
          {s.blurb}
        </p>
      </div>
    </a>
  );
}

export default function ServicesScroll() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [{ distance, height, grid }, set] = useState({
    distance: 0,
    height: 0,
    grid: false,
  });

  useLayoutEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const small = window.matchMedia("(max-width: 767px)").matches;
      if (reduceMq.matches || small) {
        set({ distance: 0, height: 0, grid: true });
        return;
      }
      const track = trackRef.current;
      if (!track) return;
      const dist = Math.max(0, track.scrollWidth - window.innerWidth + 48);
      // Cap how long the section "pins" so the page doesn't get absurdly tall.
      const pin = Math.min(dist, Math.round(window.innerHeight * 2.2));
      set({ distance: dist, height: window.innerHeight + pin, grid: false });
    };
    measure();
    window.addEventListener("resize", measure);
    reduceMq.addEventListener?.("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      reduceMq.removeEventListener?.("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const header = (
    <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between gap-6 px-5 sm:px-8">
      <div className="max-w-xl">
        <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
          WHAT WE DO
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
          Seventeen services. One crew.
        </h2>
        <p className="mt-3 hidden leading-relaxed text-neutral-400 sm:block">
          Scroll sideways through everything we run — tap any to dive in.
        </p>
      </div>
      <a
        href="#/services"
        className="shrink-0 font-mono text-sm text-neutral-400 transition-colors hover:text-white"
      >
        All services →
      </a>
    </div>
  );

  // Mobile / reduced-motion: fall back to the plain vertical grid.
  if (grid) return <ServicesGrid />;

  return (
    <section
      id="services"
      ref={ref}
      style={{ height: height || undefined }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-8 pt-24 sm:pt-28">
        {header}

        <div className="flex min-h-0 flex-1 items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="services-track flex gap-5 px-5 will-change-transform sm:px-8"
          >
            {services.map((s, i) => (
              <Card key={s.slug} s={s} i={i} />
            ))}
          </motion.div>
        </div>

        {/* horizontal progress */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="h-px w-full bg-white/15">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-px origin-left bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
