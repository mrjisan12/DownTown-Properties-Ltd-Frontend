import { Phone, Mail, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetFooterQuery } from "@/redux/api/homeApi";

const Footer = () => {
  const { data, isLoading, error } = useGetFooterQuery();

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-400">Loading footer...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load footer
      </div>
    );
  }

  // Extract the first element from the data array
  const footerData = data?.data?.[0];

  if (!footerData) return null; // fallback if no data

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <div className="flex items-center mb-2">
            <img
              src={footerData.logo}
              alt={footerData.site_name}
              className="h-20 object-contain"
            />
          </div>
          <p className="text-sm ml-4 leading-relaxed">
            {footerData.site_tagline || "Trusted real estate solutions across Bangladesh."}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white">About</NavLink></li>
            <li><NavLink to="/projects" className="hover:text-white">Projects</NavLink></li>
            <li><NavLink to="/gallery" className="hover:text-white">Gallery</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white">Contact</NavLink></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Residential Apartments</li>
            <li>Commercial Space</li>
            <li>Land Development</li>
            <li>Property Consultancy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {footerData.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> {footerData.primary_phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> {footerData.primary_email}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        {footerData.footer_text || `© ${new Date().getFullYear()} ${footerData.site_name}. All rights reserved.`}
      </div>
    </footer>
  );
};

export default Footer;
