import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="content-container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center md:justify-items-start text-center md:text-left">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3">Elegant Laundry Solutions</h3>
              <p className="text-gray-300 leading-relaxed text-sm hidden md:block">
                Your trusted partner for professional commercial laundry services. 
                Serving the hospitality industry with excellence for over 10 years.
              </p>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
              <li><button onClick={() => handleNavClick('#about')} className="hover:text-white transition-colors text-left">About</button></li>
              <li><button onClick={() => handleNavClick('#services')} className="hover:text-white transition-colors text-left">Services</button></li>
              <li><button onClick={() => handleNavClick('#industries')} className="hover:text-white transition-colors text-left">Industries</button></li>
              <li><button onClick={() => handleNavClick('#contact')} className="hover:text-white transition-colors text-left">Contact</button></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
              <li><span className="hover:text-white transition-colors cursor-default">Linen Washing</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Staff Uniforms</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Towels</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Curtains</span></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">Contact Info</h4>

            <div className="space-y-3 text-gray-300 text-xs md:text-sm text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">+91-9158660092</p>
                  <p className="font-medium">+91-8669089364</p>
                  <p className="text-xs">24/7 Service</p>
                </div>
              </div>

              <div className="flex md:flex-row items-center md:items-start md:space-y-0 space-x-2 md:space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:elegantlaundarysolutions@gmail.com"
                  className="text-xs break-all hover:underline inline-block"
                >
                  elegantlaundrysolutions@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>        
        
        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-gray-300">
          <p className="text-xs md:text-sm">&copy; 2025 Elegant Laundry Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;