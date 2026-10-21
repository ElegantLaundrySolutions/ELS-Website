import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  WhatsappLogo,
  ArrowUp,
  Phone,
  EnvelopeSimple,
  Check,
} from "@phosphor-icons/react";
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

const heading = "font-sans text-xs font-medium uppercase tracking-[0.18em] text-brass-light";
const link = "transition-colors hover:text-linen";

// Full numbers, email and address are listed in the Contact section above.
const touch = [
  { label: "Email elegantlaundrysolutions@gmail.com", href: "mailto:elegantlaundrysolutions@gmail.com", Icon: EnvelopeSimple },
  { label: "Call +91-8669089364", href: "tel:+918669089364", Icon: Phone },
  { label: "WhatsApp +91-8669089364", href: "https://wa.me/918669089364", Icon: WhatsappLogo },
  ...socials,
];

const Footer = () => (
  <footer className="relative overflow-hidden bg-ink text-linen">
    <div className="container-x border-t border-white/10 pt-16 sm:pt-20">
      <div className="grid gap-y-12 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-[minmax(0,24rem)_repeat(3,minmax(0,1fr))] lg:gap-x-12 xl:gap-x-16">
        {/* the logo is navy, so it sits on its own white card; extra right margin separates it from the link columns */}
        <div className="flex justify-center sm:col-span-3 lg:col-span-1 lg:mr-8 lg:justify-start xl:mr-12">
          <div className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-white p-6 text-center shadow-xl sm:p-8">
            <Logo className="w-52 sm:w-60" sizes="240px" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Your trusted partner for professional commercial laundry services. Serving the hospitality industry with
              excellence for over 10 years.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="text-center sm:text-left lg:pt-2">
          <h4 className={heading}>Quick Links</h4>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-linen/70 sm:mt-5 sm:block sm:space-y-3">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(n.id);
                  }}
                  className={`inline-block py-1 sm:py-0 ${link}`}
                >
                  {n.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-center sm:text-left lg:pt-2">
          <h4 className={heading}>Our Services</h4>
          <ul className="mt-4 flex flex-wrap justify-center gap-2 text-linen/70 sm:mt-5 sm:block sm:space-y-3">
            {services.map((s) => (
              <li
                key={s}
                className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1.5 text-sm ring-1 ring-white/10 sm:rounded-none sm:bg-transparent sm:p-0 sm:text-base sm:ring-0"
              >
                <Check size={12} weight="bold" className="text-brass-light sm:hidden" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center sm:text-left lg:pt-2">
          <h4 className={heading}>Stay in Touch</h4>
          <ul className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
            {touch.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-12 w-12 place-items-center rounded-full text-linen/80 ring-1 ring-white/15 transition-colors hover:bg-brass hover:text-ink hover:ring-brass"
                >
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-linen/60">24/7 Service</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-center text-sm text-linen/50 sm:mt-16 sm:flex-row sm:text-left">
        <p>&copy; {new Date().getFullYear()} Elegant Laundry Solutions. All rights reserved.</p>
        <button
          onClick={() => scrollToId("hero")}
          className="group flex min-h-[44px] items-center gap-2 transition-colors hover:text-linen"
        >
          Back to top <ArrowUp className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
