import PageHero from "./PageHero.jsx";
import Contact from "../components/Contact.jsx";

export default function NotFound({
  title = "Page not found",
  blurb = "This link doesn't exist. Let's get you back on track.",
  backHref = "#/",
  backLabel = "Home",
}) {
  return (
    <>
      <PageHero
        tag="404"
        title={title}
        blurb={blurb}
        backHref={backHref}
        backLabel={backLabel}
        ctaLabel="Back home"
        ctaHref="#/"
      />
      <Contact />
    </>
  );
}
