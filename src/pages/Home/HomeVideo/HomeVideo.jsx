import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Volume2, VolumeX, Loader2 } from "lucide-react";

const HomeVideo = ({ videoSrc }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Scroll animations using Framer Motion[citation:1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect with smooth spring animation[citation:9]
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const smoothVideoY = useSpring(videoY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const smoothVideoScale = useSpring(videoScale, {
    stiffness: 150,
    damping: 25,
  });

  // Marquee speed based on scroll
  const marqueeSpeed = useTransform(scrollYProgress, [0, 1], [30, 15]);

  // Background color transformation based on scroll[citation:1]
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#1a1a1a", "#0f0f0f", "#1a1a1a"]
  );

  const marqueeItems = [
    { text: "On time delivery", dotColor: "#F9AE1A" },
    { text: "Prime location", dotColor: "#96D9F9" },
    { text: "Top quality materials", dotColor: "#FCCA14" },
    { text: "Professional management", dotColor: "#7CB8C4" },
  ];

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        setVideoLoaded(true);
        setTimeout(() => setIsLoading(false), 800); // Delay for smooth transition
      };

      const handleError = () => {
        setVideoError(true);
        setIsLoading(false);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Inline CSS for animations[citation:2]
  const styles = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 25s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.05); }
    }
    .animate-pulse-glow {
      animation: pulse-glow 3s ease-in-out infinite;
    }
    .video-gradient-overlay {
      background: linear-gradient(
        180deg,
        rgba(26, 26, 26, 0.9) 0%,
        transparent 20%,
        transparent 80%,
        rgba(26, 26, 26, 0.9) 100%
      );
    }
    .glass-effect {
      background: rgba(26, 26, 26, 0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `;

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full overflow-hidden min-h-[90vh]"
    >
      <style jsx>{styles}</style>

      {/* Loading Skeleton - Shadcn inspired[citation:2][citation:6] */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-black"
          >
            <div className="relative w-full max-w-4xl mx-auto px-4">
              {/* Main video skeleton */}
              <div className="relative h-[60vh] md:h-[75vh] lg:h-[80vh] rounded-xl overflow-hidden bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
                {/* Shimmer effect */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F9AE1A]/10 to-transparent animate-shimmer" />
                </div>

                {/* Skeleton content structure */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top section skeleton */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="h-4 w-32 bg-gradient-to-r from-[#F9AE1A]/20 to-[#FCCA14]/20 rounded animate-pulse-glow" />
                      <div className="h-3 w-24 bg-gradient-to-r from-[#96D9F9]/20 to-[#7CB8C4]/20 rounded" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#F37067]/20 to-[#F9AE1A]/20 animate-pulse" />
                  </div>

                  {/* Middle section skeleton */}
                  <div className="flex justify-center">
                    <div className="text-center space-y-4">
                      <div className="h-8 w-64 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mx-auto" />
                      <div className="h-4 w-48 bg-gradient-to-r from-white/10 to-white/5 rounded mx-auto" />
                      <div className="h-12 w-12 rounded-full border-4 border-[#F9AE1A]/30 mx-auto flex items-center justify-center">
                        <Loader2 className="h-6 w-6 text-[#F9AE1A]/50 animate-spin" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom section skeleton */}
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gradient-to-r from-white/10 to-white/5 rounded" />
                    <div className="h-3 w-4/5 bg-gradient-to-r from-white/10 to-white/5 rounded" />
                    <div className="h-3 w-3/5 bg-gradient-to-r from-white/10 to-white/5 rounded" />
                  </div>
                </div>
              </div>

              {/* Loading text */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-8"
              >
                <div className="inline-flex items-center space-x-3 text-white/60">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium tracking-wide">
                    Loading immersive experience...
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Container with parallax */}
      <motion.div
        style={{ y: smoothVideoY, scale: smoothVideoScale }}
        className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden"
      >
        {/* Error state */}
        {videoError ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-black">
            <div className="text-center space-y-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#F37067]/20 to-[#F9AE1A]/20 flex items-center justify-center mx-auto">
                <VolumeX className="h-12 w-12 text-[#F37067]/50" />
              </div>
              <h3 className="text-white/80 font-semibold text-lg">
                Video Unavailable
              </h3>
              <p className="text-white/50 text-sm max-w-sm">
                The video content failed to load. Please check your connection.
              </p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadStart={() => setIsLoading(true)}
            />

            {/* Mute/Unmute Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="absolute bottom-14 right-14 z-30 p-3 rounded-full glass-effect shadow-2xl group"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              <div className="relative">
                {/* Button background glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F9AE1A] to-[#FCCA14] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />

                {/* Icon */}
                {isMuted ? (
                  <VolumeX className="h-6 w-6 text-white/80 group-hover:text-[#F9AE1A] transition-colors duration-300" />
                ) : (
                  <Volume2 className="h-6 w-6 text-white/80 group-hover:text-[#F9AE1A] transition-colors duration-300" />
                )}

                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#F9AE1A]/30"
                  animate={
                    isMuted
                      ? {}
                      : {
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Tooltip */}
              {isMuted && (
                <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-3 py-1.5 rounded-md glass-effect whitespace-nowrap text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  Click to unmute
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/20" />
                </div>
              )}
            </motion.button>
          </>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 video-gradient-overlay" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(90deg, 
              rgba(249, 174, 26, 0.1) 0%, 
              rgba(150, 217, 249, 0.05) 25%, 
              rgba(252, 202, 20, 0.1) 50%, 
              rgba(124, 184, 196, 0.05) 75%, 
              rgba(243, 112, 103, 0.1) 100%)`,
          }}
        />

        {/* Animated floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-xl"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                background:
                  i === 1 ? "#F9AE1A" : i === 2 ? "#96D9F9" : "#FCCA14",
                opacity: 0.1,
                top: `${20 + i * 20}%`,
                left: `${i * 30}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Marquee Banner */}
      <div className="absolute top-0 left-0 w-full z-20">
        {/* Animated gradient border */}
        <motion.div
          className="h-1.5 w-full"
          animate={{
            background: [
              "linear-gradient(90deg, #F9AE1A, #96D9F9, #FCCA14, #7CB8C4, #F37067)",
              "linear-gradient(90deg, #F37067, #F9AE1A, #96D9F9, #FCCA14, #7CB8C4)",
              "linear-gradient(90deg, #7CB8C4, #F37067, #F9AE1A, #96D9F9, #FCCA14)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Marquee container with glass effect[citation:10] */}
        <div className="glass-effect py-3 md:py-4 overflow-hidden border-b border-white/10">
          <motion.div
            className="whitespace-nowrap flex items-center animate-marquee"
            style={{
              animationDuration: `${marqueeSpeed}s`,
            }}
          >
            {[...Array(4)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {marqueeItems.map((item, index) => (
                  <motion.span
                    key={`${setIndex}-${index}`}
                    className="mx-6 md:mx-8 flex items-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="w-2.5 h-2.5 rounded-full mr-3 relative"
                      style={{ backgroundColor: item.dotColor }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-full blur-md"
                        style={{ backgroundColor: item.dotColor, opacity: 0.5 }}
                      />
                    </motion.span>
                    <span className="text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm group-hover:text-[#FCCA14] transition-colors duration-300">
                      {item.text}
                    </span>
                    {index < marqueeItems.length - 1 && (
                      <span className="mx-4 text-[#7CB8C4] font-light">•</span>
                    )}
                  </motion.span>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Audio status indicator */}
      <AnimatePresence>
        {!isMuted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 right-0 z-20 flex items-center space-x-2 px-4 py-2 rounded-full glass-effect"
          >
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-[#F9AE1A] to-[#FCCA14]"
                  animate={{
                    height: ["4px", "12px", "4px"],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-white/80">
              Audio playing
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <div className="text-white text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isLoading ? "Loading..." : "Scroll to explore"}
          </div>
          <div className="w-8 h-12 border-2 rounded-full flex justify-center relative overflow-hidden border-white/30 group-hover:border-[#F9AE1A] transition-colors duration-300">
            <motion.div
              className="w-1 h-3 rounded-full absolute top-2"
              style={{ backgroundColor: "#F9AE1A" }}
              animate={{
                top: ["8px", "24px", "8px"],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="absolute inset-0 rounded-full blur-md bg-[#F9AE1A] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner accents */}
      {/* <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#F9AE1A] opacity-30" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#96D9F9] opacity-30" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#FCCA14] opacity-30" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#7CB8C4] opacity-30" /> */}
    </motion.section>
  );
};

export default HomeVideo;
