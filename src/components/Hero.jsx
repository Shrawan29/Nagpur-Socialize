import { useMemo } from "react";
import { motion } from "motion/react";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const DOT_COLORS = ["bg-accent", "bg-accent-2", "bg-accent-3", "bg-white"];

export default function Hero() {
  // Gently floating confetti / sparkle particles.
  const confetti = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 96 + 2,
        top: Math.random() * 92 + 4,
        size: 5 + Math.random() * 9,
        color: DOT_COLORS[i % DOT_COLORS.length],
        round: Math.random() > 0.45,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 5,
        drift: 18 + Math.random() * 40,
      })),
    []
  );

  return (
    <section className="relative overflow-hidden pt-40 pb-28 sm:pt-52 sm:pb-40">
      {/* faint dotted grid, masked to the centre */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "38px 38px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 35% 35%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 35% 35%, #000 30%, transparent 100%)",
        }}
      />

      {/* floating confetti particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className={`absolute ${c.color} ${c.round ? "rounded-full" : "rounded-[2px]"}`}
            style={{ left: `${c.left}%`, top: `${c.top}%`, width: c.size, height: c.size }}
            animate={{
              y: [0, -c.drift, 0],
              rotate: [0, 80, 0],
              opacity: [0.12, 0.45, 0.12],
            }}
            transition={{
              duration: c.dur,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-neutral-400 sm:tracking-[0.35em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          EXPERIENTIAL · HOSPITALITY · EVENTS — NAGPUR, INDIA
        </motion.p>

        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-8 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-8xl"
        >
          Experiences that connect{" "}
          <span className="text-accent">brands &amp; people.</span>
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1.5}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl"
        >
          A full-service agency for events, hospitality, influencer marketing,
          venue partnerships, artist management, brand development and
          experiential campaigns — planned, produced and measured under one
          roof.
        </motion.p>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <a
            href="#contact"
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
          >
            BOOK A CONSULTATION
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#/work"
            className="group inline-flex items-center gap-2 py-2.5 font-mono text-sm font-bold text-neutral-300 transition-colors duration-200 hover:text-white"
          >
            VIEW OUR WORK
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
