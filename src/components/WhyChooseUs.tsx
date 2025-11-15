import { Clock, Shield, Leaf, Truck, DollarSign, Award } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Timely Pickup & Delivery",
    description: "Scheduled pickups and deliveries that fit your business schedule"
  },
  {
    icon: Truck,
    title: "Bulk Handling Capacity",
    description: "Equipment and processes designed for high-volume commercial loads"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Detergents",
    description: "Environmentally conscious cleaning solutions that are gentle yet effective"
  },
  {
    icon: Shield,
    title: "Strict Hygiene Standards",
    description: "Hospital-grade sanitization processes exceeding industry requirements"
  },
  {
    icon: DollarSign,
    title: "Custom Pricing for Businesses",
    description: "Competitive rates tailored to your volume and service requirements"
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee with re-cleaning at no additional cost"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="mobile-spacing section-bg-muted">
      <div className="content-container">
        <div className="text-center mb-8 md:mb-12 reveal">
          <h2 className="heading-lg mb-4 text-foreground">
            Why Choose Us
          </h2>
          <p className="text-lead max-w-2xl mx-auto">
            Your trusted partner committed to excellence, reliability, and the highest standards of commercial cleaning
          </p>
        </div>
        
        <div className="why-choose-grid max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="why-choose-card card-glow scroll-slide-left group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mobile-icon mx-auto mb-6 bg-primary-light rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary group-hover:text-white transition-all duration-500" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 text-foreground text-center group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;