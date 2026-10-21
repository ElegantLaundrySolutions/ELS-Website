import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretLeft, CaretRight, X, Play, ArrowsOut } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion";
import { ease } from "@/lib/constants";
import { lockScroll } from "@/lib/scroll";

type Item = {
  name: string;
  type: "image" | "video";
  alt: string;
  title: string;
  category: string;
};

const items: Item[] = [
  { name: "building", type: "image", alt: "Front view of Elegant Laundry Solutions facility in Goa", title: "Laundry Facility Exterior", category: "Facility" },
  { name: "mvi_9032", type: "video", alt: "Bedsheets rolling through ironing machine", title: "Bedsheet Rolling", category: "Machinery" },
  { name: "img_8993", type: "image", alt: "Industrial washing machines used for bulk laundry processing", title: "Industrial Washing Machines", category: "Machinery" },
  { name: "img_9003", type: "image", alt: "Large-capacity washers operating for commercial laundry", title: "High-Capacity Washers", category: "Machinery" },
  { name: "img_9016", type: "image", alt: "Worker ironing hotel linen and uniforms with precision", title: "Professional Ironing", category: "Process" },
  { name: "mvi_9025", type: "video", alt: "Folded linen being packed for delivery", title: "Linen Packing for Delivery", category: "Service" },
  { name: "img_9008", type: "image", alt: "Commercial ironing press machine used for hotel linen", title: "Commercial Ironing Press", category: "Machinery" },
  { name: "img_9018", type: "image", alt: "Quality assurance check being performed on freshly cleaned linen", title: "Quality Assurance", category: "Process" },
  { name: "img_9041", type: "image", alt: "Inside view of the laundry facility with machinery and workflow layout", title: "Facility Interior View", category: "Facility" },
  { name: "mvi_9027", type: "video", alt: "Fresh laundry being unloaded from industrial washing machine", title: "Laundry Unloading", category: "Process" },
  { name: "img_9021", type: "image", alt: "Folding freshly washed hotel towels and bedsheets", title: "Linen Folding", category: "Process" },
  { name: "img_9028", type: "image", alt: "Washing process for hotel bedsheets and towels", title: "Linen Washing", category: "Process" },
  { name: "img_9034", type: "image", alt: "Industrial drying machine used for hotel bedsheets", title: "Commercial Dryer", category: "Machinery" },
  { name: "mvi_9026", type: "video", alt: "Linen being folded using industrial laundry equipment", title: "Linen Folding", category: "Process" },
  { name: "img_9042", type: "image", alt: "Laundry facility area showing equipment arrangement and sorting stations", title: "Facility Workspace Area", category: "Facility" },
  { name: "img_9045", type: "image", alt: "Clean and organized section of the laundry operations floor", title: "Operations Floor", category: "Facility" },
  { name: "img_9047", type: "image", alt: "Sorting and preparation zone inside Elegant Laundry Solutions facility", title: "Sorting Area", category: "Facility" },
  { name: "mvi_9036", type: "video", alt: "Bedsheets unrolling after pressing", title: "Bedsheet Unrolling", category: "Process" },
  { name: "img_9052", type: "image", alt: "Worker neatly folding cleaned clothes and linen", title: "Clothes Folding", category: "Process" },
];

const filters = ["All", "Facility", "Machinery", "Process", "Videos"];

const thumb = (it: Item) => (it.type === "video" ? `/media/${it.name}-poster.webp` : `/media/${it.name}-sm.webp`);

// Rhythm of tile sizes so the grid reads as an editorial collage.
const spans = ["md:col-span-2 md:row-span-2", "", "", "row-span-2", "", "col-span-2", "", ""];

