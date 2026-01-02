import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BannerDetProject = ({ banner, title, status }) => {
  const [loaded, setLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effects
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);

  // Split title for character animation
  const titleChars = title.split("");

  return (
    <motion.section
      className="relative w-screen h-screen overflow-hidden -mx-[calc((100vw-100%)/2)] pointer-events-none"
      style={{ opacity }}
    >
      {/* Dynamic linear overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>

        {/* Animated linear orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale }}
      >
        <img
          src={banner}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
          }`}
          onLoad={() => setLoaded(true)}
          style={{ objectPosition: "center 35%" }}
        />

        {/* Loading shimmer effect */}
        {!loaded && (
          <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 animate-shimmer bg-size-[200%_100%]"></div>
        )}
      </motion.div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-10 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-30 h-full flex flex-col justify-center px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Status Badge with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-500 rounded-full"
            />
            <span className="text-sm md:text-base font-semibold tracking-[0.3em] text-white/90 uppercase">
              {status}
            </span>
            <motion.div
              className="w-12 h-px bg-linear-to-r from-white/50 to-transparent"
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Animated Title */}
        <div className="overflow-hidden">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 md:mb-8 leading-none">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {titleChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 50,
                    rotateX: 90,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: "backOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -10,
                    textShadow: "0 10px 20px rgba(0,0,0,0.5)",
                  }}
                  className="inline-block cursor-default hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-white hover:via-gray-300 hover:to-white transition-all duration-300"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </h1>
        </div>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg md:text-xl lg:text-2xl text-white/80 font-light tracking-wide max-w-4xl mx-auto text-center mt-4 md:mt-6 px-4"
        >
          Discover the architectural marvel that redefines modern living spaces
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
          className="h-px bg-linear-to-r from-transparent via-white/50 to-transparent mt-12 md:mt-16 max-w-4xl mx-auto w-full"
        />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/60 text-sm tracking-widest uppercase animate-pulse">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      {/* <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/20 z-30"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/20 z-30"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/20 z-30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/20 z-30"></div> */}

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default BannerDetProject;
