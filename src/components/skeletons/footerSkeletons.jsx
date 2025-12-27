import React from 'react';

const FooterSkeletons = () => {
  return (
    <footer className="bg-slate-900 mt-16 border-t border-slate-800 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info Skeleton */}
        <div className="space-y-4">
          <div className="h-16 w-32 bg-slate-700 rounded-md"></div>
          <div className="h-4 w-full bg-slate-700 rounded"></div>
          <div className="h-4 w-2/3 bg-slate-700 rounded"></div>
        </div>

        {/* Quick Links Skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-24 bg-slate-700 rounded mb-4"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-28 bg-slate-700 rounded"></div>
          ))}
        </div>

        {/* Services Skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-24 bg-slate-700 rounded mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-40 bg-slate-700 rounded"></div>
          ))}
        </div>

        {/* Contact Skeleton */}
        <div className="space-y-4">
          <div className="h-5 w-24 bg-slate-700 rounded mb-4"></div>
          <div className="flex gap-2"><div className="h-4 w-4 bg-slate-700 rounded"></div><div className="h-4 w-full bg-slate-700 rounded"></div></div>
          <div className="flex gap-2"><div className="h-4 w-4 bg-slate-700 rounded"></div><div className="h-4 w-full bg-slate-700 rounded"></div></div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <div className="h-4 w-64 bg-slate-700 rounded"></div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeletons;