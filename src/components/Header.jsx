import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo.jsx";
import { activeTab } from "../router.js";

// Four top-level tabs only (Home / Events / Articles / About Us). Everything
// else — services, solutions, work, blog posts — lives one level down on its
// own shareable URL, reachable from the page sections and the footer.
const NAV_LINKS = [
  { label: "HOME", href: "#/", tab: "home" },
  { label: "EVENTS", href: "#/events", tab: "events" },
  { label: "ARTICLES", href: "#/articles", tab: "articles" },
  { label: "WHY CHOOSE US", href: "#/why-choose-us", tab: "whychoose" },
];

export default function Header({ route }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const current = activeTab(route?.name);

  // Bar style on scroll + hide-on-scroll-down / reveal-on-scroll-up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      setHidden(y > lastY.current && y > 90);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1 px-2 py-2 font-mono text-sm tracking-wide">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current={current === link.tab ? "page" : undefined}
                    className={`relative block px-4 py-2 transition-colors duration-200 hover:text-white ${
                      current === link.tab ? "text-white" : "text-neutral-300"
                    }`}
                  >
                    {link.label}
                    {current === link.tab && (
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-pill text-white md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-5 md:hidden"
          >
            <ul className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/5 bg-pill/95 p-2 font-mono text-sm tracking-wide backdrop-blur-xl">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={current === link.tab ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 transition-colors hover:bg-white/10 hover:text-white ${
                      current === link.tab ? "text-white" : "text-neutral-300"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
