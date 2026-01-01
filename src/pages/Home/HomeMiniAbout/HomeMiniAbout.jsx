import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const HomeMiniAbout = ({
  title,
  description,
  image,
  metrics = [],
  reverse = false,
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced image drop animation - starts from above screen
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["-100%", "0%", "0%", "-50%"]
  );

  // Image rotation and scale effect
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -2]);
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.8, 1, 0.95]);

  // Text animations
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const textX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [reverse ? 100 : -100, 0]
  );

  // Background animation using your theme colors
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative overflow-hidden py-20 md:py-32 bg-background"
    >
      {/* Animated background gradient using your theme colors */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5"
      />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-primary/20"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/4 right-10 w-8 h-8 rounded-full bg-secondary/20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image Container with Drop Animation */}
          <motion.div
            ref={imageRef}
            style={{
              y: imageY,
              rotate: imageRotate,
              scale: imageScale,
            }}
            className={`relative order-1 ${
              reverse ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* Outer glow container */}
            <div className="relative p-1 rounded-3xl ">
              {/* Main image with drop effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1],
                    opacity: { duration: 0.6 },
                  },
                }}
                viewport={{ once: true, amount: 0.5 }}
                className="relative overflow-hidden rounded-2xl "
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto aspect-4/5 md:aspect-3/4 object-cover"
                />

                {/* Gradient overlay */}
                {/* <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" /> */}

                {/* Reflective shine effect */}
                {/* <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent" /> */}
              </motion.div>

              {/* Animated border */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                  // background:
                  //   "linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))",
                  backgroundSize: "300% 300%",
                }}
              />
            </div>

            {/* Floating decorative badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className={`absolute -bottom-4 ${
                reverse ? "-left-4" : "-right-4"
              } w-24 h-24 rounded-2xl bg-linear-to-br from-primary to-secondary p-1 shadow-2xl`}
            >
              <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-primary text-xl font-bold"
                  >
                    ★
                  </motion.div>
                  <div className="text-xs text-foreground/70 mt-1">Premium</div>
                </div>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Text Content */}
          <motion.div
            style={{
              opacity: textOpacity,
              x: textX,
            }}
            className={`order-2 ${reverse ? "lg:order-1" : "lg:order-2"}`}
          >
            <div className="max-w-xl mx-auto">
              {/* Section indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-0.5 bg-linear-to-r from-primary to-secondary mb-6"
              />

              {/* Title with character reveal effect */}
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
              >
                {title.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-3">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: wordIndex * 0.1 + letterIndex * 0.03,
                            duration: 0.3,
                          },
                        }}
                        viewport={{ once: true }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.4,
                  },
                }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
              >
                {description}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.5,
                  },
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px -5px var(--color-primary)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group text-white inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-primary to-primary/80 font-semibold hover:shadow-xl transition-all duration-300"
              >
                <Link to="/about">
                  <span>Discover More</span>
                </Link>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              {/* Stats section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.6,
                  },
                }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-border/50"
              >
                <div className="grid grid-cols-3 gap-8">
                  {metrics.map((metric, index) => (
                    <div key={metric.id || index} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wider">
                        {metric.name}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
          Scroll
        </div>
        <motion.div
          animate={{
            height: ["16px", "32px", "16px"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-px bg-linear-to-b from-primary via-secondary to-transparent"
        />
      </motion.div>
    </motion.section>
  );
};

export default HomeMiniAbout;
