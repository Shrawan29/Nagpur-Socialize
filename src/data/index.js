// Single source of truth for site copy. The arrays are generated into
// content.json (see the content workflow); this module exposes them plus a few
// lookup helpers and the per-page theme assignment used by the router.
import content from "./content.json";

export const services = content.services ?? [];
export const solutions = content.solutions ?? [];
export const clients = content.clients ?? [];
export const portfolio = content.portfolio ?? [];
export const testimonials = content.testimonials ?? [];
export const posts = content.posts ?? [];

// The four bold flat-colour themes the site already ships with. Sub-pages cycle
// through them so navigating keeps the playful colour shifts.
const THEMES = ["midnight", "sunset", "emerald", "ocean"];

export function serviceTheme(slug) {
  const i = services.findIndex((s) => s.slug === slug);
  return THEMES[(i < 0 ? 0 : i) % THEMES.length];
}
export function solutionTheme(slug) {
  const i = solutions.findIndex((s) => s.slug === slug);
  return THEMES[(i < 0 ? 1 : i + 1) % THEMES.length];
}

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);
export const solutionBySlug = (slug) => solutions.find((s) => s.slug === slug);
export const caseStudyBySlug = (slug) => portfolio.find((p) => p.slug === slug);
export const postBySlug = (slug) => posts.find((p) => p.slug === slug);

// Resolve a list of service slugs to {slug, name} for "related" chips.
export const resolveServices = (slugs = []) =>
  slugs
    .map((slug) => {
      const s = serviceBySlug(slug);
      return s ? { slug: s.slug, name: s.name } : null;
    })
    .filter(Boolean);
