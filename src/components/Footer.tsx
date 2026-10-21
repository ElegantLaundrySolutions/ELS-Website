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
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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

const Footer = () => (
  <footer className="relative overflow-hidden bg-ink text-linen">
    <div className="container-x border-t border-white/10 pt-16 sm:pt-20">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo light />
          <p className="mt-6 max-w-sm leading-relaxed text-linen/60">
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
                  className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/15 transition-colors hover:bg-brass hover:text-ink hover:ring-brass"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h4 className="font-sans text-xs uppercase tracking-[0.18em] text-brass-light">Quick Links</h4>
          <ul className="mt-5 space-y-3 text-linen/70">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(n.id);
                  }}
                  className="transition-colors hover:text-linen"
                >
                  {n.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs uppercase tracking-[0.18em] text-brass-light">Our Services</h4>
          <ul className="mt-5 space-y-3 text-linen/70">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-sans text-xs uppercase tracking-[0.18em] text-brass-light">Contact Info</h4>
          <ul className="mt-5 space-y-3 text-linen/70">
            <li>
              <a href="tel:+919158660092" className="hover:text-linen">+91-9158660092</a>
            </li>
            <li>
              <a href="tel:+918669089364" className="hover:text-linen">+91-8669089364</a>
            </li>
            <li className="text-sm text-linen/50">24/7 Service</li>
            <li>
              <a href="mailto:elegantlaundrysolutions@gmail.com" className="[overflow-wrap:anywhere] hover:text-linen">
                elegantlaundrysolutions@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 py-6 text-sm text-linen/50 sm:flex-row sm:items-center">
        <p>&copy; {new Date().getFullYear()} Elegant Laundry Solutions. All rights reserved.</p>
        <button
          onClick={() => scrollToId("hero")}
          className="group flex min-h-[44px] items-center gap-2 transition-colors hover:text-linen"
        >
          Back to top <ArrowUp className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>

    <p
      aria-hidden
      className="pointer-events-none select-none whitespace-nowrap px-2 text-center font-serif font-light leading-[0.8] tracking-tight text-white/[0.06]"
      style={{ fontSize: "clamp(3rem, 12vw, 12rem)" }}
    >
      Elegant Laundry
    </p>
  </footer>
);

export default Footer;
