import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import IndustriesServed from "@/components/IndustriesServed";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const Index = () => {
  useScrollAnimations();

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <IndustriesServed />
      <WhyChooseUs />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;