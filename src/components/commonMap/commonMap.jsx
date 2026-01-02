const CommonMap = ({ google_map_embed, loading }) => {
  return (
    <section
      className="relative w-full py-12 md:py-24 bg-center bg-cover bg-no-repeat z-50 overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/map-bg.png')",
        backgroundColor: "#d7d2ce",
      }}
    >
      {/* Subtle Overlay to make text pop */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      {/* Decorative elements for better visual appeal */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-white/10 to-transparent rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big & Nice Header - Responsive */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4 md:mb-6">
            Find Us
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gray-800 mx-auto mb-4 md:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed px-2">
            Visit our office or locate us on the map
          </p>
        </div>

        {/* Full Size Map Container - Responsive Height */}
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[650px] shadow-2xl rounded-xl overflow-hidden border-4 sm:border-8 border-white/50 bg-white transform hover:shadow-3xl transition-shadow duration-300">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-t-gray-800 border-gray-300 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80"></div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium text-sm md:text-base animate-pulse">
                Loading map...
              </p>
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
                className="grayscale-10 contrast-[1.05] hover:grayscale-0 hover:contrast-100 transition-all duration-500"
                title="Google Maps Location"
              ></iframe>
              
              {/* Map Overlay Controls for better UX on mobile */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button 
                  className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-95 md:hidden"
                  onClick={() => window.open(google_map_embed.replace('embed', 'view'), '_blank')}
                  aria-label="Open map in full screen"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Additional Info for mobile users */}
        <div className="mt-6 md:mt-8 text-center px-4">
          <p className="text-sm text-gray-600 italic">
            <span className="hidden sm:inline">Tip: </span>
            Pinch to zoom or tap to interact with the map
          </p>
        </div>
      </div>

      {/* Responsive bottom spacing */}
      <div className="h-12 md:h-24"></div>
    </section>
  );
};

export default CommonMap;