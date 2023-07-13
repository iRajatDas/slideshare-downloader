'use client';

import { useSlideFormStore } from '@/src/lib/store';
import React from 'react';

const Features = () => {
  const { slides } = useSlideFormStore();

  if (slides.length > 0) return null;
  return (
    <section className="py-12 px-4">
      <div className="space-y-6 sm:space-y-12">
        <div className="space-y-2 text-center">
          <h2 className="font-semibold text-2xl md:text-3xl tracking-tight">
            Features
          </h2>
          <p className="text-xs md:text-sm">
            This SlideShare Downloader comes with many features.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="p-5 md:py-8 px-4 text-center shadow-lg shadow-stone-100 border border-stone-200 rounded-lg">
            <h2 className="font-semibold text-base md:text-xl tracking-tight">
              Easy to Use
            </h2>
          </div>
          <div className="p-5 md:py-8 px-4 text-center shadow-lg shadow-stone-100 border border-stone-200 rounded-lg">
            <h2 className="font-semibold text-base md:text-xl tracking-tight">
              No Download Limit
            </h2>
          </div>
          <div className="p-5 md:py-8 px-4 text-center shadow-lg shadow-stone-100 border border-stone-200 rounded-lg">
            <h2 className="font-semibold text-base md:text-xl tracking-tight">
              Highest Quality Slide
            </h2>
          </div>
          <div className="p-5 md:py-8 px-4 text-center shadow-lg shadow-stone-100 border border-stone-200 rounded-lg">
            <h2 className="font-semibold text-base md:text-xl tracking-tight">
              Free & Multi features
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
