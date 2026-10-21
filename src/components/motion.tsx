import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/constants";


export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    transition={{ duration: 0.9, ease, delay }}
  >
    {children}
  </motion.div>
);

// Counts up the numeric part of values like "10+", "500+", "99%", "24/7".
export const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match && !value.includes("/") ? Number(match[1]) : null;
  const [n, setN] = useState(target === null || reduce ? target : 0);

  useEffect(() => {
    if (!inView || target === null || reduce) return;
    const c = animate(0, target, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, target, reduce]);

  return <span ref={ref}>{target === null ? value : `${n}${match![2]}`}</span>;
};
