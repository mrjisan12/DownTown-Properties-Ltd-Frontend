import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/src/assets/banner1.jpeg", // replace later
    title: "Find Your Dream Home",
    subtitle: "Luxury apartments & modern living",
  },
  {
    id: 2,
    image: "/src/assets/banner2.jpeg",
    title: "Premium Properties",
    subtitle: "Trusted real estate solutions",
  },
  {
    id: 3,
    image: "/src/assets/banner4.jpeg",
    title: "Downtown Properties Ltd",
    subtitle: "Building your future with care",
  },
  {
    id: 3,
    image: "/src/assets/banner3.jpeg",
    title: "Downtown Properties Ltd",
    subtitle: "Building your future with care",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6">
                {slide.subtitle}
              </p>

              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md">
                View Projects
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
