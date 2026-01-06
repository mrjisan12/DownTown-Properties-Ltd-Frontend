import { useState } from "react";

export const VideoCard = ({ videoId, title, onClick }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div
      onMouseEnter={() => setIsMuted(false)}
      onMouseLeave={() => setIsMuted(true)}
      onClick={onClick}
      className="relative rounded-xl overflow-hidden cursor-pointer group bg-black aspect-video"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
          isMuted ? 1 : 0
        }&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        className="w-full h-full pointer-events-none"
        allow="autoplay; encrypted-media"
        title={title}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
        <p className="text-sm text-white font-medium">{title}</p>
      </div>
    </div>
  );
};
