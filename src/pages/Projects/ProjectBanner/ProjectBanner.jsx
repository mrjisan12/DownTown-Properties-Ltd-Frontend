import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProjectBanner = () => {
  const { scrollY } = useScroll();
  
  // Maps scroll position (0 to 500px) to scale (1 to 1.2)
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-black">
      {/* Background Image with Framer Motion */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="h-full w-full bg-center bg-cover"
          style={{ backgroundImage: `url("https://images.unsplash.com/photo-1505691938895-1758d7feb511")` }}
        />
        {/* Darker Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
      </motion.div>

      {/* Centered Text - Fades out as you scroll */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-white"
      >
        <span className="uppercase tracking-[0.3em] text-sm mb-4 text-gray-300">Our Portfolio</span>
        <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-center">
          Architectural <br /> <span className="font-serif italic">Excellence</span>
        </h1>
      </motion.div>
    </div>
  );
};

export default ProjectBanner;