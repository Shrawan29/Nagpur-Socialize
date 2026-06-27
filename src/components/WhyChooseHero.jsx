import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import WordStrip from "./WordStrip.jsx";

// "Why Choose Us" hero.
//   Desktop (lg+): the original padded block — centered content, big three-line
//   headline, and the tilted ribbon crossing it.
//   Mobile/tablet (<lg): a full-height poster — headline flush to the extreme
//   left, the ribbon below it, and minimalist corner anchor labels.
const TITLE = "Partnering for Exponential Growth.";
const OUTLINE_WORD = 2; // "Exponential" → hollow word for poster contrast

export default function WhyChooseHero() {
  const reduce = useReducedMotion();
  const words = TITLE.split(" ");

  const REVEAL = 1.05;
  const REVEAL_EASE = [0.4, 0, 0.2, 1];

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0.1 : REVEAL,
        staggerChildren: reduce ? 0.05 : 0.12,
      },
    },
  };
  const wordVar = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { y: 36, opacity: 0, filter: "blur(10px)" },
        show: {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: REVEAL_EASE },
        },
      };

  // Mobile anchor points fade up once the headline has landed.
  const anchorWrap = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0.2 : REVEAL + 0.55,
        staggerChildren: 0.1,
      },
    },
  };
  const anchor = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: REVEAL_EASE } },
      };

  // Both ribbons wipe in left→right on load, then scroll forever.
  const ribbon = {
    initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0 0)" },
    transition: {
      duration: 1,
      delay: reduce ? 0.15 : REVEAL + 0.15,
      ease: REVEAL_EASE,
    },
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pr-5 pt-28 pb-10 sm:pr-8 sm:pt-32 sm:pb-14 lg:block lg:min-h-0 lg:px-8 lg:pt-36 lg:pb-56">
      {/* ---- Top: mobile corner anchors + the headline ---- */}
      <div className="relative z-20 w-full max-w-7xl lg:mx-auto">
        {/* eyebrow anchors — mobile only */}
        <motion.div
          variants={anchorWrap}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between font-mono text-xs tracking-[0.3em] lg:hidden"
        >
          <motion.span variants={anchor} className="tracking-[0.35em] text-accent-2">
            WHY CHOOSE US
          </motion.span>
          <motion.span variants={anchor} className="text-neutral-500">
            (01)
          </motion.span>
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          style={{ WebkitTextStroke: "0.02em currentColor", paintOrder: "stroke" }}
          className="mt-5 max-w-6xl font-poster text-[clamp(4.5rem,22vw,150px)] uppercase leading-[0.9] tracking-tight sm:mt-8 lg:mt-0"
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              <motion.span
                variants={wordVar}
                style={
                  i === OUTLINE_WORD
                    ? {
                        color: "transparent",
                        WebkitTextStroke: "0.025em var(--color-fg, #0a0a0a)",
                      }
                    : undefined
                }
                className="mr-[0.18em] inline-block"
              >
                {w}
              </motion.span>
              {/* mobile: each word on its own line; desktop: break after "for"
                  and "Exponential" → three lines */}
              {i === 0 && <br className="lg:hidden" />}
              {(i === 1 || i === 2) && <br />}
            </Fragment>
          ))}
        </motion.h1>

        {/* Mobile ribbon — sits below the headline (lg uses the crossing one) */}
        <WordStrip
          className="relative left-1/2 z-10 mt-10 w-[190%] -translate-x-1/2 -rotate-[7deg] sm:mt-14 lg:hidden"
          {...ribbon}
        />
      </div>

      {/* ---- Bottom: mobile corner anchors framing the negative space ---- */}
      <motion.div
        variants={anchorWrap}
        initial="hidden"
        animate="show"
        className="relative z-20 flex w-full max-w-7xl items-end justify-between font-mono text-[0.7rem] tracking-[0.3em] text-neutral-500 lg:hidden"
      >
        <motion.span variants={anchor}>SCROLL ↓</motion.span>
        <motion.span variants={anchor} className="hidden sm:block">
          PARTNERSHIP · ENERGY · GROWTH
        </motion.span>
      </motion.div>

      {/* ---- Desktop ribbon — crosses the headline (original layout) ---- */}
      <WordStrip
        className="absolute left-1/2 top-[74%] z-10 hidden w-[170%] -translate-x-1/2 -translate-y-1/2 -rotate-6 lg:block"
        {...ribbon}
      />
    </section>
  );
}
