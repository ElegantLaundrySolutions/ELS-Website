import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/els_logo_transparent_bg.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    // { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu will-change-transform ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-elegant border-b border-border'
            : 'bg-white/95 backdrop-blur-md'
        }`}>
        <div className="content-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <img
              src={logo}
              alt="Elegant Laundry Solutions Logo"
              className="h-8 w-auto md:h-20"
            />
            <div className="text-lg md:text-xl font-bold text-primary">
              Elegant Laundry Solutions
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => handleNavClick('#contact')}
                className="text-foreground hover:text-primary"
              >
                Contact Us
              </Button>
              <Button 
                onClick={() => handleNavClick('#contact')}
                className="bg-gradient-primary shadow-soft hover:shadow-elegant"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-border shadow-elegant">
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleNavClick('#contact')}
                  className="mobile-button justify-center"
                >
                  Contact Us
                </Button>
                <Button 
                  onClick={() => handleNavClick('#contact')}
                  className="mobile-button justify-center"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;