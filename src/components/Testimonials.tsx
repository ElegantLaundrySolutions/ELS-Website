import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quotes } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion";
import { ease } from "@/lib/constants";

type Testimonial = { quote: string; name: string; role: string; company: string };

// Add real client quotes here. The section stays hidden while this list is empty.
const testimonials: Testimonial[] = [];

const DURATION = 7000;

const Testimonials = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const t = setTimeout(() => setI((i + 1) % testimonials.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused]);

  if (!testimonials.length) return null;
  const t = testimonials[i];

  return (
    <section
      id="testimonials"
      className="section-y bg-mist/60"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="container-x max-w-5xl text-center">
        <Reveal>
          <p className="eyebrow justify-center">What Our Clients Say</p>
          <Quotes size={56} weight="fill" className="mx-auto mt-8 text-brass" />
        </Reveal>

        <div className="relative mt-8 min-h-[16rem] sm:min-h-[14rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
            >
              <blockquote className="font-serif text-2xl font-light leading-snug text-ink sm:text-4xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-medium text-ink">{t.name}</span>
                <span className="text-muted-foreground"> · {t.role}, {t.company}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 && (
          <div className="mx-auto mt-10 flex max-w-xs gap-2">
            {testimonials.map((x, n) => (
              <button
                key={x.name}
                onClick={() => setI(n)}
                aria-label={`Show testimonial ${n + 1}`}
                className="relative h-11 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded bg-ink/15">
                  {n === i && (
                    <motion.span
                      key={`${i}-${paused}`}
                      className="block h-full origin-left bg-brass"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                  {n < i && <span className="block h-full bg-ink/40" />}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
