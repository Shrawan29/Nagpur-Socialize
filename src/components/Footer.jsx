import { SITE } from "../site.js";
import { services } from "../data/index.js";

const SOCIALS = [
  { label: "Instagram", href: SITE.instagram },
  { label: "YouTube", href: SITE.youtube },
  { label: "LinkedIn", href: SITE.linkedin },
];

const EXPLORE = [
  { label: "Home", href: "#/" },
  { label: "Events", href: "#/events" },
  { label: "Articles", href: "#/articles" },
  { label: "Why Choose Us", href: "#/why-choose-us" },
  { label: "About Us", href: "#/about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const topServices = services.slice(0, 6);

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#/" aria-label="Nagpur Socialize — home">
              <img
                src="/logo-mark.png"
                alt="Nagpur Socialize"
                className="site-logo h-10 w-auto"
                draggable="false"
              />
            </a>
            <p className="mt-5 max-w-xs leading-relaxed text-neutral-400">
              A full-service experiential marketing, hospitality and event
              agency turning brands and moments into experiences people
              don&apos;t stop talking about.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-white/10 px-4 py-2 text-neutral-300 transition-colors hover:border-accent hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore" links={EXPLORE} />

          <FooterCol
            title="Services"
            links={[
              ...topServices.map((s) => ({
                label: s.name,
                href: `#/services/${s.slug}`,
              })),
              { label: "All services →", href: "#/services" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-6 font-mono text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
              {SITE.email}
            </a>
            <span>{SITE.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-accent-2">
        {title.toUpperCase()}
      </p>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-neutral-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
