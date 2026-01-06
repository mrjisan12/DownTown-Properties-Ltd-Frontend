import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Home,
  Building,
  Compass,
  MessageCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetSettingsQuery } from "@/redux/api/homeApi";
import FooterSkeletons from "@/components/skeletons/footerSkeletons";

const Footer = ({ socialLinks = [] }) => {
  const { data, isLoading, error } = useGetSettingsQuery();

  const sortedSocialLinks = [...socialLinks].sort(
    (a, b) => a.position - b.position
  );

  if (isLoading || error) return <FooterSkeletons />;

  const footerData = data?.data?.[0];
  if (!footerData) return null;

  const quickLinks = [
    { name: "Home", path: "/", icon: <Home size={14} /> },
    { name: "About", path: "/about", icon: <Compass size={14} /> },
    { name: "Projects", path: "/projects", icon: <Building size={14} /> },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact", icon: <MessageCircle size={14} /> },
  ];

  return (
    <footer className="relative bg-linear-to-b from-secondary to-gray-900 text-slate-300 mt-20 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={footerData.logo}
                alt={footerData.site_name}
                className="h-14 w-auto object-contain"
              />
              <div className="flex flex-col border-l border-primary/30 pl-3">
                <span className="text-xl font-bold text-white">
                  {footerData.site_name}
                </span>
                <span className="text-xs text-primary font-medium italic">
                  Turning Dreams into Addresses
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              {footerData.site_tagline ||
                "Where every home tells a story, and every property becomes a legacy."}
            </p>

            {/* Simple Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              {sortedSocialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-300 group"
                  title={social.platform}
                >
                  <img
                    src={social.icon}
                    alt={social.platform}
                    className="h-5 w-5 invert opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b border-primary/20 pb-2 inline-block">
              Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="flex items-center gap-2 py-1 text-slate-400 hover:text-primary transition-all duration-300 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0"
                    />
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b border-primary/20 pb-2 inline-block">
              Our Expertise
            </h3>
            <ul className="space-y-4">
              {[
                "Residential Apartments",
                "Commercial Space",
                "Land Development",
                "Property Consultancy",
              ].map((service) => (
                <li key={service} className="text-sm text-slate-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b border-primary/20 pb-2 inline-block">
              Get In Touch
            </h3>
            <div className="space-y-5">
              {[
                { icon: <MapPin size={18} />, text: footerData.address },
                { icon: <Phone size={18} />, text: footerData.primary_phone },
                { icon: <Mail size={18} />, text: footerData.primary_email },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="text-primary mt-1">{item.icon}</div>
                  <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
            <p>
              © {new Date().getFullYear()} {footerData.site_name}. All rights
              reserved.
            </p>

            {/* Credits Section */}
            <div className="flex items-center gap-1">
              <span>Design & Development by</span>
              <a
                href="https://ilabs360.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium transition-all"
              >
                Innovation Lab 360
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
              <span className="text-[8px] text-[#071636] ">Eshrak</span>{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
