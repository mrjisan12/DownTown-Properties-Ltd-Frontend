import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const PhotoGallery = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Enhanced cinematic floating animations (subtle internal movement)
  const floatingVariants = {
    initial: { scale: 1, y: 0, x: 0 },
    float: {
      scale: [1, 1.02, 1],
      y: ["0%", "-2%", "0%"],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  // Subtle parallax effect variants
  const parallaxVariants = {
    initial: { y: 0 },
    parallax: {
      y: ["0%", "10%"],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        repeatType: "reverse"
      }
    }
  };

  // Glow effect for images
  const glowVariants = {
    initial: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
    glow: {
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0)",
        "0 0 40px 10px rgba(59, 130, 246, 0.3)",
        "0 0 0 0 rgba(59, 130, 246, 0)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <section className="container mx-auto relative -mt-24 overflow-hidden">
      {/* Background cinematic elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className=" mx-auto px-4 relative z-10">
        {/* Enhanced Grid Layout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]"
        >
          {images.map((item, index) => {
            const isLarge = index % 5 === 0;
            const isTall = index % 7 === 0;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                animate={isHovered ? "float" : "initial"}
                variants={floatingVariants}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl
                  ${isLarge ? "md:col-span-2 md:row-span-2" : ""} 
                  ${isTall ? "md:row-span-2" : ""}
                  transform-gpu`}
                onClick={() => handleImageClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow effect container */}
                <motion.div
                  variants={glowVariants}
                  animate={isHovered ? "glow" : "initial"}
                  className="absolute inset-0 z-10 pointer-events-none rounded-3xl"
                />

                {/* Main Image Container with Parallax Effect */}
                <div className="relative w-full h-full overflow-hidden">
                  <motion.div
                    variants={parallaxVariants}
                    animate="parallax"
                    className="absolute inset-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Cinematic Overlay with linear Animation */}
                  <motion.div 
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: isHovered ? 0.8 : 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"
                  />

                  {/* Subtle Scanline Effect */}
                  <motion.div
                    animate={{
                      y: ["-100%", "100%"],
                      opacity: [0, 0.05, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="absolute inset-x-0 h-1 bg-linear-to-r from-transparent via-primary-light to-transparent z-20"
                  />

                  {/* Enhanced Text Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-30">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: isHovered ? 0 : 20, 
                        opacity: isHovered ? 1 : 0 
                      }}
                      transition={{ duration: 0.5 }}
                      className="mb-4"
                    >
                      <p className="text-primary-light text-xs font-bold uppercase tracking-[0.3em] mb-2">
                        {item.place || "EXPLORER"}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-px w-8 bg-linear-to-r from-yellow-400 to-transparent" />
                        <span className="text-xs text-gray-300 tracking-widest">
                          {item.category || "PHOTOGRAPHY"}
                        </span>
                      </div>
                    </motion.div>

                    <motion.h4
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: isHovered ? 0 : 20, 
                        opacity: isHovered ? 1 : 1 
                      }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-2xl md:text-3xl font-serif text-white leading-tight mb-4"
                    >
                      {item.title}
                    </motion.h4>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: isHovered ? 0 : 20, 
                        opacity: isHovered ? 1 : 0 
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex items-center gap-4"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.1 : 1
                          }}
                          transition={{ duration: 0.5 }}
                          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.div>
                      </div>
                      <span className="text-white/90 text-sm tracking-wider uppercase font-light">
                        View Experience
                      </span>
                    </motion.div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/30" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/30" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

     
      </div>

      {/* Enhanced Lightbox Configuration */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((img) => ({
          src: img.image,
          title: <span className="text-3xl font-serif tracking-wide bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">{img.title}</span>,
          description: (
            <div className="flex items-center gap-3 text-gray-300 font-light">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <span className="tracking-wide">{img.place}</span>
            </div>
          ),
        }))}
        plugins={[Zoom, Captions, Thumbnails]}
        styles={{
          container: { 
            backgroundColor: "rgba(0, 0, 0, 0.98)",
            backdropFilter: "blur(20px)"
          },
          captionsTitle: { 
            color: "#fff", 
            marginBottom: "12px",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)"
          },
          captionsDescription: { 
            color: "#ccc", 
            fontSize: "1.1rem",
            fontFamily: "sans-serif"
          },
        }}
        animation={{ fade: 600, swipe: 400 }}
        carousel={{
          finite: false,
          preload: 2,
          padding: { top: 40, bottom: 40, sides: 40 }
        }}
        controller={{ 
          touchAction: "pan-y",
          swipe: true 
        }}
      />
    </section>
  );
};

export default PhotoGallery;