const Tile = ({ item, i, onOpen }: { item: Item; i: number; onOpen: () => void }) => (
  <motion.button
    layout
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.5, ease }}
    onClick={onOpen}
    aria-label={`Open ${item.title}`}
    className={`group relative overflow-hidden rounded-2xl bg-ink/5 text-left ${spans[i % spans.length]}`}
    onPointerEnter={(e) => e.pointerType === "mouse" && e.currentTarget.querySelector("video")?.play().catch(() => {})}
    onPointerLeave={(e) => e.currentTarget.querySelector("video")?.pause()}
  >
    <img
      src={thumb(item)}
      alt={item.alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover saturate-[0.85] transition-transform duration-[1.2s] ease-out group-hover:scale-105"
    />
    {item.type === "video" && (
      <video
        src={`/media/${item.name}.mp4`}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    )}
    <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-90 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />
    {item.type === "video" ? (
      <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-linen/90 text-ink backdrop-blur transition-transform duration-500 group-hover:scale-110">
        <Play size={16} weight="fill" />
      </span>
    ) : (
      <span className="absolute right-3 top-3 hidden h-10 w-10 place-items-center rounded-full bg-linen/90 text-ink opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 md:grid">
        <ArrowsOut size={16} />
      </span>
    )}
    <span className="absolute inset-x-0 bottom-0 p-3 text-linen transition-transform duration-500 sm:p-4 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
      <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-brass-light">{item.category}</span>
      <span className="mt-1 block font-serif text-sm leading-tight sm:text-lg">{item.title}</span>
    </span>
  </motion.button>
);

const Lightbox = ({
  list,
  index,
  setIndex,
}: {
  list: Item[];
  index: number;
  setIndex: (i: number | null) => void;
}) => {
  const item = list[index];
  const go = useCallback((d: number) => setIndex((index + d + list.length) % list.length), [index, list.length, setIndex]);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [go, setIndex]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 text-linen backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIndex(null)}
    >
      <div className="flex items-center justify-between p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <span className="font-serif text-sm text-linen/60">
          {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
        </span>
        <button
          autoFocus
          onClick={() => setIndex(null)}
          aria-label="Close"
          className="grid h-12 w-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X size={22} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={item.name}
            className="flex max-h-full max-w-6xl touch-pan-y items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "video" ? (
              <video
                src={`/media/${item.name}.mp4`}
                poster={`/media/${item.name}-poster.webp`}
                controls
                autoPlay
                playsInline
                className="max-h-[72svh] w-auto max-w-full rounded-2xl"
              />
            ) : (
              <img
                src={`/media/${item.name}.webp`}
                alt={item.alt}
                draggable={false}
                className="max-h-[72svh] w-auto max-w-full rounded-2xl object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {[
          { d: -1, label: "Previous", Icon: CaretLeft, pos: "left-2 sm:left-6" },
          { d: 1, label: "Next", Icon: CaretRight, pos: "right-2 sm:right-6" },
        ].map(({ d, label, Icon, pos }) => (
          <button
            key={label}
            aria-label={label}
            onClick={(e) => {
              e.stopPropagation();
              go(d);
            }}
            className={`absolute ${pos} hidden h-14 w-14 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brass hover:text-ink sm:grid`}
          >
            <Icon size={22} />
          </button>
        ))}
      </div>

      <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center sm:p-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-brass-light">{item.category}</p>
        <p className="mt-1 font-serif text-xl">{item.title}</p>
        <p className="mt-2 text-xs text-linen/40 sm:hidden">Swipe to browse</p>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const list = items.filter((it) =>
    filter === "All" ? true : filter === "Videos" ? it.type === "video" : it.category === filter,
  );

  return (
    <section id="gallery" className="section-y">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <Reveal className="min-w-0 md:col-span-7">
            <p className="eyebrow">Inside Our Facility</p>
            <h2 className="heading mt-5 text-ink">Our Gallery</h2>
            <p className="lead mt-5 max-w-xl">
              Explore our state-of-the-art facility, quality work, and professional processes
            </p>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 md:col-span-5">
            <div
              role="tablist"
              aria-label="Filter gallery"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-end md:px-0"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors ${
                    filter === f ? "text-linen" : "text-ink/70 ring-1 ring-ink/15 hover:text-ink"
                  }`}
                >
                  {filter === f && (
                    <motion.span layoutId="gallery-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ duration: 0.45, ease }} />
                  )}
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 xs:auto-rows-[190px] sm:mt-14 md:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[230px]"
        >
          <AnimatePresence mode="popLayout">
            {list.map((it, i) => (
              <Tile key={it.name} item={it} i={i} onOpen={() => setOpen(i)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox list={list} index={open} setIndex={setOpen} />}</AnimatePresence>
    </section>
  );
};

export default Gallery;
