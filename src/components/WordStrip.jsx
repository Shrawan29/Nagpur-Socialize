import { motion } from "motion/react";

// Diagonal teal word strip used across the Why Choose Us page. Renders a
// continuously-scrolling marquee band; the caller positions/rotates it via
// `className` and drives its entrance with standard motion props (initial /
// animate / whileInView / transition), which are spread onto the band.
const DEFAULT_WORDS = ["collaborate", "partner", "innovate", "create"];

export default function WordStrip({
  words = DEFAULT_WORDS,
  reverse = false,
  className = "",
  ...rest
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none flex overflow-hidden bg-accent py-2.5 shadow-lg shadow-black/10 sm:py-3.5 ${className}`}
      {...rest}
    >
      <div
        className={`flex w-max shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {Array(6)
          .fill(words)
          .flat()
          .map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display text-2xl font-extrabold uppercase tracking-wide text-ink sm:text-4xl"
            >
              {w}
              <span className="text-ink/70">•</span>
            </span>
          ))}
      </div>
    </motion.div>
  );
}
