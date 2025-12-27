import React from "react";
import { Skeleton } from "../ui/skeleton";

const FooterSkeletons = () => {
  return (
    <footer className="bg-slate-900 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-16 w-32 rounded-md bg-slate-700" />
          <Skeleton className="h-4 w-full bg-slate-700" />
          <Skeleton className="h-4 w-2/3 bg-slate-700" />
        </div>

        {/* Quick Links Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-24 mb-4 bg-slate-700" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-4 w-28 bg-slate-700"
            />
          ))}
        </div>

        {/* Services Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-24 mb-4 bg-slate-700" />
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-4 w-40 bg-slate-700"
            />
          ))}
        </div>

        {/* Contact Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-24 mb-4 bg-slate-700" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-4 bg-slate-700" />
            <Skeleton className="h-4 w-full bg-slate-700" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-4 w-4 bg-slate-700" />
            <Skeleton className="h-4 w-full bg-slate-700" />
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <Skeleton className="h-4 w-64 bg-slate-700" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeletons;
