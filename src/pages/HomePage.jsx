import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import About from "../components/About.jsx";
import ServicesAccordion from "../components/ServicesAccordion.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Contact from "../components/Contact.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <ServicesAccordion />
      <Testimonials />
      <Contact />
    </>
  );
}
