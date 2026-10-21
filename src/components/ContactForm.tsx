import { useState, type FormEvent, type ReactNode } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  Clock,
  WhatsappLogo,
  ArrowUpRight,
  CircleNotch,
  CheckCircle,
  CaretDown,
  Handshake,
  type Icon,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/motion";
import { ease } from "@/lib/constants";

const SERVICE_ID = "service_j41lzjc";
const TEMPLATE_ID = "template_2nowwja";
const PUBLIC_KEY = "NV5bW16sJJNpFvikM";

const serviceOptions = ["Linen Washing", "Staff Uniforms", "Towels", "Curtains", "Multiple services"];

type Fields = "name" | "business" | "email" | "phone" | "service" | "details";
type Errors = Partial<Record<Fields, string>>;

const validate = (v: Record<Fields, string>): Errors => {
  const e: Errors = {};
  if (!v.name) e.name = "Name is required";
  if (!v.business) e.business = "Business name is required";
  if (!v.email) e.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email";
  if (!v.phone) e.phone = "Phone number is required";
  else if (!/^[0-9]{10,15}$/.test(v.phone)) e.phone = "Enter a valid phone number (10–15 digits)";
  if (!v.service) e.service = "Service type is required";
  if (!v.details) e.details = "Additional details are required";
  return e;
};

const Field = ({
  name,
  label,
  error,
  select = false,
  grow = false,
  children,
}: {
  name: Fields;
  label: string;
  error?: string;
  select?: boolean;
  grow?: boolean;
  children: ReactNode;
}) => (
  <div className={grow ? "flex flex-1 flex-col" : undefined}>
    <div className={`relative ${grow ? "flex flex-1 flex-col" : ""}`}>
      {children}
      <label
        htmlFor={name}
        className={`field-label ${select ? "!top-2 !text-xs" : ""}`}
      >
        {label}
      </label>
    </div>
    {error && (
      <p id={`${name}-error`} role="alert" className="mt-1.5 pl-1 text-xs text-destructive">
        {error}
      </p>
    )}
  </div>
);

const fieldProps = (name: Fields, errors: Errors) => ({
  id: name,
  name,
  placeholder: " ",
  "aria-invalid": !!errors[name],
  "aria-describedby": errors[name] ? `${name}-error` : undefined,
  className: `peer field ${errors[name] ? "!border-destructive" : ""}`,
});

const contacts: { icon: Icon; title: string; lines: { text: string; href?: string }[]; note?: string }[] = [
  {
    icon: Phone,
    title: "Phone",
    lines: [
      { text: "+91-8669089364", href: "tel:+918669089364" },
      { text: "+91-9158660092", href: "tel:+919158660092" },
    ],
    note: "24/7 Emergency Service Available",
  },
  {
    icon: EnvelopeSimple,
    title: "Email",
    lines: [{ text: "elegantlaundrysolutions@gmail.com", href: "mailto:elegantlaundrysolutions@gmail.com" }],
    note: "Quick response guaranteed within few hours",
  },
  {
    icon: MapPin,
    title: "Location",
    lines: [
      {
        text: "HNo. 266 A/(P), Mazil Wado, Revora, Bardez, Goa 403513",
        href: "https://www.google.com/maps/search/?api=1&query=Revora+Bardez+Goa+403513",
      },
    ],
  },
  { icon: Clock, title: "Business Hours", lines: [{ text: "Monday - Sunday: 8:00 AM - 8:00 PM" }] },
];

