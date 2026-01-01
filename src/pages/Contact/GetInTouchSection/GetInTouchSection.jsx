import React, { useState } from "react";

const GetInTouchSection = ({ onSubmit, loading, settings }) => {
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

  // Helper for input styling
  const inputClasses = (fieldName) => `
    w-full bg-transparent border-b-2 py-3 outline-none transition-all duration-300
    ${focusedField === fieldName ? "border-[#978c21] text-gray-900" : "border-gray-200 text-gray-500"}
  `;

  return (
    <section id="submit" className="relative py-24 bg-[#faf9f6] overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-0 right-0 text-[15vw] font-bold text-black/[0.02] select-none leading-none">
        INQUIRY
      </div>

      <div className="mx-auto px-6 relative z-10">
        <div className="rounded-[40px]  overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT — FORM SIDE */}
          <div className="lg:w-3/5 p-8 md:p-16">
            <header className="mb-12">
              <span className="text-[#978c21] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                Write to us
              </span>
              <h2 className="text-4xl font-serif text-gray-900">Send a Message</h2>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {/* Name */}
              <div className="relative">
                <label className={`absolute transition-all duration-300 ${formData.name || focusedField === 'name' ? '-top-6 text-xs text-[#978c21] font-bold' : 'top-3 text-gray-400'}`}>
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  type="text"
                  required
                  className={inputClasses('name')}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className={`absolute transition-all duration-300 ${formData.email || focusedField === 'email' ? '-top-6 text-xs text-[#978c21] font-bold' : 'top-3 text-gray-400'}`}>
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  type="email"
                  required
                  className={inputClasses('email')}
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <label className={`absolute transition-all duration-300 ${formData.phone || focusedField === 'phone' ? '-top-6 text-xs text-[#978c21] font-bold' : 'top-3 text-gray-400'}`}>
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  type="tel"
                  required
                  className={inputClasses('phone')}
                />
              </div>

              {/* Subject */}
              <div className="relative">
                <label className={`absolute transition-all duration-300 ${formData.subject || focusedField === 'subject' ? '-top-6 text-xs text-[#978c21] font-bold' : 'top-3 text-gray-400'}`}>
                  Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  type="text"
                  required
                  className={inputClasses('subject')}
                />
              </div>

              {/* Message */}
              <div className="relative md:col-span-2 mt-4">
                <label className={`absolute transition-all duration-300 ${formData.message || focusedField === 'message' ? '-top-6 text-xs text-[#978c21] font-bold' : 'top-3 text-gray-400'}`}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  required
                  className={inputClasses('message')}
                />
              </div>

              <div className="md:col-span-2 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative px-12 py-4 bg-gray-900 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-3 font-bold tracking-widest text-sm">
                    {loading ? "SENDING..." : "SUBMIT INQUIRY"}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-[#978c21] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT — CONTACT INFO SIDE */}
          <div className="lg:w-2/5 bg-gray-900 p-8 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
            {/* Abstract Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#978c21]/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-8">Contact Info</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-[#978c21] group-hover:border-[#978c21] transition-all duration-300">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Call Anytime</p>
                    <p className="text-lg font-medium tracking-tight">{data?.primary_phone || "+1 234 567 890"}</p>
                    {data?.secondary_phone && <p className="text-white/60 text-sm mt-1">{data.secondary_phone}</p>}
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-[#978c21] group-hover:border-[#978c21] transition-all duration-300">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Email Support</p>
                    <p className="text-lg font-medium tracking-tight">{data?.primary_email || "contact@luxury.com"}</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-[#978c21] group-hover:border-[#978c21] transition-all duration-300">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Main Office</p>
                    <p className="text-lg font-medium leading-snug max-w-[200px]">{data?.address || "123 Luxury Avenue, New York, NY 10001"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom branding or quote */}
            <div className="relative z-10 mt-12 pt-12 border-t border-white/10">
              <p className="italic text-white/40 text-sm">
                "Excellence is not a skill, it is an attitude."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;