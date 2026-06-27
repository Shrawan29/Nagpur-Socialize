import { motion } from "motion/react";

// Shared hero used at the top of each sub-page (clears the fixed header).
// Optional back-link breadcrumb, flexible CTA, and a children slot for meta.
export default function PageHero({
  tag,
  title,
  blurb,
  ctaLabel = "Book a consultation",
  ctaHref = "#contact",
  backLabel,
  backHref,
  children,
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {backHref && (
          <motion.a
            href={backHref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs tracking-wide text-neutral-400 transition-colors hover:text-white"
          >
            <span>←</span> {backLabel}
          </motion.a>
        )}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] text-accent-2"
        >
          {tag}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[0.98] tracking-tight break-words sm:text-7xl"
        >
          {title}
        </motion.h1>

        {blurb && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg"
          >
            {blurb}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}

        {ctaLabel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-10"
          >
            <a
              href={ctaHref}
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-sm font-bold shadow-xl shadow-black/20 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {ctaLabel}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
