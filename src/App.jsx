import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { matchRoute, HOME } from "./router.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import EventPage from "./pages/EventPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import WhyChooseUsPage from "./pages/WhyChooseUsPage.jsx";
import ServicesIndex from "./pages/ServicesIndex.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import WorkIndex from "./pages/WorkIndex.jsx";
import CaseStudyPage from "./pages/CaseStudyPage.jsx";

// Last pointer position — used as the origin of the circular reveal so the
// theme switch expands from wherever the link was clicked.
let lastPointer = { x: 0, y: 0 };

function renderRoute(route) {
  switch (route.name) {
    case "events":
      return <EventPage />;
    case "articles":
      return <ArticlesPage />;
    case "post":
      return <BlogPostPage slug={route.slug} />;
    case "about":
      return <AboutPage />;
    case "whychoose":
      return <WhyChooseUsPage />;
    case "services":
      return <ServicesIndex />;
    case "service":
      return <ServicePage slug={route.slug} />;
    case "work":
      return <WorkIndex />;
    case "casestudy":
      return <CaseStudyPage slug={route.slug} />;
    case "home":
    default:
      return <HomePage />;
  }
}

export default function App() {
  const [route, setRoute] = useState(() => matchRoute(window.location.hash) || HOME);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", route.theme);
    lastPointer = { x: window.innerWidth / 2, y: 24 };

    const onPointer = (e) => {
      lastPointer = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointerdown", onPointer, true);

    // Switch pages behind a circular reveal that expands from the click point.
    const onHash = () => {
      const next = matchRoute(window.location.hash);
      if (!next) return; // in-page anchor — let the browser scroll

      const apply = () => {
        document.documentElement.setAttribute("data-theme", next.theme);
        flushSync(() => setRoute(next));
        window.scrollTo({ top: 0 });
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!document.startViewTransition || reduceMotion) {
        apply();
        return;
      }

      const { x, y } = lastPointer;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.startViewTransition(apply).ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 1100,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    };

    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("pointerdown", onPointer, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grain min-h-screen bg-ink text-white">
      <Header route={route} />
      <main>{renderRoute(route)}</main>
      <Footer />
    </div>
  );
}
