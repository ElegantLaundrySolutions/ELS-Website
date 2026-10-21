import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import IndustriesServed from "@/components/IndustriesServed";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer, { WhatsAppFab } from "@/components/Footer";
import { startSmoothScroll } from "@/lib/scroll";

const Index = () => {
  useEffect(() => startSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-[80] rounded-full bg-ink px-4 py-2 text-linen focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <Services />
        <IndustriesServed />
        <WhyChooseUs />
        <About />
        <Gallery />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  );
};

export default Index;
