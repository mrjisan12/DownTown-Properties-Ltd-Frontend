import React, { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

const VideoGallery = ({ images = [] }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="px-6 md:px-12 py-24 bg-[#FAFAFA]">
      <div className="max-w-[1600px] mx-auto">
        {/* Minimalist Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-secondary-light font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
            The Collection
          </span>
          <h2 className="text-5xl md:text-7xl font-light text-secondary-light mb-6 tracking-tight">
            Cinematic <span className="font-serif italic text-slate-400">Stories</span>
          </h2>
          <div className="h-1 w-20 bg-secondary-light mx-auto rounded-full" />
        </motion.div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.8 }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <VideoCard
                {...item}
                videoId={item.video_id}
                isHovered={hoveredCard === item.id}
                onClick={() => setActiveVideo({ ...item, index })}
              />
            </motion.div>
          ))}
        </div>

        {/* Elegant Footer Stats */}
        {/* <div className="mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-slate-400 uppercase tracking-widest text-[10px] font-bold">
          <div className="flex gap-8 mb-4 md:mb-0">
            <span>{images.length} Productions</span>
            <span>4K Ultra HD</span>
          </div>
          <div className="text-slate-900">Scroll to explore more</div>
        </div> */}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            videoData={activeVideo}
            totalVideos={images.length}
            onNext={() => {
              const nextIndex = (activeVideo.index + 1) % images.length;
              setActiveVideo({ ...images[nextIndex], index: nextIndex });
            }}
            onPrev={() => {
              const prevIndex = (activeVideo.index - 1 + images.length) % images.length;
              setActiveVideo({ ...images[prevIndex], index: prevIndex });
            }}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;