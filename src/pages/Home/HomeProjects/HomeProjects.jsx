import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

const HomeProjects = ({ projects = [], loading }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (projects.length > 0) {
      setActiveProject(projects[0]);
    }
  }, [projects]);

  if (loading) {
    return (
      <section className="h-screen bg-black flex items-center justify-center text-white">
        Loading Projects...
      </section>
    );
  }

  if (!projects.length) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* ===== Projects Carousel ===== */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 6000 }}
        loop
        onSlideChange={(swiper) =>
          setActiveProject(projects[swiper.realIndex])
        }
        className="h-full w-full"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Text Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 text-white">
                  <p className="uppercase tracking-widest text-sm mb-2">
                    Featured Project • {project.project_type}
                  </p>

                  <h1 className="text-5xl md:text-7xl font-light mb-4">
                    {project.title}
                  </h1>

                  <p className="text-lg text-gray-300 mb-2">
                    {project.location}
                  </p>

                  <p className="max-w-xl text-gray-300 mb-8">
                    {project.short_description}
                  </p>

                  <button className="flex items-center gap-3 text-white border-b border-white pb-1 hover:opacity-70 transition">
                    View Project
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== Floating YouTube Video ===== */}
      {activeProject?.videoID && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-8 right-8 z-30 w-[320px] md:w-[420px] aspect-video rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${activeProject.videoID}?autoplay=1&mute=${
                isMuted ? 1 : 0
              }&loop=1&playlist=${activeProject.videoID}&controls=0&modestbranding=1&rel=0`}
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media"
              title="Project Video"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HomeProjects;
