import Lenis from "lenis";

let lenis: Lenis | null = null;

export const startSmoothScroll = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ lerp: 0.1 });
  let raf = 0;
  const loop = (t: number) => {
    lenis?.raf(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
};

// Offset keeps section headings clear of the fixed nav.
export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const lockScroll = (locked: boolean) => {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
};
