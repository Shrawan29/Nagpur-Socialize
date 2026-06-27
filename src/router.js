import { serviceTheme } from "./data/index.js";

export const HOME = { name: "home", theme: "midnight" };

// Parse the URL hash into a route descriptor.
//   Routes use a leading slash:  #/services/influencer-collaborations
//   In-page anchors do NOT:       #contact   #work
// Returning null for an anchor lets the browser scroll natively instead of
// triggering a page/theme transition.
export function matchRoute(hash) {
  const raw = (hash || "").replace(/^#/, "");
  if (raw === "" || raw === "/" || raw === "/home") return HOME;
  if (!raw.startsWith("/")) return null; // in-page anchor

  const [a, b] = raw.replace(/^\//, "").split("/").filter(Boolean);

  switch (a) {
    case "events":
      return { name: "events", theme: "sunset" };
    case "articles":
      return b
        ? { name: "post", slug: b, theme: "emerald" }
        : { name: "articles", theme: "emerald" };
    case "why-choose-us":
      return { name: "whychoose", theme: "ocean" };
    case "about":
      return { name: "about", theme: "midnight" };
    case "services":
      return b
        ? { name: "service", slug: b, theme: serviceTheme(b) }
        : { name: "services", theme: "midnight" };
    case "solutions":
      // Solutions no longer have their own pages — any old /#/solutions link
      // lands on the Why Choose Us page, which holds the Solutions deck.
      return { name: "whychoose", theme: "ocean" };
    case "work":
      return b
        ? { name: "casestudy", slug: b, theme: "sunset" }
        : { name: "work", theme: "midnight" };
    default:
      return HOME;
  }
}

// Top-level tab a given route belongs under (for nav active states).
export function activeTab(name) {
  if (name === "post" || name === "articles") return "articles";
  return name; // home | events | about | (service/solution/work → none)
}
