import PageHero from "./PageHero.jsx";
import ServicesGrid from "../components/ServicesGrid.jsx";
import Contact from "../components/Contact.jsx";

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        tag="SERVICES"
        title="Everything we do, in one place."
        blurb="Seventeen services across marketing, hospitality, production and brand — mix and match, or hand us the whole thing. Tap any service to see what's inside."
        backHref="#/"
        backLabel="Home"
        ctaLabel="Book a consultation"
      />
      <ServicesGrid showHeader={false} />
      <Contact />
    </>
  );
}
