import React from "react";

const shimmer =
  "animate-pulse bg-linear-to-r from-zinc-200 via-zinc-300 to-zinc-200";

const HomeBuildingSkeleton = () => {
  return (
    <section className="w-full py-16 md:py-32 overflow-hidden relative">
      {/* Background blur placeholders */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 md:w-125 h-64 md:h-125 bg-yellow-600/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-64 md:w-125 h-64 md:h-125 bg-zinc-600/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <div
            className={`mx-auto h-10 sm:h-14 md:h-20 lg:h-24 w-3/4 rounded-lg ${shimmer}`}
          />
          <div
            className={`mx-auto h-4 md:h-6 w-1/2 rounded ${shimmer}`}
          />
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr_1fr] gap-8 md:gap-12 items-center">
          {/* LEFT METRICS */}
          <div className="order-2 lg:order-1 w-full grid grid-cols-2 lg:grid-cols-1 gap-8 md:gap-24 lg:gap-32">
            {[1, 2].map((i) => (
              <MetricSkeleton key={i} align="left" />
            ))}
          </div>

          {/* CENTER IMAGE */}
          <div className="w-full order-1 lg:order-2 flex justify-center px-4 md:px-0">
            <div
              className={`w-full max-w-lg lg:max-w-5xl aspect-[4/5] rounded-2xl shadow-2xl ${shimmer}`}
            />
          </div>

          {/* RIGHT METRICS */}
          <div className="order-3 w-full grid grid-cols-2 lg:grid-cols-1 gap-8 md:gap-24 lg:gap-32">
            {[1, 2].map((i) => (
              <MetricSkeleton key={i} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricSkeleton = ({ align }) => {
  return (
    <div
      className={`flex flex-col items-center ${
        align === "left" ? "lg:items-start" : "lg:items-end"
      } space-y-3`}
    >
      <div
        className={`h-14 sm:h-20 md:h-24 lg:h-32 w-28 sm:w-40 md:w-48 rounded-lg ${shimmer}`}
      />
      <div
        className={`h-1 w-full max-w-[200px] rounded ${shimmer}`}
      />
      <div
        className={`h-3 w-32 rounded ${shimmer}`}
      />
    </div>
  );
};

export default HomeBuildingSkeleton;
