import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Phone, SealCheck } from "@phosphor-icons/react";
import { scrollToId } from "@/lib/scroll";
import { Counter } from "@/components/motion";
import { ease } from "@/lib/constants";

// 16px-wide blurred preview, shown until the hero photo arrives.
const HERO_LQIP =
  "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JZQCdACPX4bOz+gS3GJjAAPwAxDeZ7pJujWZjhEh6Mi+8+5apZFUt1e09pxE9IdJekbyWtyPpZSls1hnCZ+AW3bdunpAJ/c4CyICduk1YgLDQ8xkGmtkvo/sQAA==";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "24/7", label: "Support Available" },
];

// Button that leans toward the cursor on fine pointers.
const Magnetic = ({ children }: { children: ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

const Words = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <>
    {text.split(" ").map((w, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span
          className={`inline-block ${className}`}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease, delay: delay + i * 0.06 }}
        >
          {w}&nbsp;
        </motion.span>
      </span>
    ))}
  </>
);

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex flex-col overflow-hidden bg-ink pb-10 pt-28 text-linen sm:pt-32 lg:min-h-[100svh] lg:pb-10 lg:pt-24"
    >
      {/* ambient light */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 30%, hsl(var(--harbor) / 0.9), transparent 70%), radial-gradient(40% 40% at 10% 90%, hsl(var(--brass) / 0.18), transparent 70%)",
        }}
      />
      {/* fine pinstripe, like pressed cotton */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 96px)" }}
      />

      <div className="container-x grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Hospitality Linen Care · Goa
          </motion.p>

          <h1 className="display mt-6 sm:mt-8">
            <Words text="Professional Laundry Solutions for" delay={0.15} />
            <Words text="Hotels, Restaurants & Lodges" className="italic text-brass-light" delay={0.45} />
          </h1>

          <motion.p
            className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-linen/70 sm:mt-8 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.8 }}
          >
            Specialized in bulk laundry with reliable pickup, hygiene assurance, and on-time delivery. Trusted by
            leading hospitality businesses across the region.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 xs:flex-row sm:mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.95 }}
          >
            <Magnetic>
              <button onClick={() => scrollToId("contact")} className="btn-brass w-full xs:w-auto">
                Get Quote <ArrowUpRight weight="bold" />
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => scrollToId("contact")} className="btn-ghost-light w-full xs:w-auto">
                <Phone /> Contact Us
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[17rem] xs:max-w-xs sm:max-w-sm lg:col-span-5 lg:max-w-[min(28rem,50svh)]"
          initial={{ scale: 0.94 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
        >
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-cover bg-center ring-1 ring-white/15"
            style={{ backgroundImage: `url(${HERO_LQIP})` }}
          >
            <motion.img
              style={{ y: mediaY }}
              src="/media/hero.webp"
              srcSet="/media/hero-sm.webp 480w, /media/hero.webp 864w"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 24rem, 80vw"
              alt="Freshly pressed white linens stacked in a commercial laundry"
              width={864}
              height={1080}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-[118%] w-full -translate-y-[9%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>

          {/* floating badge */}
          <motion.div
            className="absolute -left-2 bottom-8 flex items-center gap-3 rounded-2xl bg-linen px-4 py-3 text-ink shadow-2xl sm:-left-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.2 }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-brass-light">
              <SealCheck size={22} weight="duotone" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-medium">Hygiene assured</span>
              <span className="text-muted-foreground">On-time delivery</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* trust bar */}
      <div className="container-x mt-14 lg:mt-10">
        <motion.dl
          className="grid grid-cols-3 divide-x divide-white/10 rounded-3xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.1 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-5 text-center sm:px-6 sm:py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-[1.75rem] font-light text-brass-light sm:text-5xl">
                <Counter value={s.value} />
              </dd>
              <dd className="mt-1 text-[0.6875rem] uppercase leading-tight tracking-[0.1em] text-linen/60 xs:text-xs sm:mt-2 sm:tracking-[0.14em]">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default Hero;
