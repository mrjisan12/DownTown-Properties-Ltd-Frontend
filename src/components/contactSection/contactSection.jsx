import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import contactImg from "../../assets/BannerImages/C2.jpg";

const platformIcons = {
  instagram: <Instagram size={18} />,
  facebook: <Facebook size={18} />,
  twitter: <Twitter size={18} />,
  linkedin: <Linkedin size={18} />,
  youtube: <Youtube size={18} />,
  whatsapp: <MessageSquare size={18} />,
  default: <ExternalLink size={18} />,
};

const ContactSection = ({ settings, socials }) => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const data = settings?.data?.[0];

  const sortedSocials = useMemo(() => {
    if (!socials?.data) return [];
    return [...socials.data].sort((a, b) => Number(a.position) - Number(b.position));
  }, [socials]);

  const getPlatformIcon = (platform) =>
    platformIcons[platform?.toLowerCase()] || platformIcons.default;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden font-lato bg-[#0a0a0a]"
    >
      {/* 1. PARALLAX BACKGROUND */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-20 grayscale"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${contactImg})` }}
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT CONTENT AREA */}
          <div className="order-2 lg:order-1 w-full">
            <div className="mb-8 lg:mb-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="h-[1px] w-8 md:w-12 bg-primary"></span>
                <span className="text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase text-primary">
                  Get In Touch
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight text-white mb-6">
                Ready to start your <br className="hidden md:block" />
                <span className="italic font-serif text-primary">next chapter</span>?
              </h2>
            </div>

            {/* Glassmorphism Contact Cards */}
            <div className="flex flex-col gap-4 mb-10 w-full max-w-lg">
              {[
                { label: "Email", val: data?.primary_email, icon: <Mail size={20} /> },
                { label: "Phone", val: data?.primary_phone, icon: <Phone size={20} /> },
                { label: "Location", val: data?.address, icon: <MapPin size={20} /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start sm:items-center p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="ml-4 md:ml-5 overflow-hidden">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm md:text-base text-gray-200 font-light break-words">
                      {item.val}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-white/10 pt-8">
              <div className="flex flex-wrap gap-3 md:gap-4">
                {sortedSocials.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    whileHover={{ y: -5 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-primary hover:border-primary transition-colors"
                  >
                    {getPlatformIcon(social.platform)}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2 flex justify-center w-full px-4 sm:px-0"
          >
            {/* Decorative Background Frame - Hidden on smallest screens to avoid clutter */}
            <div className="absolute -inset-2 md:-inset-4 border border-primary/30 rounded-3xl translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 z-0" />
            
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] aspect-[4/5] md:aspect-[3/4] group">
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${contactImg})` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

              {/* Text Overlay on Image */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                <p className="text-white text-lg md:text-2xl font-light italic leading-snug">
                  "Excellence is not an act, but a habit."
                </p>
                <div className="h-1 w-10 md:w-12 bg-primary mt-3 md:mt-4" />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-2 sm:-right-6 md:-right-8 bg-primary px-4 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl shadow-2xl z-20"
            >
              <p className="text-black font-bold text-sm md:text-xl leading-none">Available</p>
              <p className="text-black/70 text-[8px] md:text-[10px] uppercase tracking-widest font-black mt-1">
                For Partnerships
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;