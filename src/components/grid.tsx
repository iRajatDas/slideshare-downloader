'use client';
import React, { useEffect, useState } from 'react';
import { useSlideFormStore } from '@/src/lib/store';
import Image from 'next/image';

const DataGrid = () => {
  const slides = useSlideFormStore((state) => state.slides);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(slides);
  }, [slides]);

  if (data.length <= 0) return null;

  console.log(data);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((slide, i) => (
        <div
          key={slide}
          className="cursor-pointer focus:ring-4 focus-within-ring-4 focus-visible:ring-4 ring-primary-brand border-none rounded-lg"
          tabIndex={i + 1}
        >
          <Image
            height={700}
            width={700}
            src={slide}
            className="h-auto max-w-full rounded-lg"
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default DataGrid;
