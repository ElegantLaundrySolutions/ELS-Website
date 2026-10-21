import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Target, Diamond, HandHeart } from "@phosphor-icons/react";
import { Counter, Reveal } from "@/components/motion";
import { scrollToId } from "@/lib/scroll";

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To provide exceptional commercial laundry services that help our clients maintain the highest standards of cleanliness and professionalism while building lasting partnerships.",
  },
  {
    icon: Diamond,
    title: "Our Values",
    text: "Quality, reliability, and customer satisfaction drive everything we do. We treat every item with the care it deserves and every client as a valued partner.",
  },
  {
    icon: HandHeart,
    title: "Our Promise",
    text: "Every piece of linen, every uniform, every towel is cleaned to perfection and delivered on time, every time. Your success is our success.",
  },
];

const About = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress: imgP } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(imgP, [0, 1], ["-8%", "8%"]);
  const { scrollYProgress: listP } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });

  return (
    <section id="about" className="section-y bg-paper">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div ref={imgRef} className="relative order-2 mx-4 sm:mx-8 lg:order-1 lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.img
              style={{ y: imgY }}
              src="/media/img_9045.webp"
              srcSet="/media/img_9045-sm.webp 640w, /media/img_9045-md.webp 1024w, /media/img_9045.webp 1600w"
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Our laundry operations floor with ironing stations and washers"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-[116%] w-full -translate-y-[8%] object-cover saturate-[0.85]"
            />
          </div>
          <Reveal delay={0.2} className="absolute -right-4 -bottom-8 sm:-right-8">
            <div className="rounded-3xl bg-ink px-6 py-5 text-linen shadow-2xl sm:px-8 sm:py-6">
              <div className="font-serif text-4xl font-light text-brass-light sm:text-5xl">
                <Counter value="10+" />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-linen/60">Years Experience</div>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="absolute -left-4 -top-6 sm:-left-8">
            <div className="rounded-3xl bg-linen px-5 py-4 shadow-xl ring-1 ring-ink/10">
              <div className="font-serif text-3xl font-light text-harbor">
                <Counter value="99%" />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Client Satisfaction
              </div>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">About Us</p>
            <h2 className="heading mt-5 text-ink">About Professional Laundry</h2>
            <p className="lead mt-6">
              For over 10 years, we've been the trusted laundry partner for hospitality businesses across the region.
              Our commitment to excellence, reliability, and customer satisfaction has made us the preferred choice for
              hotels, restaurants, lodges, and service establishments.
            </p>
          </Reveal>

          <ol ref={listRef} className="relative mt-10 space-y-8">
            {/* line that draws as you scroll */}
            <span aria-hidden className="absolute bottom-2 left-[1.375rem] top-2 w-px bg-ink/10" />
            <motion.span
              aria-hidden
              style={{ scaleY: listP }}
              className="absolute bottom-2 left-[1.375rem] top-2 w-px origin-top bg-brass"
            />
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={p.title} className="relative">
                  <Reveal delay={i * 0.1} className="flex gap-5">
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-harbor ring-1 ring-ink/15">
                      <Icon size={20} weight="duotone" />
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-xl font-normal text-ink">{p.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal delay={0.2}>
            <button onClick={() => scrollToId("contact")} className="btn-ink group mt-10">
              Learn More About Us
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
