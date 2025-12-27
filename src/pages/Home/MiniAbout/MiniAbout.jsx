import React from "react";
import { motion } from "framer-motion";

const MiniAbout = ({ title, description, image, reverse = false }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div
        className={`max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl shadow-xl"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </div>
    </section>
  );
};

export default MiniAbout;
