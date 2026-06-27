const ITEMS = [
  "Experiential Marketing",
  "Influencer Campaigns",
  "Brand Launches",
  "Hospitality",
  "Artist Management",
  "PR & Media",
  "Bar Takeovers",
  "Curated Events",
  "Venue Partnerships",
  "Production & Stage",
];

function Row({ reverse = false }) {
  return (
    <div
      className={`flex w-max shrink-0 items-center gap-6 pr-6 ${
        reverse ? "animate-marquee-rev" : "animate-marquee"
      }`}
    >
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span key={i} className="flex items-center gap-6">
          <span className="font-display text-3xl font-bold text-neutral-600 sm:text-4xl">
            {item}
          </span>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative flex overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <Row />
      <Row />
    </div>
  );
}
