import { Buildings, ForkKnife, HouseLine, Champagne, Sparkle } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion";

const industries = [
  { name: "Hotels", icon: Buildings, description: "Premium linens, towels, and hospitality services" },
  { name: "Restaurants", icon: ForkKnife, description: "Chef uniforms, tablecloths, and kitchen textiles" },
  { name: "Lodges", icon: HouseLine, description: "Cozy bedding, bath linens, and comfort essentials" },
  { name: "Banquet Halls", icon: Champagne, description: "Event linens, chair covers, and special occasion textiles" },
];

const IndustriesServed = () => (
  <section id="industries" className="section-y bg-mist/60">
    <div className="container-x">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center">Who We Work With</p>
        <h2 className="heading mt-5 text-ink">Industries We Serve</h2>
        <p className="lead mt-5">
          Trusted by businesses across various sectors for reliable commercial laundry solutions
        </p>
      </Reveal>
    </div>

    {/* marquee — duplicated list so the loop is seamless */}
    <div
      aria-hidden
      className="group mt-12 overflow-hidden border-y border-ink/10 py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] sm:mt-16"
    >
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] sm:gap-16">
        {[...industries, ...industries, ...industries, ...industries].map((ind, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-3xl font-light italic text-ink/80 sm:gap-16 sm:text-5xl">
            {ind.name}
            <Sparkle size={20} weight="fill" className="text-brass" />
          </span>
        ))}
      </div>
    </div>

    <div className="container-x">
      <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink/10 ring-1 ring-ink/10 xs:grid-cols-2 sm:mt-16 lg:grid-cols-4">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <li key={ind.name} className="group bg-linen">
              <Reveal delay={i * 0.08} className="flex h-full flex-col p-6 transition-colors duration-500 group-hover:bg-paper sm:p-8">
                <Icon
                  size={40}
                  weight="light"
                  className="text-harbor transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-brass"
                />
                <h3 className="mt-8 text-2xl font-light text-ink sm:mt-12">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{ind.description}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default IndustriesServed;
