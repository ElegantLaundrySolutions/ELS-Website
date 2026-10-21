import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo, WhatsappLogo, ArrowUp } from "@phosphor-icons/react";
import { Logo } from "@/components/Navigation";
import { navItems } from "@/lib/constants";
import { scrollToId } from "@/lib/scroll";

// Fill in the real profile URLs; icons with an empty href are not rendered.
const socials = [
  { label: "Facebook", href: "", Icon: FacebookLogo },
  { label: "Instagram", href: "", Icon: InstagramLogo },
  { label: "LinkedIn", href: "", Icon: LinkedinLogo },
  { label: "X", href: "", Icon: XLogo },
].filter((s) => s.href);

const services = ["Linen Washing", "Staff Uniforms", "Towels", "Curtains"];

export const WhatsAppFab = () => {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Contact already has a WhatsApp card, and the button would cover the submit button.
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting || e.boundingClientRect.top < 0));
    if (contact) io.observe(contact);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);
  const show = pastHero && !atContact;
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="https://wa.me/918669089364"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.4)] transition-transform hover:scale-110"
        >
          <WhatsappLogo size={30} weight="fill" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

const heading = "font-sans text-xs font-medium uppercase tracking-[0.18em] text-harbor";
const link = "transition-colors hover:text-brass";

const Footer = () => (
  <footer className="relative overflow-hidden bg-linen text-ink">
    <div className="container-x pt-16 sm:pt-20">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-12 lg:items-start">
        <div className="col-span-2 flex flex-col items-center text-center sm:col-span-3 lg:col-span-5 lg:items-start lg:text-left">
          <Logo className="w-60 sm:w-72 lg:w-80" sizes="(min-width: 1024px) 320px, 288px" />
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            Your trusted partner for professional commercial laundry services. Serving the hospitality industry with
            excellence for over 10 years.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-linen hover:ring-ink"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer" className="lg:col-span-2 lg:pt-6">
          <h4 className={heading}>Quick Links</h4>
          <ul className="mt-5 space-y-3 text-ink/70">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(n.id);
                  }}
                  className={link}
                >
                  {n.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2 lg:pt-6">
          <h4 className={heading}>Our Services</h4>
          <ul className="mt-5 space-y-3 text-ink/70">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1 lg:col-span-3 lg:pt-6">
          <h4 className={heading}>Contact Info</h4>
          <ul className="mt-5 space-y-3 text-ink/70">
            <li>
              <a href="tel:+919158660092" className={link}>
                +91-9158660092
              </a>
            </li>
            <li>
              <a href="tel:+918669089364" className={link}>
                +91-8669089364
              </a>
            </li>
            <li className="text-sm text-muted-foreground">24/7 Service</li>
            <li>
              <a href="mailto:elegantlaundrysolutions@gmail.com" className={`[overflow-wrap:anywhere] ${link}`}>
                elegantlaundrysolutions@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-ink/10 py-6 text-sm text-muted-foreground sm:mt-16 sm:flex-row sm:items-center">
        <p>&copy; {new Date().getFullYear()} Elegant Laundry Solutions. All rights reserved.</p>
        <button
          onClick={() => scrollToId("hero")}
          className="group flex min-h-[44px] items-center gap-2 transition-colors hover:text-ink"
        >
          Back to top <ArrowUp className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
