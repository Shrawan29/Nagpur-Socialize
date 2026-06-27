import PageHero from "./PageHero.jsx";
import FeatureSection from "./FeatureSection.jsx";
import Marquee from "../components/Marquee.jsx";
import Contact from "../components/Contact.jsx";

const ITEMS = [
  {
    no: "01",
    title: "Concerts & music festivals",
    body: "Stage, sound, lights, talent and crowd flow — we build the full live experience and run the floor from soundcheck to the last song.",
  },
  {
    no: "02",
    title: "Weddings & private celebrations",
    body: "Multi-day productions with décor, entertainment and flawless logistics, so the family can actually enjoy the moment.",
  },
  {
    no: "03",
    title: "College fests & community events",
    body: "High-energy line-ups built for big crowds and tight budgets, engineered to trend across campus and the city.",
  },
  {
    no: "04",
    title: "End-to-end production",
    body: "Venue, permits, vendors, staging and on-ground crew — one team accountable for every moving part on the day.",
  },
];

export default function EventPage() {
  return (
    <>
      <PageHero
        tag="EVENTS"
        title="We produce events people remember."
        blurb="From concept to last-song-of-the-night, we handle the full production — venue, staging, sound, lights, talent and crowd flow. You dream it, we run the floor."
        ctaLabel="Plan your event"
      />
      <Marquee />
      <FeatureSection
        kicker="WHAT WE RUN"
        title="Every kind of night, handled end to end."
        items={ITEMS}
      />
      <Contact />
    </>
  );
}
