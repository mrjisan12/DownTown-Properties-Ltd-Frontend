import React from "react";
import { Skeleton } from "../ui/skeleton";

const HomeMiniAboutSkeleton = () => {
    return (
        <section className="relative overflow-hidden py-20 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Image Skeleton */}
                    <div className="relative order-1">
                        <div className="relative p-1 rounded-3xl bg-slate-800/40">
                            <Skeleton className="w-full aspect-4/5 md:aspect-3/4 rounded-2xl bg-slate-700/50" />
                        </div>

                        {/* Floating badge skeleton */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-2xl bg-slate-800/60 p-2">
                            <Skeleton className="w-full h-full rounded-xl bg-slate-700/50" />
                        </div>
                    </div>

                    {/* Text Skeleton */}
                    <div className="order-2">
                        <div className="max-w-xl mx-auto">

                            {/* Section line */}
                            <Skeleton className="h-1 w-16 mb-6 bg-slate-600/60" />

                            {/* Title */}
                            <div className="space-y-3 mb-6">
                                <Skeleton className="h-10 w-full bg-slate-700/60" />
                                <Skeleton className="h-10 w-5/6 bg-slate-700/60" />
                                <Skeleton className="h-10 w-4/6 bg-slate-700/60" />
                            </div>

                            {/* Description */}
                            <div className="space-y-3 mb-8">
                                <Skeleton className="h-5 w-full bg-slate-600/50" />
                                <Skeleton className="h-5 w-full bg-slate-600/50" />
                                <Skeleton className="h-5 w-5/6 bg-slate-600/50" />
                            </div>

                            {/* Button */}
                            <Skeleton className="h-14 w-48 rounded-full mb-12 bg-slate-700/60" />

                            {/* Stats */}
                            <div className="pt-8 border-t border-slate-700/40">
                                <div className="grid grid-cols-3 gap-8">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="text-center space-y-3">
                                            <Skeleton className="h-8 w-16 mx-auto bg-slate-700/60" />
                                            <Skeleton className="h-4 w-20 mx-auto bg-slate-600/50" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeMiniAboutSkeleton;
