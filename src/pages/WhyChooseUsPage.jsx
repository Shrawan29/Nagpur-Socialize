import WhyChooseHero from "../components/WhyChooseHero.jsx";
import WhyUs from "../components/WhyUs.jsx";
import Solutions from "../components/Solutions.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Contact from "../components/Contact.jsx";

export default function WhyChooseUsPage() {
  return (
    <>
      <WhyChooseHero />
      <WhyUs showHeader />
      <Solutions />
      <Testimonials />
      <Contact />
    </>
  );
}
