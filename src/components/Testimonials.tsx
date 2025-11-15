import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "General Manager",
    company: "Grand Plaza Hotel",
    content: "The quality and reliability of their service has been outstanding. Our guests consistently comment on the freshness and quality of our linens. The team goes above and beyond every time.",
    rating: 5
  },
  {
    name: "Michael Chen",
    position: "Executive Chef",
    company: "Bella Vista Restaurant",
    content: "Fast turnaround, impeccable cleaning, and professional service. They understand the demands of our busy restaurant environment and always deliver on time.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    position: "Operations Director",
    company: "Sunset Lodge & Spa",
    content: "Their eco-friendly approach aligns perfectly with our sustainability goals, and the quality never compromises. Professional, reliable, and highly recommended!",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-background">
      <div className="content-container">
        <div className="text-center mb-16 reveal">
          <h2 className="heading-lg mb-6 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-lead max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry professionals 
            say about our commercial laundry services and partnership experience.
          </p>
        </div>
        
        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="card-premium p-8 relative reveal hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary/15 mb-6" />
              
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed italic text-base">
                "{testimonial.content}"
              </p>
              
              <div className="pt-6 border-t border-border">
                <div className="font-semibold text-foreground text-lg">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {testimonial.position}
                </div>
                <div className="text-sm text-primary font-medium mt-1">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Smaller Cards in Carousel */}
        <div className="md:hidden max-w-xs mx-auto">
          <Carousel 
            className="w-full"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.name}>
                  <div className="card-premium p-4 relative scroll-fade-in">
                    <Quote className="w-6 h-6 text-primary/15 mb-3" />
                    
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed italic text-xs">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="pt-3 border-t border-border">
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {testimonial.position}
                      </div>
                      <div className="text-xs text-primary font-medium mt-0.5">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;