import React from 'react';

const MissionVisionSkeleton = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-black via-gray-900 to-black py-24">
      <div className="container mx-auto px-6">
        {/* Section Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-12 w-60 md:w-80 bg-gray-700 dark:bg-gray-600 mx-auto rounded"></div>
          <div className="h-1 w-24 bg-linear-to-r from-primary via-accent to-secondary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Mission Card Skeleton */}
          <div className="relative backdrop-blur-sm bg-gray-800/80 border border-gray-700 rounded-3xl p-10 animate-pulse">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gray-700 rounded-2xl w-12 h-12"></div>
              <div className="h-6 w-32 bg-gray-600 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gray-600 rounded-full w-0 transition-all duration-500"></div>
              </div>
              <span className="h-4 w-10 bg-gray-600 rounded"></span>
            </div>
          </div>

          {/* Vision Card Skeleton */}
          <div className="relative backdrop-blur-sm bg-gray-800/80 border border-gray-700 rounded-3xl p-10 animate-pulse">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gray-700 rounded-2xl w-12 h-12"></div>
              <div className="h-6 w-32 bg-gray-600 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gray-600 rounded-full w-0 transition-all duration-500"></div>
              </div>
              <span className="h-4 w-10 bg-gray-600 rounded"></span>
            </div>
          </div>
        </div>

        {/* Decorative Dots Skeleton */}
        <div className="mt-20 flex justify-center gap-4 animate-pulse">
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSkeleton;
