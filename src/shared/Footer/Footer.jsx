import { Phone, Mail, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetSettingsQuery } from "@/redux/api/homeApi";
import FooterSkeletons from "@/components/skeletons/footerSkeletons";

const Footer = ({ socialLinks = [] }) => {
  const { data, isLoading, error } = useGetSettingsQuery();

  // SORT SAFELY
  const sortedSocialLinks = [...socialLinks].sort(
    (a, b) => a.position - b.position
  );

  // Loading State
  if (isLoading) return <FooterSkeletons />;

  // Error State
  if (error)
    return (
      <FooterSkeletons />
    );

  const footerData = data?.data?.[0];
  if (!footerData) return null;

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Residential Apartments",
    "Commercial Space",
    "Land Development",
    "Property Consultancy",
  ];

  return (
    <footer className="bg-slate-950 min-h-min text-slate-400 mt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Company Info */}
        <div className="space-y-6">
          <img
            src={footerData.logo}
            alt={footerData.site_name}
            className="h-16 w-auto object-contain hover:scale-105 transition-transform"
          />

          <p className="text-sm leading-relaxed text-slate-500">
            {footerData.site_tagline ||
              "Providing world-class real estate solutions with transparency and excellence."}
          </p>

          {/* ✅ Social Links NOW WORK */}
          {sortedSocialLinks.length > 0 && (
            <div className="flex items-center gap-4 pt-2">
              {sortedSocialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="group"
                >
                  <img
                    src={social.icon}
                    alt={social.platform}
                    className="h-8 w-8 object-contain opacity-70
                               group-hover:opacity-100
                               group-hover:scale-110
                               transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className="hover:text-white hover:pl-2 transition-all duration-200"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-6">Our Services</h3>
          <ul className="space-y-3 text-sm">
            {services.map((service) => (
              <li key={service} className="hover:text-slate-200 cursor-default">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-6">Contact Us</h3>
          <div className="space-y-4 text-sm">
            {[
              { icon: <MapPin size={16} />, text: footerData.address },
              { icon: <Phone size={16} />, text: footerData.primary_phone },
              { icon: <Mail size={16} />, text: footerData.primary_email },
            ].map((item, idx) => (
              <p key={idx} className="flex items-start gap-3 group">
                <span className="text-white group-hover:text-blue-400 transition-colors">
                  {item.icon}
                </span>
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8 text-center text-xs tracking-widest text-slate-600 uppercase">
        {footerData.footer_text ||
          `© ${new Date().getFullYear()} ${footerData.site_name}. All rights reserved.`}
      </div>
    </footer>
  );
};

export default Footer;
