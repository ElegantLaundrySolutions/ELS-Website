import { useEffect, useRef, useState } from "react";
import { X, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<{src: string, type: 'image' | 'video', title: string} | null>(null);

  const photoItems = [
    {
      src: "/gallery/building.png",
      type: "image" as const,
      alt: "Front view of Elegant Laundry Solutions facility in Goa",
      title: "Laundry Facility Exterior",
      category: "Facility"
    },
    {
      src: "/gallery/img_8993.png",
      type: "image" as const,
      alt: "Industrial washing machines used for bulk laundry processing",
      title: "Industrial Washing Machines",
      category: "Machinery"
    },
    {
      src: "/gallery/img_9003.jpg",
      type: "image" as const,
      alt: "Large-capacity washers operating for commercial laundry",
      title: "High-Capacity Washers",
      category: "Machinery"
    },
    {
      src: "/gallery/img_9008.jpg",
      type: "image" as const,
      alt: "Commercial ironing press machine used for hotel linen",
      title: "Commercial Ironing Press",
      category: "Machinery"
    },
    {
      src: "/gallery/img_9016.jpg",
      type: "image" as const,
      alt: "Worker ironing hotel linen and uniforms with precision",
      title: "Professional Ironing",
      category: "Process"
    },
    {
      src: "/gallery/img_9018.jpg",
      type: "image" as const,
      alt: "Quality assurance check being performed on freshly cleaned linen",
      title: "Quality Assurance",
      category: "Process"
    },
    {
      src: "/gallery/img_9021.jpg",
      type: "image" as const,
      alt: "Folding freshly washed hotel towels and bedsheets",
      title: "Linen Folding",
      category: "Process"
    },
    {
      src: "/gallery/img_9028.jpg",
      type: "image" as const,
      alt: "Washing process for hotel bedsheets and towels",
      title: "Linen Washing",
      category: "Process"
    },
    {
      src: "/gallery/img_9034.jpg",
      type: "image" as const,
      alt: "Industrial drying machine used for hotel bedsheets",
      title: "Commercial Dryer",
      category: "Machinery"
    },
    {
      src: "/gallery/img_9041.png",
      type: "image" as const,
      alt: "Inside view of the laundry facility with machinery and workflow layout",
      title: "Facility Interior View",
      category: "Facility"
    },
    {
      src: "/gallery/img_9042.png",
      type: "image" as const,
      alt: "Laundry facility area showing equipment arrangement and sorting stations",
      title: "Facility Workspace Area",
      category: "Facility"
    },
    {
      src: "/gallery/img_9045.png",
      type: "image" as const,
      alt: "Clean and organized section of the laundry operations floor",
      title: "Operations Floor",
      category: "Facility"
    },
    {
      src: "/gallery/img_9047.png",
      type: "image" as const,
      alt: "Sorting and preparation zone inside Elegant Laundry Solutions facility",
      title: "Sorting Area",
      category: "Facility"
    },
    {
      src: "/gallery/img_9052.jpg",
      type: "image" as const,
      alt: "Worker neatly folding cleaned clothes and linen",
      title: "Clothes Folding",
      category: "Process"
    }
  ];

  const videoItems = [
    {
      src: "/gallery/mvi_9025.MP4",
      type: "video" as const,
      poster: "/gallery/img_9052.jpg",
      alt: "Folded linen being packed for delivery",
      title: "Linen Packing for Delivery",
      category: "Service"
    },
    {
      src: "/gallery/mvi_9026.MP4",
      type: "video" as const,
      poster: "/gallery/img_9052.jpg",
      alt: "Linen being folded using industrial laundry equipment",
      title: "Linen Folding",
      category: "Process"
    },
    {
      src: "/gallery/mvi_9027.MP4",
      type: "video" as const,
      poster: "/gallery/img_9052.jpg",
      alt: "Fresh laundry being unloaded from industrial washing machine",
      title: "Laundry Unloading",
      category: "Process"
    },
    {
      src: "/gallery/mvi_9032.MP4",
      type: "video" as const,
      poster: "/gallery/img_9052.jpg",
      alt: "Bedsheets rolling through ironing machine",
      title: "Bedsheet Rolling",
      category: "Machinery"
    },
    {
      src: "/gallery/mvi_9036.MP4",
      type: "video" as const,
      poster: "/gallery/img_9052.jpg",
      alt: "Bedsheets unrolling after pressing",
      title: "Bedsheet Unrolling",
      category: "Process"
    }
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <section id="gallery" className="mobile-spacing bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-slate-800">
      <div className="content-container">
        <div className="text-center mb-8 md:mb-12 reveal">
          <h2 className="heading-lg mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Our Gallery
          </h2>
          <p className="text-lead max-w-2xl mx-auto text-muted-foreground">
            Explore our state-of-the-art facility, quality work, and professional processes
          </p>
        </div>

        {/* Desktop: Photos Slider (First Row) + Videos Slider (Second Row) */}
        <div className="hidden md:block space-y-12">
          {/* Photos Slider */}
          <div className="scroll-fade-in">
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Our Facility & Work</h3>
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {photoItems.map((item, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div 
                      className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl card-glow"
                      onClick={() => setSelectedItem({src: item.src, type: item.type, title: item.title})}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full mb-2">
                              {item.category}
                            </span>
                            <h3 className="font-semibold text-base leading-tight">{item.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Videos Slider */}
          <div className="scroll-slide-left">
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Process Videos</h3>
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {videoItems.map((item, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/2 lg:basis-1/3">
                    <div 
                      className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl card-glow"
                      onClick={() => setSelectedItem({src: item.src, type: item.type, title: item.title})}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                            <Play className="w-8 h-8 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full mb-2">
                            {item.category}
                          </span>
                          <h3 className="font-semibold text-base leading-tight">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>

        {/* Mobile: Photos Grid + Videos Slider */}
        <div className="md:hidden space-y-8">
          {/* Photos Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center text-foreground">Our Work</h3>

            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {/* One slide = 4 images in a grid */}
                <CarouselItem className="basis-full">
                  <div className="grid grid-cols-2 gap-3">
                    {photoItems.slice(0, 4).map((item, index) => (
                      <div 
                        key={index}
                        className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 active:scale-95"
                        onClick={() => setSelectedItem({src: item.src, type: item.type, title: item.title})}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-all duration-200" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full mb-1">
                              {item.category}
                            </span>
                            <h3 className="font-medium text-white text-xs leading-tight">{item.title}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>

                {/* EXTRA SLIDES (optional): show next 4, next 4… */}
                {photoItems.length > 4 && (
                  <CarouselItem className="basis-full">
                    <div className="grid grid-cols-2 gap-3">
                      {photoItems.slice(4, 8).map((item, index) => (
                        <div 
                          key={index}
                          className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 active:scale-95"
                          onClick={() => setSelectedItem({src: item.src, type: item.type, title: item.title})}
                        >
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-all duration-200" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full mb-1">
                                {item.category}
                              </span>
                              <h3 className="font-medium text-white text-xs leading-tight">{item.title}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CarouselItem>
                )}

              </CarouselContent>
{/* 
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" /> */}
            </Carousel>
          </div>


          {/* Videos Slider */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center text-foreground">Process Videos</h3>
            <Carousel 
              className="w-full max-w-sm mx-auto"
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {videoItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div 
                      className="group relative overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => setSelectedItem({src: item.src, type: item.type, title: item.title})}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={item.src}
                          muted
                          playsInline
                          loop
                          className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        {/* <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Play className="w-5 h-5 text-white" fill="white" />
                          </div>
                        </div> */}

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full mb-1">
                            {item.category}
                          </span>
                          <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>

        {/* Enhanced Lightbox */}
        {selectedItem && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedItem(null)}
          >
            <div className="relative max-w-5xl max-h-full animate-scale-in">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors duration-200 bg-white/10 backdrop-blur-sm rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm p-2">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.src}
                    controls
                    autoPlay
                    className="max-w-full max-h-[80vh] rounded-lg"
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt="Gallery item"
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white font-semibold text-lg">{selectedItem.title}</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;