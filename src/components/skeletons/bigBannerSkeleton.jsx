import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const BigBannerSkeleton = () => {
  return (
    <div className="relative w-full h-[140vh] md:h-[180vh] bg-neutral-900">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Main Banner Container */}
        <div className="relative w-full h-full overflow-hidden bg-neutral-950 shadow-2xl">
          
          {/* Shimmering Image Area */}
          <div className="relative w-full h-[100dvh] overflow-hidden bg-neutral-900">
            {/* Custom Shimmer Effect (White/Gray/Dark) */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
            
            {/* Center Loading Spinner */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
               <div className="relative h-12 w-12">
                  <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                  <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" />
               </div>
               <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-light">Loading Experience</span>
            </div>
          </div>

          {/* Overlay linear (Darker for contrast) */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />

          {/* Bottom Scroll Indicator Skeleton */}
          <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-40 flex items-center gap-3 md:gap-4">
            <Skeleton className="h-[1px] w-16 md:w-24 bg-white/20" />
            <Skeleton className="h-2 w-24 md:w-32 rounded-full bg-white/10" />
          </div>

          {/* Top Right Badge Skeleton */}
          <div className="absolute top-8 right-6 md:top-12 md:right-12 z-40">
            <Skeleton className="h-7 w-32 rounded-full bg-white/10 border border-white/5" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BigBannerSkeleton;