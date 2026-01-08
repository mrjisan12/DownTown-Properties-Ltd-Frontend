import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  Send,
  MapPin,
  ArrowRight,
} from "lucide-react";

const GetInTouchSection = ({ onSubmit, loading, settings }) => {
  const embedUrl = settings?.data[0]?.google_map_embed;

  // fallback-safe clickable link
  const mapLink = embedUrl ? embedUrl.replace("/maps/embed?", "/maps?") : "#";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const data = settings?.data?.[0];

  // Modern input styling with dynamic borders
  const inputWrapperClasses = (fieldName) => `
    relative group transition-all duration-300 border-b-2
    ${focusedField === fieldName ? "border-primary" : "border-gray-200"}
  `;

  return (
    <section
      id="submit"
      className="relative py-24 bg-[#faf9f6] overflow-hidden"
    >
      {/* Background Decorative Text */}
      <div className="absolute top-10 right-[-5%] text-[18vw] font-black text-black/[0.03] select-none leading-none pointer-events-none uppercase">
        Inquiry
      </div>

      <div className="container mx-auto md:px-6 relative z-10">
        <div className="bg-white md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* LEFT — FORM SIDE */}
          <div className="lg:w-3/5 p-8 md:p-16 lg:p-20">
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-primary"></span>
                <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">
                  Write to us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
                Send a <span className="italic text-primary">Message</span>
              </h2>
            </header>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12"
            >
              {/* Full Name */}
              <div className={inputWrapperClasses("name")}>
                <label
                  className={`absolute transition-all duration-300 flex items-center gap-2 ${
                    formData.name || focusedField === "name"
                      ? "-top-6 text-[10px] text-primary font-black uppercase tracking-widest"
                      : "top-3 text-gray-400"
                  }`}
                >
                  <User size={14} /> Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  type="text"
                  required
                  className="w-full bg-transparent py-3 outline-none text-slate-800"
                />
              </div>

              {/* Email */}
              <div className={inputWrapperClasses("email")}>
                <label
                  className={`absolute transition-all duration-300 flex items-center gap-2 ${
                    formData.email || focusedField === "email"
                      ? "-top-6 text-[10px] text-primary font-black uppercase tracking-widest"
                      : "top-3 text-gray-400"
                  }`}
                >
                  <Mail size={14} /> Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  type="email"
                  required
                  className="w-full bg-transparent py-3 outline-none text-slate-800"
                />
              </div>

              {/* Phone */}
              <div className={inputWrapperClasses("phone")}>
                <label
                  className={`absolute transition-all duration-300 flex items-center gap-2 ${
                    formData.phone || focusedField === "phone"
                      ? "-top-6 text-[10px] text-primary font-black uppercase tracking-widest"
                      : "top-3 text-gray-400"
                  }`}
                >
                  <Phone size={14} /> Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  type="tel"
                  required
                  className="w-full bg-transparent py-3 outline-none text-slate-800"
                />
              </div>

              {/* Subject */}
              <div className={inputWrapperClasses("subject")}>
                <label
                  className={`absolute transition-all duration-300 flex items-center gap-2 ${
                    formData.subject || focusedField === "subject"
                      ? "-top-6 text-[10px] text-primary font-black uppercase tracking-widest"
                      : "top-3 text-gray-400"
                  }`}
                >
                  <BookOpen size={14} /> Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  type="text"
                  required
                  className="w-full bg-transparent py-3 outline-none text-slate-800"
                />
              </div>

              {/* Message */}
              <div
                className={`md:col-span-2 ${inputWrapperClasses("message")}`}
              >
                <label
                  className={`absolute transition-all duration-300 flex items-center gap-2 ${
                    formData.message || focusedField === "message"
                      ? "-top-6 text-[10px] text-primary font-black uppercase tracking-widest"
                      : "top-3 text-gray-400"
                  }`}
                >
                  <MessageSquare size={14} /> Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows="3"
                  required
                  className="w-full bg-transparent py-3 outline-none text-slate-800 resize-none"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-full overflow-hidden transition-all duration-500 shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-3 font-bold tracking-[0.2em] text-xs">
                    {loading ? "PROCESSING..." : "SUBMIT INQUIRY"}
                    <Send
                      size={16}
                      className={`transition-transform duration-300 ${
                        loading
                          ? "animate-pulse"
                          : "group-hover:translate-x-1 group-hover:-translate-y-1"
                      }`}
                    />
                  </span>
                  <div className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                </motion.button>
              </div>
            </form>
          </div>

          {/* RIGHT — CONTACT INFO SIDE */}
          <div className="lg:w-2/5 bg-slate-900 p-8 md:p-16 lg:p-20 text-white relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-12">
                Office <span className="text-primary">Details</span>
              </h3>

              <div className="space-y-10">
                {/* Phone Card */}
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <Phone
                      size={22}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      Call Anytime
                    </p>
                    <a
                      href={`tel:${data?.primary_phone}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {data?.primary_phone || "+1 234 567 890"}
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <Mail
                      size={22}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      Email Support
                    </p>
                    <a
                      href={`mailto:${data?.primary_email}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {data?.primary_email || "contact@agency.com"}
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <MapPin
                      size={22}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      Our Location
                    </p>
                    <p className="text-base font-medium leading-relaxed max-w-[220px]">
                      {data?.address || "123 Luxury Avenue, New York, NY 10001"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote / CTA */}
            <div className="relative z-10 mt-16 pt-10 border-t border-white/10">
              <p className="italic text-white/50 text-sm font-serif leading-relaxed mb-6">
                "Building spaces where luxury meets comfort, and dreams find a
                home."
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:opacity-80"
                >
                  <span>View on Maps</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
