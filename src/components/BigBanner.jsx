import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop",
];

const BigBanner = ({ 
  title = "DOWNTOWN", 
  showTitle = true, 
  images = [] 
}) => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const displayImages = images.length > 0 ? images : DEFAULT_IMAGES;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /* ------------------ Refined Animations ------------------ */
  // The banner starts with margins and rounds corners, then expands to fill screen
  const marginX = useTransform(smoothProgress, [0, 0.2], ["4rem", "0rem"]);
  const bannerScale = useTransform(smoothProgress, [0, 0.2], [0.92, 1]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.2], ["80vh", "100vh"]);
  
  // Image inner parallax (the image zooms slightly as you scroll)
  const imageInnerScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);

  // Title Animations (Keeping your specific theme/position)
  const titleY = useTransform(smoothProgress, [0, 0.4], ["0%", "-120%"]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const splitPosition = useTransform(smoothProgress, [0, 0.3], ["50%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[180vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Your Original Title Theme - Preserved */}
        {showTitle && (
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute top-13 z-30 w-full text-center pointer-events-none"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl md:text-9xl font-black tracking-tighter relative"
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 text-transparent" style={{ WebkitTextStroke: "2px white" }}>
                  {title.toUpperCase()}
                </span>
                
                <motion.span
                  style={{
                    background: "black",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    clipPath: useTransform(splitPosition, (pos) => `inset(0 0 calc(100% - ${pos}) 0)`),
                  }}
                  className="absolute inset-0"
                >
                  {title.toUpperCase()}
                </motion.span>
                
                <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>
                  {title.toUpperCase()}
                </span>
              </span>
            </motion.h1>
          </motion.div>
        )}

        {/* Dynamic Premium Carousel Section */}
        <motion.div
          style={{ 
            marginLeft: marginX, 
            marginRight: marginX, 
            // borderRadius, 
            scale: bannerScale,
            height: bannerHeight,
            willChange: "transform, border-radius, width"
          }}
          className="relative w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-neutral-100"
        >
          <Carousel
            plugins={[autoplay.current]}
            opts={{ 
              loop: true,
              duration: 50, // Makes the transition between slides smoother
            }}
            className="w-full h-full"
          >
            <CarouselContent className="-ml-0"> {/* ml-0 removes gap glitching */}
              {displayImages.map((img, index) => (
                <CarouselItem key={index} className="pl-0 h-full">
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                      style={{ 
                        scale: imageInnerScale,
                        willChange: "transform"
                      }}
                      src={img.url || img}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-full object-cover select-none"
                    />
                    {/* Subtle Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
};

export default BigBanner;