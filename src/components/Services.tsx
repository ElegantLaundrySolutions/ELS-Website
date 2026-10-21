import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Bed, TShirt, Drop, Wind, Check } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const services = [
  {
    icon: Bed,
    title: "Linen Washing",
    image: "/media/img_9003",
    alt: "Large-capacity industrial washer at our facility",
    description:
      "Professional cleaning of bed sheets, pillowcases, and comforters with hospital-grade processes and careful handling.",
    features: ["Stain removal", "Sanitization", "Professional pressing"],
  },
  {
    icon: TShirt,
    title: "Staff Uniforms",
    image: "/media/img_9016",
    alt: "Staff member pressing uniforms at an ironing station",
    description:
      "Keep your team looking professional with crisp, clean uniforms. Color protection and expert care included.",
    features: ["Color protection", "Professional pressing", "Damage prevention"],
  },
  {
    icon: Drop,
    title: "Towels",
    image: "/media/clean-linens",
    alt: "Stack of fresh folded white towels",
    description:
      "Fresh, fluffy towels cleaned with advanced washing systems and proper drying techniques for maximum softness.",
    features: ["Softness guaranteed", "Odor elimination", "Quick turnaround"],
  },
  {
    icon: Wind,
    title: "Curtains",
    image: "/media/img_9018",
    alt: "Large fabric being fed through the flatwork ironer",
    description:
      "Expert care for window treatments and drapes with specialized cleaning processes that preserve fabric integrity.",
    features: ["Fabric care", "Custom treatment", "Expert handling"],
  },
];

const Card = ({
  service,
  i,
  progress,
}: {
  service: (typeof services)[number];
  i: number;
  progress: MotionValue<number>;
}) => {
  // Each card shrinks slightly as the ones after it slide over.
  const stacked = useMediaQuery("(min-width: 768px) and (min-height: 640px)");
  const scale = useTransform(progress, [i / services.length, 1], [1, stacked ? 1 - (services.length - 1 - i) * 0.04 : 1]);
  const Icon = service.icon;

  return (
    <div className="stack:sticky" style={{ top: `calc(var(--nav-h) + 2rem + ${i * 1.75}rem)` }}>
      <motion.article
        style={{ scale }}
        className="grid origin-top overflow-hidden rounded-3xl bg-paper ring-1 sm:rounded-[2rem] ring-ink/10 shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.35)] md:min-h-[460px] md:grid-cols-2"
      >
        <div className="relative aspect-[2/1] overflow-hidden sm:aspect-[16/9] md:order-2 md:aspect-auto">
          <img
            src={`${service.image}.webp`}
            srcSet={`${service.image}-sm.webp 640w, ${service.image}-md.webp 1024w, ${service.image}.webp 1600w`}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt={service.alt}
            loading="lazy"
              decoding="async"
            className="absolute inset-0 h-full w-full object-cover saturate-[0.85]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-linen/90 px-2.5 py-0.5 font-serif text-xs sm:left-5 sm:top-5 sm:px-3 sm:py-1 sm:text-sm text-ink backdrop-blur">
            0{i + 1}
          </span>
        </div>

        <div className="flex flex-col justify-between gap-5 p-5 sm:gap-8 sm:p-10 lg:p-12">
          <div>
            <div className="flex items-center gap-3 sm:block">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-harbor sm:h-14 sm:w-14 sm:rounded-2xl">
                <Icon weight="duotone" className="h-5 w-5 sm:h-7 sm:w-7" />
              </span>
              <h3 className="text-2xl font-light tracking-tight text-ink sm:mt-6 sm:text-4xl">{service.title}</h3>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
              {service.description}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 border-t border-ink/10 pt-4 sm:grid sm:gap-3 sm:pt-6">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-1.5 rounded-full bg-mist/70 py-1 pl-1.5 pr-3 text-xs text-ink sm:gap-3 sm:bg-transparent sm:p-0 sm:text-sm"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brass/15 text-brass sm:h-6 sm:w-6">
                  <Check size={12} weight="bold" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="services" className="section-y">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">Our Services</p>
            <h2 className="heading mt-5 text-ink">Our Commercial Laundry Services</h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="lead">Comprehensive cleaning solutions designed specifically for the hospitality industry</p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-10 space-y-4 sm:space-y-6 md:mt-16 md:space-y-10">
          {services.map((s, i) => (
            <Card key={s.title} service={s} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
