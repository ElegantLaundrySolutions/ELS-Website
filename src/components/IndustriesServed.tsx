import { Building, Utensils, Home, Users } from "lucide-react";

const industries = [
  {
    name: "Hotels",
    icon: Building,
    description: "Premium linens, towels, and hospitality services"
  },
  {
    name: "Restaurants",
    icon: Utensils,
    description: "Chef uniforms, tablecloths, and kitchen textiles"
  },
  {
    name: "Lodges",
    icon: Home,
    description: "Cozy bedding, bath linens, and comfort essentials"
  },
  {
    name: "Banquet Halls",
    icon: Users,
    description: "Event linens, chair covers, and special occasion textiles"
  }
];

const IndustriesServed = () => {
  return (
    <section id="industries" className="mobile-spacing section-bg-warm">
      <div className="content-container">
        <div className="text-center mb-8 md:mb-12 reveal">
          <h2 className="heading-lg mb-4 text-foreground">
            Industries We Serve
          </h2>
          <p className="text-lead max-w-2xl mx-auto">
            Trusted by businesses across various sectors for reliable commercial laundry solutions
          </p>
        </div>
        
        <div className="industry-grid max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <div 
              key={industry.name}
              className="industry-card card-glow text-center group scroll-slide-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mobile-icon mx-auto mb-6 bg-primary-light rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <industry.icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary group-hover:text-white transition-all duration-500" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {industry.name}
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;