const ContactForm = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(
      [...new FormData(form).entries()].map(([k, v]) => [k, String(v).trim()]),
    ) as Record<Fields, string>;

    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (form.elements.namedItem(Object.keys(errs)[0]) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
      form.reset();
      setStatus("sent");
      toast.success("Your quote request has been sent successfully!");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("idle");
      toast.error("Failed to send quote. Please try again later.");
    }
  };

  return (
    <section id="contact" className="section-y relative isolate overflow-hidden bg-ink text-linen">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 60% at 0% 0%, hsl(var(--harbor) / 0.8), transparent 70%)" }}
      />

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Info */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Get a Quote</p>
            <h2 className="heading mt-5">
              Get a <em className="text-brass-light">Quote</em>
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-linen/70 sm:mt-6 sm:text-lg">
              Ready to experience the difference professional commercial laundry services can make? Contact us for a
              personalized quote tailored to your business needs.
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {contacts.map((c, i) => {
              const ContactIcon = c.icon;
              return (
                <li key={c.title}>
                  <Reveal delay={i * 0.06} className="flex gap-4 py-5">
                    <ContactIcon size={24} weight="duotone" className="mt-0.5 shrink-0 text-brass-light" />
                    <div className="min-w-0">
                      <h3 className="font-sans text-xs uppercase tracking-[0.16em] text-linen/50">{c.title}</h3>
                      {c.lines.map((l) =>
                        l.href ? (
                          <a
                            key={l.text}
                            href={l.href}
                            target={l.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="mt-1 block break-words text-base text-linen underline-offset-4 hover:text-brass-light hover:underline"
                          >
                            {l.text}
                          </a>
                        ) : (
                          <p key={l.text} className="mt-1 text-base">
                            {l.text}
                          </p>
                        ),
                      )}
                      {c.note && <p className="mt-1 text-sm text-linen/50">{c.note}</p>}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={0.1} className="mt-8 space-y-4">
            <a
              href="https://wa.me/918669089364"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl bg-[#1f3a2c] p-5 ring-1 ring-white/10 transition-colors hover:bg-[#25503a]"
            >
              <WhatsappLogo size={36} weight="fill" className="shrink-0 text-[#4ade80]" />
              <span className="flex-1">
                <span className="block font-medium">Instant Contact</span>
                <span className="block text-sm text-linen/70">Message us on WhatsApp for immediate assistance</span>
              </span>
              <ArrowUpRight size={20} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="flex gap-4 rounded-2xl p-5 ring-1 ring-white/10">
              <Handshake size={32} weight="duotone" className="shrink-0 text-brass-light" />
              <div>
                <h3 className="font-sans font-medium">Free Consultation Available</h3>
                <p className="mt-1 text-sm leading-relaxed text-linen/60">
                  Our laundry experts can visit your facility to assess your needs and provide a customized solution
                  that fits your budget and schedule. No obligation, completely free of charge.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        {/* Card fills the viewport below the nav; sticks beside the info column on desktop. */}
        <Reveal delay={0.15} className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:col-span-7 lg:self-start">
          {/* Mobile: exactly one screen tall, top padding keeps the heading clear of the floating nav. */}
          <div className="relative flex min-h-[100svh] flex-col rounded-3xl bg-linen p-5 pt-[calc(var(--nav-h)+0.5rem)] text-ink shadow-2xl sm:min-h-[calc(100svh-var(--nav-h)-3rem)] sm:rounded-[2rem] sm:p-10">
            <h3 className="text-2xl font-light sm:text-3xl">Request a Quote</h3>
            <p className="mt-2 text-sm text-muted-foreground">All fields are required.</p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 grid flex-1 grid-rows-[repeat(5,auto)_1fr_auto] gap-4 [@media(max-height:760px)]:mt-5 [@media(max-height:760px)]:gap-3 sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_1fr_auto]"
            >
              <Field name="name" label="Name" error={errors.name}>
                <input type="text" autoComplete="name" {...fieldProps("name", errors)} />
              </Field>
              <Field name="business" label="Business Name" error={errors.business}>
                <input type="text" autoComplete="organization" {...fieldProps("business", errors)} />
              </Field>
              <Field name="email" label="Email Address" error={errors.email}>
                <input type="email" autoComplete="email" inputMode="email" {...fieldProps("email", errors)} />
              </Field>
              <Field name="phone" label="Phone Number (+91)" error={errors.phone}>
                <input type="tel" autoComplete="tel-national" inputMode="numeric" {...fieldProps("phone", errors)} />
              </Field>
              <div className="sm:col-span-2">
                <Field name="service" label="Service Type" error={errors.service} select>
                  <select
                    defaultValue=""
                    {...fieldProps("service", errors)}
                    className={`${fieldProps("service", errors).className} appearance-none pr-10 invalid:text-muted-foreground`}
                    required
                  >
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {serviceOptions.map((o) => (
                      <option key={o} className="text-ink">
                        {o}
                      </option>
                    ))}
                  </select>
                  <CaretDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </Field>
              </div>
              <div className="flex flex-col sm:col-span-2">
                <Field name="details" label="Additional Details" error={errors.details} grow>
                  <textarea
                    rows={2}
                    {...fieldProps("details", errors)}
                    className={`${fieldProps("details", errors).className} min-h-[7.5rem] flex-1 resize-none [@media(max-height:760px)]:min-h-[4rem]`}
                  />
                </Field>
                <p className="mt-1.5 pl-1 text-xs text-muted-foreground">
                  Tell us about your laundry volume, frequency, special requirements, etc.
                </p>
              </div>

              <button type="submit" disabled={status !== "idle"} className="btn-ink mt-2 w-full sm:col-span-2 !min-h-[56px] text-base">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={status}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {status === "idle" && (
                      <>
                        Get Free Quote <ArrowUpRight weight="bold" />
                      </>
                    )}
                    {status === "sending" && (
                      <>
                        <CircleNotch className="animate-spin" /> Sending…
                      </>
                    )}
                    {status === "sent" && (
                      <>
                        <CheckCircle weight="fill" className="text-brass-light" /> Request sent
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactForm;
