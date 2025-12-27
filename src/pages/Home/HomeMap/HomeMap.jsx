const HomeMap = ({ google_map_embed, loading }) => {
  return (
    <section
      className="relative w-full py-24 bg-center bg-cover bg-no-repeat z-50"
      style={{
        backgroundImage: "url('/src/assets/map-bg.png')",
        backgroundColor: "#d7d2ce",
      }}
    >
      {/* Subtle Overlay to make text pop */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Big & Nice Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            Find Us
          </h2>
          <div className="w-24 h-1 bg-gray-800 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Visit our office or locate us on the map
          </p>
        </div>

        {/* Full Size Map Container */}
        <div className="relative w-full h-162.5 shadow-2xl rounded-xl overflow-hidden border border-white/50 bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 rounded-full border-4 border-t-gray-800 border-gray-200 animate-spin" />
            </div>
          ) : (
            <>
              <iframe
                src={google_map_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-10 contrast-[1.05]"
              ></iframe>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeMap;
