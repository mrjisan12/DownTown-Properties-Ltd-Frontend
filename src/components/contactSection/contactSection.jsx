import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
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
import contactImg from "../../assets/BannerImages/ContactUs.avif";

const platformIcons = {
  instagram: <Instagram size={20} />,
  facebook: <Facebook size={20} />,
  twitter: <Twitter size={20} />,
  linkedin: <Linkedin size={20} />,
  youtube: <Youtube size={20} />,
  whatsapp: <MessageSquare size={20} />,
  default: <ExternalLink size={20} />,
};

const ContactSection = ({ settings, socials }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 50;
      const y = (clientY - window.innerHeight / 2) / 50;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const data = settings?.data?.[0];
  
  const sortedSocials = useMemo(() => {
    if (!socials?.data) return [];
    return [...socials.data].sort((a, b) => Number(a.position) - Number(b.position));
  }, [socials]);

  const getPlatformIcon = (platform) => {
    const key = platform?.toLowerCase();
    return platformIcons[key] || platformIcons.default;
  };

  return (
   <section
  ref={sectionRef}
  className="relative w-full min-h-screen flex items-center justify-center py-16 md:py-24 overflow-hidden bg-[#fafafa] font-lato"
>
  {/* Dynamic Background Ambient Glow */}
  <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
    <div
      className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 transition-transform duration-1000 ease-out"
      style={{
        background: "#978c21",
        transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
      }}
    />
  </div>

  <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-20 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* LEFT SIDE */}
      <div
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } order-2 lg:order-1`}
      >
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 md:mb-6">
            <span className="h-[1px] w-8 md:w-10 bg-primary"></span>
            <span className="font-poppins text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-primary">
              Contact Us
            </span>
          </div>

          <h2 className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.2] lg:leading-[1.1] text-secondary tracking-tight">
            Let’s create <br className="hidden sm:block" />
            <span className="italic text-primary">excellence</span>
            <span className="text-primary">.</span>
          </h2>
        </div>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-10 md:mb-12">
          {[
            { label: "Email", val: data?.primary_email || "hello@agency.com", icon: <Mail size={18} /> },
            { label: "Phone", val: data?.primary_phone || "+1 234 567 890", icon: <Phone size={18} /> },
            { label: "Studio", val: data?.address || "123 Design St. New York", icon: <MapPin size={18} />, span: "sm:col-span-2 lg:col-span-1" },
          ].map((item, i) => (
            <div
              key={i}
              className={`group flex items-center p-4 md:p-5 rounded-2xl border border-gray-100 lg:border-transparent hover:border-gray-200 bg-white lg:bg-transparent hover:bg-white transition-all duration-300 ${item.span || ""}`}
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary bg-primary/5 rounded-full lg:bg-transparent">
                {item.icon}
              </div>
              <div className="ml-4 overflow-hidden">
                <p className="font-poppins text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  {item.label}
                </p>
                <p className="text-sm md:text-base text-gray-700 font-medium group-hover:text-black transition-colors truncate">
                  {item.val}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 pt-6 border-t border-gray-100">
          {sortedSocials.length > 0 && (
            <p className="font-poppins text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Connect
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {sortedSocials.map((social) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-white transition-colors duration-300"
              >
                <div className="z-10">{getPlatformIcon(social.platform)}</div>
                <div className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 z-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`relative transition-all duration-[1200ms] delay-300 transform ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        } order-1 lg:order-2`}
      >
        <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-square shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center animate-slow-pan"
            style={{
              backgroundImage: `url(${contactImg})`,
              width: "120%",
              height: "120%",
              left: "-10%",
              top: "-10%",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Floating Badge */}
        <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-xl border border-gray-50">
          <p className="font-poppins italic text-primary text-xl md:text-2xl">
            Available
          </p>
          <p className="font-poppins text-gray-400 text-[8px] md:text-[10px] uppercase tracking-widest font-bold mt-1">
            for new projects
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default ContactSection;