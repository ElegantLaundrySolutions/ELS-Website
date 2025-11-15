import { Bed, Droplets, Shirt, Recycle } from "lucide-react";

const services = [
  {
    icon: Bed,
    title: "Linen Washing",
    description: "Professional cleaning of bed sheets, pillowcases, and comforters with hospital-grade processes and careful handling.",
    features: ["Stain removal", "Sanitization", "Professional pressing"]
  },
  {
    icon: Shirt,
    title: "Staff Uniforms",
    description: "Keep your team looking professional with crisp, clean uniforms. Color protection and expert care included.",
    features: ["Color protection", "Professional pressing", "Damage prevention"]
  },
  {
    icon: Droplets,
    title: "Towels",
    description: "Fresh, fluffy towels cleaned with advanced washing systems and proper drying techniques for maximum softness.",
    features: ["Softness guaranteed", "Odor elimination", "Quick turnaround"]
  },
  {
    icon: Recycle,
    title: "Curtains",
    description: "Expert care for window treatments and drapes with specialized cleaning processes that preserve fabric integrity.",
    features: ["Fabric care", "Custom treatment", "Expert handling"]
  },
  // {
  //   icon: Sparkles,
  //   title: "Tablecloths",
  //   description: "Elegant table linens that enhance your dining experience with wrinkle-free finishing and spot treatment.",
  //   features: ["Wrinkle-free finish", "Spot treatment", "Custom folding"]
  // }
];

const Services = () => {
  return (
    <section id="services" className="mobile-spacing section-bg-subtle">
      <div className="content-container">
        <div className="text-center mb-8 md:mb-12 reveal">
          <h2 className="heading-lg mb-4 text-foreground">
            Our Commercial Laundry Services
          </h2>
          <p className="text-lead max-w-2xl mx-auto">
            Comprehensive cleaning solutions designed specifically for the hospitality industry
          </p>
        </div>
        
        {/* Desktop: 4 Column Layout */}
        <div className="hidden md:block">
          <div className="service-grid max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="service-card card-glow scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 mb-6 bg-primary-light rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:scale-110">
                  <service.icon className="w-8 h-8 lg:w-10 lg:h-10 text-primary group-hover:text-white transition-all duration-500" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm lg:text-base text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Smaller Cards */}
        <div className="md:hidden">
          <div className="service-grid-mobile max-w-lg mx-auto">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="service-card-mobile scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 mb-3 bg-primary-light rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <service.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold mb-2 text-foreground">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-success rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;