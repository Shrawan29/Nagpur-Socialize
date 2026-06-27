import PageHero from "./PageHero.jsx";
import Work from "../components/Work.jsx";
import Contact from "../components/Contact.jsx";

export default function WorkIndex() {
  return (
    <>
      <PageHero
        tag="OUR WORK"
        title="Nights worth talking about."
        blurb="A look at the launches, festivals, takeovers and campaigns we've produced across Nagpur and beyond. Tap any project for the full story."
        backHref="#/"
        backLabel="Home"
        ctaLabel="Start a project"
      />
      <Work showHeader={false} />
      <Contact />
    </>
  );
}
