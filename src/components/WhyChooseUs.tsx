import type { PointerEvent } from "react";
import { Clock, Truck, Leaf, ShieldCheck, Handshake, Medal } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion";

const features = [
  {
    icon: Medal,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee with re-cleaning at no additional cost",
    span: "sm:col-span-2 lg:row-span-2",
    feature: true,
  },
  {
    icon: Clock,
    title: "Timely Pickup & Delivery",
    description: "Scheduled pickups and deliveries that fit your business schedule",
    span: "sm:col-span-2",
  },
  {
    icon: Truck,
    title: "Bulk Handling Capacity",
    description: "Equipment and processes designed for high-volume commercial loads",
    span: "",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Detergents",
    description: "Environmentally conscious cleaning solutions that are gentle yet effective",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "Strict Hygiene Standards",
    description: "Hospital-grade sanitization processes exceeding industry requirements",
    span: "sm:col-span-2",
  },
  {
    icon: Handshake,
    title: "Custom Pricing for Businesses",
    description: "Competitive rates tailored to your volume and service requirements",
    span: "sm:col-span-2",
  },
];

// Feeds the pointer position to the card's spotlight gradient.
const track = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

const WhyChooseUs = () => (
  <section id="why-choose-us" className="section-y">
    <div className="container-x">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-6">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="heading mt-5 text-ink">
            Why Choose <em className="text-harbor">Us</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <p className="lead">
            Your trusted partner committed to excellence, reliability, and the highest standards of commercial cleaning
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-fr gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.08} className={f.span}>
              <article
                onPointerMove={track}
                className={`group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] p-7 ring-1 transition-colors duration-500 sm:p-8 ${
                  f.feature ? "bg-ink text-linen ring-ink" : "bg-paper text-ink ring-ink/10 hover:ring-brass/40"
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(320px circle at var(--x) var(--y), hsl(var(--brass) / ${f.feature ? 0.25 : 0.12}), transparent 70%)`,
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <Icon
                    size={f.feature ? 56 : 36}
                    weight="duotone"
                    className={f.feature ? "text-brass-light" : "text-harbor"}
                  />
                  <span className={`font-serif text-sm ${f.feature ? "text-linen/40" : "text-ink/30"}`}>0{i + 1}</span>
                </div>
                <div className="relative">
                  <h3 className={`font-light tracking-tight ${f.feature ? "text-4xl sm:text-5xl" : "text-2xl"}`}>
                    {f.title}
                  </h3>
                  <p
                    className={`mt-3 leading-relaxed ${
                      f.feature ? "max-w-sm text-lg text-linen/70" : "text-sm text-muted-foreground sm:text-base"
                    }`}
                  >
                    {f.description}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
