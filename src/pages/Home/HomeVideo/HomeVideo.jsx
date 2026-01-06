import React, { useRef, useState } from "react";
 
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Loader2 } from "lucide-react";

const HomeVideo = ({ videoId = "_vtV8atti84" }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for autoplay support

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth Motion Values
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const styles = `
    .video-mask {
      background: radial-linear(circle at center, transparent 0%, rgba(15, 15, 15, 0.4) 100%);
    }
    .text-glow {
      text-shadow: 0 0 30px rgba(249, 174, 26, 0.3);
    }
    .glass-pill {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `;

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-[#0f0f0f]">
      <style>{styles}</style>

      {/* Sticky Video Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-[#0f0f0f]"
            >
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Engine */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full scale-[1.3] pointer-events-none">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
              allow="autoplay; encrypted-media"
              title="Hero Background Video"
            />
          </div>
          {/* Professional Overlays */}
          <div className="absolute inset-0 video-mask z-10" />
          <div className="absolute inset-0 bg-linear-to-b from-[#0f0f0f]/60 via-transparent to-[#0f0f0f] z-10" />
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-20 h-full w-full flex flex-col items-center justify-center px-6">
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="text-center max-w-5xl"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 glass-pill text-[10px] md:text-xs font-bold tracking-[0.4em] text-primary uppercase"
            >
              Beyond the Horizon
            </motion.span>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-8 text-glow">
              DOWN<span className="text-secondary-light">.</span>TOWN
            </h1>

            <div className="flex items-center justify-center gap-8 text-white/40 font-medium text-[10px] md:text-sm tracking-[0.2em] uppercase">
              <span className="hover:text-white transition-colors cursor-default">4K HDR</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="hover:text-white transition-colors cursor-default">Spatial Sound</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="hover:text-white transition-colors cursor-default">Exclusive Content</span>
            </div>
          </motion.div>
        </div>

        {/* Interaction Controls */}
        <div className="absolute bottom-10 left-10 z-30 flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-3 glass-pill px-5 py-3 rounded-full group overflow-hidden"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {isMuted ? (
                <VolumeX className="w-full h-full text-white/60 group-hover:text-primary transition-colors" />
              ) : (
                <Volume2 className="w-full h-full text-primary" />
              )}
            </div>
            <span className="text-white font-bold text-[10px] uppercase tracking-widest">
              {isMuted ? "Unmute Audio" : "Audio On"}
            </span>
          </motion.button>
        </div>

        {/* Vertical Scroll Indicator */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-8">
          <span className="rotate-90 text-white/30 text-[10px] uppercase tracking-[0.5em] origin-center">Scroll</span>
          <div className="w-px h-32 bg-white/10 relative overflow-hidden">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeVideo;