import { Button } from "@/components/ui/button";
import cleanLinensImage from "@/assets/clean-linens.jpg";

const About = () => {
  const handleContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-subtle">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8 reveal">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground">
                About Professional Laundry
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                For over 10 years, we've been the trusted laundry partner for hospitality 
                businesses across the region. Our commitment to excellence, reliability, and 
                customer satisfaction has made us the preferred choice for hotels, restaurants, 
                lodges, and service establishments.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base lg:text-lg">Our Mission</h4>
                  <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
                    To provide exceptional commercial laundry services that help our clients 
                    maintain the highest standards of cleanliness and professionalism while 
                    building lasting partnerships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base lg:text-lg">Our Values</h4>
                  <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
                    Quality, reliability, and customer satisfaction drive everything we do. 
                    We treat every item with the care it deserves and every client as a valued partner.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base lg:text-lg">Our Promise</h4>
                  <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
                    Every piece of linen, every uniform, every towel is cleaned to perfection 
                    and delivered on time, every time. Your success is our success.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleContact}
              size="lg" 
              className="mt-8 bg-gradient-primary shadow-soft hover:shadow-elegant"
            >
              Learn More About Us
            </Button>
          </div>
          
          {/* Image */}
          <div className="relative reveal" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden shadow-premium">
              <img 
                src={cleanLinensImage} 
                alt="Clean folded linens and towels" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-elegant border border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-elegant border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">99%</div>
                <div className="text-xs text-muted-foreground font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;