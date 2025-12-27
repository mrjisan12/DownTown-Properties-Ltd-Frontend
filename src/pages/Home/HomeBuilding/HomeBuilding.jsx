import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const HomeBuilding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef(null);

  const fullText = "Witness as We Transform Your Land into a Landmark";

  const pairData = [
    { metric: "Total Area Built", value: "10M+", color: "#DAA520" }, // Primary Gold
    { metric: "Residential Projects", value: "120+", color: "#DAA520" },
    { metric: "Commercial Spaces", value: "80+", color: "#71717a" }, // Secondary Gray
    { metric: "Years of Excellence", value: "25+", color: "#71717a" },
  ];

  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
  });

  // Reveal Animations
  const clipPath = useTransform(
    smoothProgress,
    [0, 0.4, 0.7],
    ["inset(100% 0% 0% 0% round 30px)", "inset(0% 0% 0% 0% round 30px)", "inset(0% 0% 0% 0% round 30px)"]
  );

  const translateY = useTransform(smoothProgress, [0, 0.6], [100, -80]);
  const scale = useTransform(smoothProgress, [0, 0.4], [0.9, 1.05]);
  const brightness = useTransform(smoothProgress, [0, 0.4], [0.6, 1]);

  const [counters, setCounters] = useState({ "10M+": 0, "120+": 0, "80+": 0, "25+": 0 });

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
          "25+": Math.floor(finalValues["25+"] * progress)
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
    <section ref={containerRef} className="w-full  text-black py-32 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-yellow-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-zinc-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-400 mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-32">
          <motion.h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-6">
            {displayedText}
            {!typingComplete && <span className="animate-pulse text-yellow-500">|</span>}
          </motion.h1>
          {typingComplete && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-400 text-xl font-light tracking-wide">
              ESTABLISHED 1998 — ARCHITECTURAL MARVELS
            </motion.p>
          )}
        </div>

        {/* MAIN GRID: Pushing content to edges */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-4 items-center">
          
          {/* LEFT SIDE: Far Left */}
          <div className="flex flex-col gap-32 order-2 lg:order-1 items-start">
            {pairData.slice(0, 2).map((item, idx) => (
              <EnhancedMetricItem key={idx} item={item} isVisible={isVisible} index={idx} align="text-left" counterValue={counters[item.value]} />
            ))}
          </div>

          {/* CENTER: The Building */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <motion.div
              style={{ clipPath, y: translateY, scale, brightness }}
              className="relative w-full"
            >
              <motion.img
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                src="/src/assets/ShantaAssets/bigBuilding.webp"
                alt="Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* RIGHT SIDE: Far Right */}
          <div className="flex flex-col gap-32 order-3 items-end">
            {pairData.slice(2, 4).map((item, idx) => (
              <EnhancedMetricItem key={idx} item={item} isVisible={isVisible} index={idx + 2} align="text-right" counterValue={counters[item.value]} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const EnhancedMetricItem = ({ item, isVisible, index, align, counterValue }) => (
  <motion.div
    initial={{ opacity: 0, x: align === "text-left" ? -50 : 50 }}
    animate={isVisible ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 1, delay: 0.2 * index }}
    className={`${align} group`}
  >
    <div className="relative inline-block">
      <h2 
        className="text-8xl lg:text-9xl font-black tracking-tighter"
        style={{ color: item.color }}
      >
        {counterValue}{item.value.includes('+') ? '+' : ''}
      </h2>
      <motion.div 
        className={`h-1 w-full bg-current mt-2 origin-${align === 'text-left' ? 'left' : 'right'}`}
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ delay: 1 + (index * 0.1), duration: 0.8 }}
      />
    </div>
    <p className="mt-4 text-xs font-bold tracking-[0.5em] uppercase text-zinc-500 group-hover:text-white transition-colors">
      {item.metric}
    </p>
  </motion.div>
);

export default HomeBuilding;