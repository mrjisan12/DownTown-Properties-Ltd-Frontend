import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [leftRatio, setLeftRatio] = useState("60%");
  const [rightRatio, setRightRatio] = useState("40%");

  // Detect scroll or hover
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact-section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When section is fully visible (top near viewport top)
      if (rect.top >= 0 && rect.top < windowHeight / 2) {
        setLeftRatio("60%");
        setRightRatio("40%");
      } else {
        setLeftRatio("70%"); // left bigger
        setRightRatio("30%"); // right smaller
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="contact-section"
      className="relative w-full py-24 bg-[#f4f2ef]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-16 items-stretch">

          {/* LEFT SIDE */}
          <div
            className="flex flex-col justify-between transition-all duration-500"
            style={{ width: leftRatio }}
          >
            {/* Heading */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-wide mb-12">
                LET&apos;S CONNECT
              </h2>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-0 flex-1">
              
              {/* Clients */}
              <div className="relative p-10 shadow-xl border-l-4 border-[#978c21] flex-1 bg-[#f8f6ee]">
                <Link
                  to="/clients"
                  className="absolute top-6 right-6 text-[#978c21] text-5xl font-bold transform -rotate-45 hover:translate-x-1 hover:-translate-y-1 transition-all"
                  aria-label="Go to Clients page"
                >
                  →
                </Link>

                <h3 className="text-2xl font-semibold text-[#978c21] mb-4">
                  Clients
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover exquisite apartments, commercial spaces, and unmatched
                  luxury with Shanta Holdings Ltd. to turn your dreams into a
                  reality.
                </p>
              </div>

              {/* Separation line */}
              <div className="border-t border-gray-300"></div>

              {/* Landowners */}
              <div className="relative p-10 shadow-xl border-l-4 border-[#978c21] flex-1 bg-[#f6f4ec]">
                <Link
                  to="/landowners"
                  className="absolute top-6 right-6 text-[#978c21] text-5xl font-bold transform -rotate-45 hover:translate-x-1 hover:-translate-y-1 transition-all"
                  aria-label="Go to Landowners page"
                >
                  →
                </Link>

                <h3 className="text-2xl font-semibold text-[#978c21] mb-4">
                  Landowners
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Share your land with Shanta Holdings and be a part of the
                  architectural splendor. Fill out the form to explore this
                  partnership.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-[0_40px_70px_rgba(0,0,0,0.35)] transition-all duration-500"
            style={{ width: rightRatio, minHeight: "550px" }}
          >
            <img
              src="/src/assets/title/contact.webp"
              alt="Contact"
              className="w-full h-full object-cover scale-[1.05] contrast-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
