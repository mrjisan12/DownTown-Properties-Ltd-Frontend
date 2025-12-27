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
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1920&auto=format&fit=crop"
];

const BigBanner = ({ 
  title = "DOWNTOWN", 
  showTitle = true, 
  images = [] 
}) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const displayImages = images.length > 0 ? images : DEFAULT_IMAGES;

  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start end" means animation starts as soon as the top of the component enters the bottom of the viewport
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll progress for that "liquid" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  /* ------------------ Light Theme Scroll Animations ------------------ */
  
  // Banner Expansion (Starts narrow/small, grows to full screen)
  const clipPath = useTransform(
    smoothProgress,
    [0, 0.4], // Completes expansion 40% into the scroll path
    ["inset(12% 15% 12% 15% round 40px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  // Subtle Image Parallax
  const imageScale = useTransform(smoothProgress, [0, 1], [1.2, 1.05]);
  
  // Title Floating & Fade
  const titleY = useTransform(smoothProgress, [0.1, 0.5], ["50px", "-100px"]);
  const titleOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
  const titleBlur = useTransform(smoothProgress, [0, 0.2], ["blur(10px)", "blur(0px)"]);

  return (
    <div ref={containerRef} className="relative w-full h-[160vh] bg-neutral-50">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Light Theme Title */}
        {showTitle && (
          <motion.div
            style={{ 
              y: titleY, 
              opacity: titleOpacity,
              filter: titleBlur
            }}
            className="absolute z-30 w-full text-center pointer-events-none"
          >
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-none text-white drop-shadow-2xl">
              {title.toUpperCase()}
            </h1>
          </motion.div>
        )}

        {/* The Carousel Container */}
        <motion.div
          style={{ 
            clipPath: clipPath,
            willChange: "clip-path"
          }}
          className="relative w-full h-full overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]"
        >
          <Carousel
            plugins={[autoplay.current]}
            opts={{ 
              loop: true,
              duration: 45, 
            }}
            className="w-full h-full"
          >
            <CarouselContent className="ml-0 h-full">
              {displayImages.map((img, index) => (
                <CarouselItem key={index} className="pl-0 h-full">
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                      style={{ 
                        scale: imageScale,
                      }}
                      src={img.url || img}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Light/Clean Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Minimalist Progress Indicator */}
          <div className="absolute bottom-12 left-12 z-40 flex items-center gap-4">
             <div className="h-[2px] w-24 bg-white/30 overflow-hidden">
                <motion.div 
                  className="h-full bg-white origin-left"
                  style={{ scaleX: smoothProgress }}
                />
             </div>
             <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                Explore
             </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BigBanner;