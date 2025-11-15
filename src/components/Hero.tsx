import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-laundry.jpg";

const Hero = () => {
  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 content-container text-center text-white">
        <div className="max-w-5xl mx-auto fade-in px-4">
          <h1 className="hero-title mb-6 md:mb-8 text-white">
            Professional Laundry Solutions for Hotels, Restaurants & Lodges
          </h1>
          <p className="hero-subtitle mb-8 md:mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Specialized in bulk laundry with reliable pickup, hygiene assurance, and on-time delivery. 
            Trusted by leading hospitality businesses across the region.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center scale-in max-w-md sm:max-w-none mx-auto">
            <Button 
              onClick={handleScrollToContact}
              className="mobile-button bg-white text-primary hover:bg-white/90 shadow-premium font-semibold"
            >
              Get Quote
            </Button>
            <Button 
              onClick={handleScrollToContact}
              variant="outline" 
              className="mobile-button bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm font-semibold"
            >
              Contact Us
            </Button>
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 max-w-3xl mx-auto">
            <div className="text-center slide-up">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">10+</div>
              <div className="text-sm md:text-base text-white/80 font-medium">Years Experience</div>
            </div>
            <div className="text-center slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">500+</div>
              <div className="text-sm md:text-base text-white/80 font-medium">Happy Clients</div>
            </div>
            <div className="text-center slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">24/7</div>
              <div className="text-sm md:text-base text-white/80 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;