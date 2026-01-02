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
  MessageSquare, // Used for WhatsApp
} from "lucide-react";
import contactImg from "../../assets/BannerImages/ContactUs.avif";

// Consistent with your Navbar implementation
const platformIcons = {
  instagram: <Instagram size={20} />,
  facebook: <Facebook size={20} />,
  twitter: <Twitter size={20} />,
  linkedin: <Linkedin size={20} />,
  youtube: <Youtube size={20} />,
  whatsapp: <MessageSquare size={20} />, // You can also use Phone as in Navbar
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
  
  // Logic to sort and handle the API response structure
  const sortedSocials = useMemo(() => {
    if (!socials?.data) return [];
    return [...socials.data].sort(
      (a, b) => Number(a.position) - Number(b.position)
    );
  }, [socials]);

  // Helper to get the icon (Same logic as Navbar)
  const getPlatformIcon = (platform) => {
    const key = platform?.toLowerCase();
    return platformIcons[key] || platformIcons.default;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-24 overflow-hidden bg-[#fafafa]"
    >
      {/* Dynamic Background Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 transition-transform duration-1000 ease-out"
          style={{
            background: "#978c21",
            transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT SIDE: CONTENT */}
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-10 bg-[#978c21]"></span>
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#978c21]">
                  Contact Us
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-light leading-[1.1] text-slate-900 tracking-tight">
                Let’s create <br />
                <span className="font-serif italic text-[#978c21] serif-font">excellence</span>
                <span className="text-[#978c21]">.</span>
              </h2>
            </div>

            <div className="space-y-4 mb-12">
              {[
                {
                  label: "Email",
                  val: data?.primary_email || "hello@agency.com",
                  icon: <Mail size={20} strokeWidth={1.5} />,
                },
                {
                  label: "Phone",
                  val: data?.primary_phone || "+1 234 567 890",
                  icon: <Phone size={20} strokeWidth={1.5} />,
                },
                {
                  label: "Studio",
                  val: data?.address || "123 Design St. New York",
                  icon: <MapPin size={20} strokeWidth={1.5} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center p-5 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-white transition-all duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-[#978c21]">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      {item.label}
                    </p>
                    <p className="text-base text-gray-700 font-medium group-hover:text-black transition-colors">
                      {item.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* UPDATED Socials Section */}
            <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
              {sortedSocials.length > 0 && (
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Connect
                </p>
              )}

              <div className="flex gap-4">
                {sortedSocials.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="group relative w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-white transition-colors duration-300"
                  >
                    <div className="z-10">
                      {/* Using the logic from your Navbar */}
                      {getPlatformIcon(social.platform)}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#978c21] scale-0 group-hover:scale-100 transition-transform duration-300 z-0" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE */}
          <div
            className={`relative transition-all duration-[1500px] delay-300 transform ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-[#978c21] font-serif italic text-2xl">Available</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                for new projects
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-pan {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(-2%, -2%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        .animate-slow-pan {
          animation: slow-pan 20s ease-in-out infinite;
        }
        .serif-font {
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;