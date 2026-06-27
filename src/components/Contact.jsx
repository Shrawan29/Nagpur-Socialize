import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { SITE, mailHref } from "../site.js";

// Retro pager / beeper contact card. The dark gadget shell + green LCD are
// fixed so it always reads as a physical device; the page theme shows through
// the accent button and the drifting CONTACT backdrop, so it adapts across
// every page theme. Animations: scroll-in rise, a live ticking LCD clock,
// cursor-driven 3D tilt with parallax-popped layers, an idle float, a pulsing
// screen glow, scanlines, a blinking cursor, staggered buttons and a marquee
// backdrop. Everything heavy is gated on prefers-reduced-motion.
const EASE = [0.4, 0, 0.2, 1];
const SPRING = { stiffness: 150, damping: 16, mass: 0.4 };

const BTN_VAR = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

export default function Contact() {
  const reduce = useReducedMotion();
  const time = useClock();
  const isExternal = (href) =>
    typeof href === "string" && href.startsWith("http");

  // Cursor-driven 3D tilt: pointer position → normalized -0.5..0.5 → springed
  // rotation. Reset to centre when the pointer leaves.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), SPRING);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      {/* Giant drifting word, themed via --color-fg, sitting behind the device */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center"
      >
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
          {Array(8)
            .fill("CONTACT")
            .map((w, i) => (
              <span
                key={i}
                className="px-6 font-poster text-[17vw] uppercase leading-none tracking-tight text-transparent"
                style={{ WebkitTextStroke: "2px var(--color-fg)", opacity: 0.07 }}
              >
                {w}
              </span>
            ))}
        </div>
      </div>

      {/* Perspective + scroll entrance */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 64 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-full max-w-2xl px-5"
        style={{ perspective: 1100 }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {/* Tilt + idle float layer */}
        <motion.div
          style={{
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 6, ease: "easeInOut", repeat: Infinity }
          }
        >
          <div className="rounded-[2.5rem] bg-gradient-to-b from-[#2c2c30] to-[#141416] p-4 shadow-2xl shadow-black/50 ring-1 ring-[rgba(255,255,255,0.08)] [transform-style:preserve-3d] sm:p-6">
            {/* LCD screen — popped forward for parallax */}
            <div
              className="pager-screen relative overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-[#2bef74] to-[#13cb59] px-6 py-7 font-mono text-[#08210f] [box-shadow:inset_0_2px_10px_rgba(0,0,0,0.25)] sm:px-9 sm:py-9"
              style={{ transform: "translateZ(28px)" }}
            >
              <div className="pager-scanlines pointer-events-none absolute inset-0" />
              <div className="relative flex items-center justify-between text-xs font-bold tracking-wider sm:text-sm">
                <span>2G</span>
                <span className="tabular-nums">{time}</span>
              </div>
              <p className="relative mt-6 text-center text-sm sm:text-base">
                Contact us via email
              </p>
              <a
                href={mailHref}
                className="relative mt-1.5 block break-all text-center text-xl font-bold leading-tight transition-opacity hover:opacity-80 sm:text-2xl md:text-[2rem]"
              >
                {SITE.email}
                <span className="pager-cursor" aria-hidden="true">
                  _
                </span>
              </a>
              <p className="relative mt-7 font-bold italic opacity-60">
                {SITE.name}
              </p>
            </div>

            {/* Controls — staggered in, popped forward a touch */}
            <motion.div
              className="mt-5 flex flex-wrap items-center gap-2.5 sm:flex-nowrap sm:gap-3"
              style={{ transform: "translateZ(14px)" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: reduce ? 0 : 0.4,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              {/* speaker grille */}
              <motion.div
                variants={BTN_VAR}
                className="flex shrink-0 -skew-x-12 gap-1 px-1 sm:px-2"
              >
                <span className="h-7 w-1.5 rounded-full bg-[rgba(255,255,255,0.16)]" />
                <span className="h-7 w-1.5 rounded-full bg-[rgba(255,255,255,0.16)]" />
                <span className="h-7 w-1.5 rounded-full bg-[rgba(255,255,255,0.16)]" />
              </motion.div>
              <PagerButton
                href={SITE.facebook}
                external={isExternal(SITE.facebook)}
              >
                Facebook
              </PagerButton>
              <PagerButton
                href={SITE.instagram}
                external={isExternal(SITE.instagram)}
              >
                Instagram
              </PagerButton>
              <PagerButton href={mailHref} primary>
                Contact Us
              </PagerButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PagerButton({ href, children, primary = false, external = false }) {
  const base =
    "flex-1 rounded-[1.1rem] px-2.5 py-3.5 text-center font-mono text-xs font-bold transition-transform duration-200 hover:-translate-y-0.5 sm:whitespace-nowrap sm:px-3 sm:text-sm";
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      variants={BTN_VAR}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className={
        primary
          ? `${base} bg-accent text-ink shadow-lg shadow-black/30`
          : `${base} bg-[rgba(255,255,255,0.05)] text-[#e9e9ec] ring-1 ring-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)]`
      }
    >
      {children}
    </motion.a>
  );
}
