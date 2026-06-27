import Reveal from "./Reveal.jsx";
import StaggerTestimonials from "./StaggerTestimonials.jsx";
import { testimonials } from "../data/index.js";

export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="py-16 sm:py-20">
      {/* heading stays padded + width-capped */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-8 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.3em] text-accent-2">
            TESTIMONIALS
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Don&apos;t take our word for it.
          </h2>
        </Reveal>
      </div>

      {/* carousel gets full width — no side padding to clip the fan */}
      <StaggerTestimonials />
    </section>
  );
}