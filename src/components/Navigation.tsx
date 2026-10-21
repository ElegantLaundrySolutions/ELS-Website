import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { lockScroll, scrollToId } from "@/lib/scroll";
import { ease, navItems } from "@/lib/constants";

export const Logo = ({ className = "", sizes = "80px" }: { className?: string; sizes?: string }) => (
  <img
    src="/media/logo-sm.webp"
    srcSet="/media/logo-sm.webp 320w, /media/logo.webp 960w"
    sizes={sizes}
    alt="Elegant Laundry Solutions — Hospitality Linen Care"
    width={320}
    height={260}
    className={`h-auto ${className}`}
  />
);

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const solid = scrolled || open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-[4.5rem] max-w-7xl lg:h-20 items-center justify-between rounded-[1.75rem] pl-2 pr-2 transition-all duration-500 sm:pl-3 ${
            solid
              ? "bg-linen/85 shadow-[0_8px_30px_-12px_hsl(var(--ink)/0.25)] ring-1 ring-ink/10 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go("hero");
            }}
            aria-label="Elegant Laundry Solutions — back to top"
            className="rounded-2xl bg-white/95 px-2 py-1 shadow-sm ring-1 ring-ink/5"
          >
            <Logo className="w-[4.5rem] lg:w-[5.25rem]" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.id);
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    solid ? "text-ink/70 hover:text-ink" : "text-linen/75 hover:text-linen"
                  } ${active === item.id ? (solid ? "!text-ink" : "!text-linen") : ""}`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 -z-10 rounded-full ${solid ? "bg-ink/[0.06]" : "bg-white/10"}`}
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={() => go("contact")} className="btn-brass hidden !min-h-[44px] !py-2.5 sm:inline-flex">
              Get a Quote <ArrowUpRight weight="bold" />
            </button>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid h-12 w-12 place-items-center rounded-full transition-colors lg:hidden ${
                solid ? "text-ink hover:bg-ink/5" : "text-linen hover:bg-white/10"
              }`}
            >
              {open ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brass"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-linen px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="flex-1 space-y-1 overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className="flex items-baseline gap-4 border-b border-ink/10 py-4 font-serif text-3xl font-light text-ink xs:text-4xl"
                  >
                    <span className="font-sans text-xs text-brass">0{i + 1}</span>
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 pt-6"
            >
              <button onClick={() => go("contact")} className="btn-ink w-full">
                Get a Quote <ArrowUpRight weight="bold" />
              </button>
              <a href="tel:+918669089364" className="btn-ghost-dark w-full">
                Call +91 86690 89364
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
