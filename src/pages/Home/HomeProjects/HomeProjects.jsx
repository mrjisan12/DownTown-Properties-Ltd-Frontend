import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HomeProjects = ({ projects = [], loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  if (loading) {
    return (
      <section className="h-screen  bg-black flex items-center justify-center text-white font-light tracking-widest">
        LOADING PROJECTS...
      </section>
    );
  }

  if (!projects.length) return null;

  const activeProject = projects[activeIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* ===== Main Background Slider ===== */}
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 8000, // Matches your 8-second video duration requirement
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {projects.map((project, idx) => (
          <SwiperSlide key={project.id || idx}>
            <div className="relative h-full w-full">
              {/* Image with subtle zoom effect */}
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: activeIndex === idx ? 1 : 1.1 }}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              {/* linear Overlays for Readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== Bottom Left Content ===== */}
      <div className="absolute bottom-12 left-8 md:left-16 z-20 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject?.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
               <span className="h-[1px] w-12 bg-white/50"></span>
               <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/80 font-medium">
                {activeProject?.project_type || "Featured Project"}
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 leading-tight">
              {activeProject?.title}
            </h1>

            <p className="text-sm md:text-base text-gray-300 mb-8 max-w-md font-light leading-relaxed">
              {activeProject?.short_description}
            </p>

            <button className="group relative flex items-center gap-4 text-white uppercase text-xs tracking-[0.2em] transition">
              <span className="border-b border-white/30 pb-1 group-hover:border-white transition-colors duration-300">
                Explore Project
              </span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== Floating Minimalist Video (Bottom Right) ===== */}
      <AnimatePresence>
        {activeProject?.videoID && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-12 right-8 z-30 hidden md:block"
          >
            <div className="relative group p-1 bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20">
              <div className="w-[300px] lg:w-[380px] aspect-video rounded-xl overflow-hidden relative">
                <iframe
                  src={`https://www.youtube.com/embed/${activeProject.videoID}?autoplay=1&mute=1&loop=1&playlist=${activeProject.videoID}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
                  className="w-[102.5%] h-[102.5%] -ml-[1%] -mt-[1%] pointer-events-none" // Small scale up hides tiny edge artifacts
                  allow="autoplay; encrypted-media"
                  title="Project Video"
                />
                {/* Visual Overlay to make it look premium */}
                <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay pointer-events-none" />
              </div>
              
              {/* Progress Ring or Bar to show slide timing */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                key={activeProject.id}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[2px] bg-white/60"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Swiper Styles for cleaner Navigation */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          transform: scale(0.6);
          opacity: 0.3;
          transition: opacity 0.3s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default HomeProjects;