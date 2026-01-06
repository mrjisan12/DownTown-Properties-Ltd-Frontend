import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CommonBanner = ({
  backgroundImage,
  subtitle,
  title,
  highlight,
  height = "80vh",
}) => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height }}
    >
      {/* Background */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-center bg-cover"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/70" />
      </motion.div>

      {/* Text */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4"
      >
        {subtitle && (
          <span className="uppercase tracking-[0.3em] text-sm mb-4 text-gray-300">
            {subtitle}
          </span>
        )}

        <h1 className="text-5xl md:text-8xl font-light tracking-tighter">
          {title}
          {highlight && (
            <>
              <br />
              <span className="font-serif italic">{highlight}</span>
            </>
          )}
        </h1>
      </motion.div>
    </div>
  );
};

export default CommonBanner;
