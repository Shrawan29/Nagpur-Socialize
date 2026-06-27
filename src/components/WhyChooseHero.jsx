import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import WordStrip from "./WordStrip.jsx";

// "Why Choose Us" hero — flat bold block (ocean theme) with a load-in word
// reveal and a diagonal, continuously-scrolling word strip.
const TITLE = "Partnering for Exponential Growth.";
// Index of the word rendered as a hollow / outlined word for poster contrast.
const OUTLINE_WORD = 2; // "Exponential"

export default function WhyChooseHero() {
  const reduce = useReducedMotion();
  const words = TITLE.split(" ");

  // The page-change circular reveal (App.jsx) runs ~1.1s with this easing.
  // Hold the heading until the reveal finishes, then rise the words in with the
  // same easing so the two motions read as one coordinated sequence. (Under
  // reduced motion the router skips the reveal, so we don't wait.)
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

  return (
    <section className="relative overflow-hidden pt-28 pb-44 sm:pt-36 sm:pb-56">
      {/* ---- Content (sits above the diagonal strip) ---- */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          style={{ WebkitTextStroke: "0.02em currentColor", paintOrder: "stroke" }}
          className="max-w-6xl font-poster text-6xl uppercase leading-[0.95] tracking-tight sm:text-[150px] sm:leading-[0.92]"
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
              {/* break after "for" and "Exponential" → three stacked lines */}
              {(i === 1 || i === 2) && <br />}
            </Fragment>
          ))}
        </motion.h1>
      </div>

      {/* ---- Diagonal word strip ----
           Wipes in left→right on load, then the inner row scrolls forever. */}
      <WordStrip
        className="absolute left-1/2 top-[74%] z-10 w-[170%] -translate-x-1/2 -translate-y-1/2 -rotate-6"
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 1, delay: reduce ? 0.15 : REVEAL + 0.15, ease: REVEAL_EASE }}
      />
    </section>
  );
}
