import PageHero from "./PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import ClientsWall from "../components/ClientsWall.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Contact from "../components/Contact.jsx";

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="ABOUT US"
        title="Big nights, run by one crew."
        blurb="Nagpur Socialize is a full-service experiential, hospitality and events agency — a tight team of strategists, producers, designers and floor managers turning the city's biggest moments into experiences people don't stop talking about."
        ctaLabel="Say hello"
      />

      <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
        <Reveal className="grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            We started with one sold-out night — and never looked back.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-neutral-400">
            <p>
              What began as a few friends throwing concerts in Nagpur has grown
              into a full-service agency for brands, venues and businesses. We
              now run the whole experience — strategy, influencer marketing,
              hospitality, venue partnerships, artist management, production and
              the report that proves it worked.
            </p>
            <p>
              We&apos;re a one-stop shop on purpose. It means the team you meet
              is the team that delivers — accountable for every cable, cue,
              guest and number from the first call to the final wrap.
            </p>
          </div>
        </Reveal>
      </section>

      <ClientsWall />
      <Testimonials />
      <Contact />
    </>
  );
}
