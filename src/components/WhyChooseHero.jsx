import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import WordStrip from "./WordStrip.jsx";

// "Why Choose Us" hero — a full-bleed poster built on four moves:
//   1. ultra-bold, display-scale typography (one hollow word for contrast),
//   2. a tilted marquee ribbon that breaks the grid (full-bleed, off-axis),
//   3. intentional negative space (headline up top, markers at the bottom,
//      a deliberate open band between them that the ribbon crosses),
//   4. minimalist anchor points — small mono labels framing the corners.
const TITLE = "Partnering for Exponential Growth.";
const OUTLINE_WORD = 2; // "Exponential" → hollow word for poster contrast

export default function WhyChooseHero() {
  const reduce = useReducedMotion();
  const words = TITLE.split(" ");

  // The page-change circular reveal (App.jsx) runs ~1.1s; hold the headline
  // until it finishes, then rise the words in with the same easing.
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

  // Anchor points fade up once the headline has landed.
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

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pt-28 pb-10 sm:px-8 sm:pt-32 sm:pb-14">
      {/* ---- Top: minimalist anchors + the ultra-bold headline ---- */}
      <div className="relative z-20 mx-auto w-full max-w-7xl">
        <motion.div
          variants={anchorWrap}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between font-mono text-xs tracking-[0.3em]"
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
          className="mt-5 max-w-6xl font-poster text-[clamp(4.5rem,22vw,170px)] uppercase leading-[1.5] tracking-tight sm:mt-8 lg:leading-[0.9]"
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
              {/* mobile: each word on its own line (taller, fills the hero);
                  desktop: break after "for" and "Exponential" → three lines */}
              {i === 0 && <br className="lg:hidden" />}
              {(i === 1 || i === 2) && <br />}
            </Fragment>
          ))}
        </motion.h1>
      </div>

      {/* ---- Bottom: minimalist anchor points framing the negative space ---- */}
      <motion.div
        variants={anchorWrap}
        initial="hidden"
        animate="show"
        className="relative z-20 mx-auto flex w-full max-w-7xl items-end justify-between font-mono text-[0.7rem] tracking-[0.3em] text-neutral-500"
      >
        <motion.span variants={anchor}>SCROLL ↓</motion.span>
        <motion.span variants={anchor} className="hidden sm:block">
          PARTNERSHIP · ENERGY · GROWTH
        </motion.span>
      </motion.div>

      {/* ---- Tilted marquee ribbon — breaks the grid (full-bleed, off-axis) ---- */}
      <WordStrip
        className="absolute left-1/2 top-[58%] z-10 w-[190%] -translate-x-1/2 -translate-y-1/2 -rotate-[7deg] lg:top-[64%]"
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 1, delay: reduce ? 0.15 : REVEAL + 0.15, ease: REVEAL_EASE }}
      />
    </section>
  );
}
