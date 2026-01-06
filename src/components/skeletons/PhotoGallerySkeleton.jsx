import React from "react";

const SkeletonCard = ({ large, tall }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900
        ${large ? "md:col-span-2 md:row-span-2" : ""}
        ${tall ? "md:row-span-2" : ""}`}
    >
      {/* shimmer */}
      <div className="absolute inset-0 animate-skeleton">
        <div className="absolute -inset-[150%] bg-linear-to-r from-transparent via-white/10 to-transparent rotate-12" />
      </div>

      {/* fake text */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3">
        <div className="w-20 h-2 bg-gray-700 rounded" />
        <div className="w-32 h-2 bg-gray-700 rounded" />
        <div className="w-3/4 h-4 bg-gray-600 rounded mt-2" />
      </div>
    </div>
  );
};

const PhotoGallerySkeleton = () => {
  return (
    <section className="container mx-auto relative -mt-24">
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {Array.from({ length: 8 }).map((_, index) => {
            const isLarge = index % 5 === 0;
            const isTall = index % 7 === 0;

            return (
              <SkeletonCard
                key={index}
                large={isLarge}
                tall={isTall}
              />
            );
          })}
        </div>
      </div>

      {/* Skeleton animation */}
      <style>
        {`
          @keyframes skeleton {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .animate-skeleton {
            animation: skeleton 1.6s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default PhotoGallerySkeleton;
