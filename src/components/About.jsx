import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";

/* "Who We Are" — CONCEPT B, kinetic typography. The copy is untouched; the
   TYPE is the design. The oversized heading reveals word-by-word with a rise +
   de-blur, one key word ("whole") carries the looping hero-accent shine and
   another ("experience.") is rendered as an outlined text-stroke word. An SVG
   accent scribble draws in beneath the heading via pathLength, ✦ marks twinkle,
   and a giant faint Anton ghost word parallaxes behind on scroll. Everything is
   reduced-motion safe and only animates transform / opacity / filter. */

const EASE = [0.22, 1, 0.36, 1];
const HEADING = "One team for the whole experience.";
const WORDS = HEADING.split(" ");
// indices into WORDS that get special treatment
const SHINE_WORD = 4; // "whole"
const STROKE_WORD = 5; // "experience."

export default function About() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // Scroll-linked parallax: the ghost word and the foreground type drift at
  // different speeds as the section travels through the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawGhost = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rawHead = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ghostY = useSpring(rawGhost, { stiffness: 60, damping: 20, mass: 0.6 });
  const headY = useSpring(rawHead, { stiffness: 80, damping: 22, mass: 0.5 });
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 0.06, 0.06, 0]
  );

  // Word reveal: soft rise + de-blur, staggered. Reduced motion → plain fade.
  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.06,
        staggerChildren: reduce ? 0.03 : 0.085,
      },
    },
  };
  const word = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: "0.5em", filter: "blur(12px)" },
        show: {
          opacity: 1,
          y: "0em",
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
      };
  const soft = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }
    : {
        hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
      };

  // The underline scribble draws itself in once the heading is mostly read.
  const draw = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        show: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.1, ease: EASE, delay: 0.45 },
        },
      };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden px-5 py-28 sm:px-8 sm:py-36"
    >
      {/* faint dot texture, masked toward the type */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 text-white opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 40% 45%, #000 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 40% 45%, #000 25%, transparent 100%)",
        }}
      />

      {/* soft ambient accent glow — slowly breathes + drifts behind the heading */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[26%] -z-10 h-72 w-72 rounded-full bg-accent/15 blur-[110px] will-change-transform sm:h-96 sm:w-96"
        animate={
          reduce
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.45, 0.8, 0.45], x: [0, 28, 0], y: [0, -22, 0] }
        }
        transition={
          reduce ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* GIANT ghost word — pure decoration, parallaxes on scroll. */}
      <motion.span
        aria-hidden
        style={reduce ? { opacity: 0.05 } : { y: ghostY, opacity: ghostOpacity }}
        className="pointer-events-none absolute -left-[6%] top-[8%] -z-10 select-none whitespace-nowrap font-poster text-[28vw] uppercase leading-none tracking-tight text-white"
      >
        SOCIALIZE
      </motion.span>

      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:items-end lg:gap-16"
        >
          {/* ---- LEFT: the kinetic headline ---- */}
          <motion.div style={reduce ? undefined : { y: headY }} className="relative">
            <motion.p
              variants={soft}
              className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-accent-2"
            >
              <span className="h-px w-8 bg-accent-2/70" aria-hidden />
              WHO WE ARE
            </motion.p>

            <h2 className="relative mt-6 font-display font-bold uppercase leading-[0.92] tracking-[-0.01em] text-white [text-wrap:balance] text-[clamp(2.75rem,9vw,7rem)]">
              {WORDS.map((w, i) => {
                const isShine = i === SHINE_WORD;
                const isStroke = i === STROKE_WORD;
                return (
                  <span
                    key={i}
                    className="mr-[0.26em] inline-block overflow-hidden align-bottom pb-[0.08em]"
                  >
                    <motion.span
                      variants={word}
                      className={"inline-block " + (isShine ? "hero-accent" : "")}
                      style={
                        isStroke
                          ? {
                              WebkitTextStroke: "1.5px var(--color-accent-3)",
                              WebkitTextFillColor: "transparent",
                              color: "transparent",
                            }
                          : undefined
                      }
                    >
                      {w}
                    </motion.span>
                  </span>
                );
              })}

              {/* hand-drawn accent scribble that draws under the headline */}
              <motion.svg
                aria-hidden
                viewBox="0 0 600 36"
                preserveAspectRatio="none"
                className="pointer-events-none mt-1 block h-3 w-[min(78%,30rem)] overflow-visible sm:h-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
              >
                <motion.path
                  variants={draw}
                  d="M4 24 C 120 6, 230 8, 330 18 S 520 30, 596 12"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </motion.svg>
            </h2>
          </motion.div>

          {/* ---- RIGHT: the two paragraphs ---- */}
          <div className="relative space-y-6 lg:pb-3">
            {/* slim accent guide rule that draws down on reveal */}
            <motion.span
              aria-hidden
              variants={
                reduce
                  ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                  : {
                      hidden: { scaleY: 0 },
                      show: { scaleY: 1, transition: { duration: 0.9, ease: EASE } },
                    }
              }
              className="absolute -left-5 top-1 hidden h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent lg:block"
            />
            <motion.p
              variants={soft}
              className="text-lg leading-relaxed text-neutral-300 sm:text-xl"
            >
              Nagpur Socialize is a creative marketing and experiential agency
              helping brands, venues, restaurants and businesses build memorable
              experiences — through strategic planning, influencer
              collaborations, hospitality solutions and flawless event
              execution.
            </motion.p>
            <motion.p
              variants={soft}
              className="text-lg leading-relaxed text-neutral-400 sm:text-xl"
            >
              We&apos;re not just an event company. From the first idea to the
              post-event report, we plan it, produce it, staff it and measure it
              — so you get one accountable partner instead of ten moving parts.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
