import { useState, useEffect, useCallback, useRef } from "react";
import { testimonials as DATA } from "../data/index.js";

// Stagger testimonials, autoplay only. Renders just a window of cards around
// the center (±MAX_OFFSET) so the fan never spills past the container and gets
// clipped — the rest of the list still rotates through, just isn't drawn.
const SQRT_5000 = Math.sqrt(5000);

const buildList = (items) =>
  items.map((t, i) => ({
    id: i,
    quote: t.quote,
    by: `${t.author}${t.role ? `, ${t.role}` : ""}${
      t.company ? ` · ${t.company}` : ""
    }`,
  }));

function TestimonialCard({ position, item, cardSize, onMove, animate }) {
  const isCenter = position === 0;
  return (
    <button
      type="button"
      tabIndex={isCenter ? -1 : 0}
      aria-current={isCenter ? "true" : undefined}
      aria-label={isCenter ? undefined : `Show testimonial from ${item.by}`}
      onClick={() => onMove(position)}
      className={`absolute left-1/2 top-1/2 flex select-none flex-col justify-between border-2 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:p-8 ${
        animate ? "transition-all duration-500 ease-in-out" : ""
      } ${
        isCenter
          ? "z-10 cursor-default border-accent bg-accent text-ink"
          : "z-0 cursor-pointer border-white/15 bg-ink-soft text-white hover:border-accent/60"
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `translate(-50%, -50%) translateX(${
          (cardSize / 1.5) * position
        }px) translateY(${isCenter ? -45 : position % 2 ? 15 : -15}px) rotate(${
          isCenter ? 0 : position % 2 ? 2.5 : -2.5
        }deg)`,
        boxShadow: isCenter ? "0px 8px 0px 4px var(--color-fg)" : "none",
      }}
    >
      <span
        className="pointer-events-none absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          background: "var(--color-fg)",
          opacity: 0.15,
        }}
      />
      <h3
        className={`font-display text-lg font-bold leading-snug sm:text-xl ${
          isCenter ? "text-ink" : "text-white"
        }`}
      >
        &ldquo;{item.quote}&rdquo;
      </h3>
      <p
        className={`mt-6 font-mono text-xs leading-relaxed ${
          isCenter ? "text-ink/80" : "text-neutral-500"
        }`}
      >
        — {item.by}
      </p>
    </button>
  );
}

export default function StaggerTestimonials({ items = DATA, interval = 4500 }) {
  const [cardSize, setCardSize] = useState(340);
  const [maxOffset, setMaxOffset] = useState(2); // how many cards each side
  const [list, setList] = useState(() => buildList(items));
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const uidRef = useRef(items.length);
  const pointerX = useRef(null);
  const suppressClick = useRef(false);
  const stageHeight = cardSize + 150;

  const move = useCallback((steps) => {
    if (!steps) return;
    setList((prev) => {
      const next = [...prev];
      const n = Math.abs(steps);
      for (let i = 0; i < n; i++) {
        if (steps > 0) {
          const it = next.shift();
          if (!it) return prev;
          next.push({ ...it, id: uidRef.current++ });
        } else {
          const it = next.pop();
          if (!it) return prev;
          next.unshift({ ...it, id: uidRef.current++ });
        }
      }
      return next;
    });
  }, []);

  // Responsive card size + how wide the visible window is
  useEffect(() => {
    const update = () => {
      const wide = window.matchMedia("(min-width: 640px)").matches;
      setCardSize(wide ? 340 : 260);
      setMaxOffset(wide ? 2 : 1); // ±2 desktop (5 cards), ±1 mobile (3 cards)
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => move(1), interval);
    return () => clearInterval(id);
  }, [paused, reducedMotion, interval, move]);

  // Pointer swipe (touch + mouse drag)
  const onPointerDown = (e) => {
    pointerX.current = e.clientX;
    suppressClick.current = false;
  };
  const onPointerUp = (e) => {
    if (pointerX.current == null) return;
    const dx = e.clientX - pointerX.current;
    if (Math.abs(dx) > 50) {
      suppressClick.current = true;
      move(dx < 0 ? 1 : -1);
    }
    pointerX.current = null;
  };
  const onCardMove = (position) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    move(position);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="w-full"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: stageHeight, touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {list.map((item, index) => {
          const position =
            list.length % 2
              ? index - (list.length + 1) / 2
              : index - list.length / 2;

          // only draw the window around center; skip the rest so nothing
          // fans past the frame to be clipped
          if (Math.abs(position) > maxOffset) return null;

          return (
            <TestimonialCard
              key={item.id}
              item={item}
              position={position}
              cardSize={cardSize}
              onMove={onCardMove}
              animate={!reducedMotion}
            />
          );
        })}
      </div>
    </div>
  );
}