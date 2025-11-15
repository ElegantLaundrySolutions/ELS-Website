import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const ContactForm = () => {

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const business = e.target.business.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const service = e.target.service.value;
    const details = e.target.details.value;

    const subject = encodeURIComponent("Laundry Service Quote Request");
    const body = encodeURIComponent(
      `Name: ${name}
      Business Name: ${business}
      Email: ${email}
      Phone: ${phone}
      Service Type: ${service}
      Additional Details: ${details}`
    );

    window.location.href = `mailto:yourbusiness@email.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mobile-spacing bg-secondary">
      <div className="content-container">
        <div className="text-center mb-8 md:mb-12 reveal">
          <h2 className="heading-lg mb-4 md:mb-6 text-foreground">
            Get a Quote
          </h2>
          <p className="text-lead max-w-3xl mx-auto">
            Ready to experience the difference professional commercial laundry services can make? 
            Contact us for a personalized quote tailored to your business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="service-card reveal">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-foreground">
              Request a Quote
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1">
                    Name *
                  </label>
                  <Input name="name" placeholder="Your full name" className="h-9 md:h-11 text-sm" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1">
                    Business Name *
                  </label>
                  <Input name="business" placeholder="Your business name" className="h-9 md:h-11 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1">
                  Email Address *
                </label>
                <Input name="email" type="email" placeholder="your@business.com" className="h-9 md:h-11 text-sm" />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1">
                  Phone Number *
                </label>
                <Input name="phone" type="tel" placeholder="+91-9876543210" className="h-9 md:h-11 text-sm" />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1">
                  Service Type
                </label>
                <Input name="service" placeholder="Linen cleaning, uniforms, towels, etc." className="h-9 md:h-11 text-sm" />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-1">
                  Additional Details
                </label>
                <Textarea 
                  name="details"
                  placeholder="Tell us about your laundry volume, frequency, special requirements, etc."
                  rows={3}
                  className="resize-none text-xs md:text-sm"
                />
              </div>

              <Button type="submit" className="w-full h-9 md:h-11 text-sm md:text-base">
                Get Free Quote
              </Button>
            </form>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-4 md:space-y-6 reveal" style={{ animationDelay: '0.2s' }}>
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground">
                Contact Information
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Phone</h4>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">+91-8669089364 / +91-9158660092</p>
                    <p className="text-xs text-muted-foreground">24/7 Emergency Service Available</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Email</h4>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">elegantlaundrysolutions@gmail.com</p>
                    <p className="text-xs text-muted-foreground">Quick response guaranteed within few hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Location</h4>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">HNo. 266 A/(P), Mazil Wado</p>
                    <p className="text-xs md:text-sm text-muted-foreground"> Revora, Bardez, Goa 403513</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">Business Hours</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                    {/* <p className="text-xs md:text-sm text-muted-foreground">Sunday: Emergency Service Only</p> */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* WhatsApp CTA */}
            <div className="service-card bg-gradient-primary text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1 text-xs md:text-sm">Instant Contact</h4>
                  <p className="text-xs text-white/90">Message us on WhatsApp for immediate assistance</p>
                </div>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary text-xs h-8 px-3"
                  onClick={() => {
                    window.open("https://wa.me/918669089364", "_blank");
                  }}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
            
            <div className="service-card">
              <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base">
                Free Consultation Available
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Our laundry experts can visit your facility to assess your needs and 
                provide a customized solution that fits your budget and schedule. No obligation, 
                completely free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;