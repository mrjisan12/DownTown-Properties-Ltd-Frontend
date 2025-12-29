import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

const HomeBuilding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef(null);

  const fullText = "Witness as We Transform Your Land into a Landmark";

  const pairData = [
    { metric: "Total Area Built", value: "10M+", color: "#DAA520" },
    { metric: "Residential Projects", value: "120+", color: "#DAA520" },
    { metric: "Commercial Spaces", value: "80+", color: "#71717a" },
    { metric: "Years of Excellence", value: "25+", color: "#71717a" },
  ];

  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
  });

  const clipPath = useTransform(
    smoothProgress,
    [0, 0.4, 0.7],
    [
      "inset(100% 0% 0% 0% round 20px)",
      "inset(0% 0% 0% 0% round 20px)",
      "inset(0% 0% 0% 0% round 20px)",
    ]
  );

  const translateY = useTransform(smoothProgress, [0, 0.6], [50, -40]);
  const scale = useTransform(smoothProgress, [0, 0.4], [0.95, 1.05]);
  const brightness = useTransform(smoothProgress, [0, 0.4], [0.8, 1]);

  const [counters, setCounters] = useState({
    "10M+": 0,
    "120+": 0,
    "80+": 0,
    "25+": 0,
  });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      const finalValues = { "10M+": 10, "120+": 120, "80+": 80, "25+": 25 };
      const duration = 2000;
      const steps = 60;
      let step = 0;

      const counterInterval = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounters({
          "10M+": Math.floor(finalValues["10M+"] * progress),
          "120+": Math.floor(finalValues["120+"] * progress),
          "80+": Math.floor(finalValues["80+"] * progress),
          "25+": Math.floor(finalValues["25+"] * progress),
        });
        if (step >= steps) clearInterval(counterInterval);
      }, duration / steps);
    }
  }, [isInView]);

  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      className="w-full z-10 text-black py-16 md:py-32 overflow-hidden relative"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 md:w-125 h-64 md:h-125 bg-yellow-600/20 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-64 md:w-125 h-64 md:h-125 bg-zinc-600/20 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-tight mb-4 min-h-[3em] md:min-h-fit">
            {displayedText}
            {!typingComplete && (
              <span className="animate-pulse text-yellow-500">|</span>
            )}
          </motion.h1>
          {typingComplete && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-zinc-500 text-sm md:text-xl font-light tracking-widest"
            >
              ESTABLISHED 1998 — ARCHITECTURAL MARVELS
            </motion.p>
          )}
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr_1fr] gap-8 md:gap-12 items-center">
          
          {/* CENTER: The Building (Order 1 on mobile) */}
          <div className="w-full order-1 lg:order-2 flex justify-center items-center px-4 md:px-0">
            <motion.div
              style={{ clipPath, y: translateY, scale, brightness }}
              className="relative w-full max-w-lg lg:max-w-5xl mx-auto"
            >
              <motion.img
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                src="/src/assets/ShantaAssets/bigBuilding.webp"
                alt="Architecture"
                className="w-full aspect-[4/5] md:aspect-auto object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          {/* METRICS CONTAINER (Order 2 on mobile) */}
          {/* Using a grid of 2 columns on mobile, single column on desktop */}
          <div className="order-2 lg:order-1 w-full grid grid-cols-2 lg:grid-cols-1 gap-8 md:gap-24 lg:gap-32">
            {pairData.slice(0, 2).map((item, idx) => (
              <EnhancedMetricItem
                key={idx}
                item={item}
                isVisible={isVisible}
                index={idx}
                align="text-left"
                counterValue={counters[item.value]}
              />
            ))}
          </div>

          <div className="order-3 w-full grid grid-cols-2 lg:grid-cols-1 gap-8 md:gap-24 lg:gap-32">
            {pairData.slice(2, 4).map((item, idx) => (
              <EnhancedMetricItem
                key={idx}
                item={item}
                isVisible={isVisible}
                index={idx + 2}
                align="text-right"
                counterValue={counters[item.value]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const EnhancedMetricItem = ({ item, isVisible, index, align, counterValue }) => {
  // Logic to determine alignment on mobile vs desktop
  // On mobile, we usually center them within their grid cells
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 * index }}
      className={`flex flex-col ${align === "text-left" ? "lg:items-start" : "lg:items-end"} items-center text-center lg:${align} group`}
    >
      <div className="relative inline-block">
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none"
          style={{ color: item.color }}
        >
          {counterValue}{item.value.includes("+") ? "+" : ""}
        </h2>
        <motion.div
          className={`h-0.5 md:h-1 w-full bg-current mt-1 md:mt-2 origin-center lg:origin-${
            align === "text-left" ? "left" : "right"
          }`}
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
        />
      </div>
      <p className="mt-3 md:mt-4 text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase text-zinc-500">
        {item.metric}
      </p>
    </motion.div>
  );
};

export default HomeBuilding;