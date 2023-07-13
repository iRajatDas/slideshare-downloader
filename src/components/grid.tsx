'use client';
import React, { useEffect, useState } from 'react';
import { useSlideFormStore } from '@/src/lib/store';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DataGrid = () => {
  const slides = useSlideFormStore((state) => state.slides);
  const [data, setData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setData(slides);
  }, [slides]);

  const handleItemClick = (slide: string) => {
    if (selectedItems.includes(slide)) {
      // Item already selected, remove it from selectedItems
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== slide),
      );
    } else {
      // Item not selected, add it to selectedItems
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, slide]);
    }
  };

  if (data.length <= 0) return null;

  const singleSlideDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.setAttribute('download', 'slide.pdf');
    link.click();
  };

  return (
    <>
      <div className="flex items-center"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        {data.map((slide: string) => (
          <div className="space-y-2" key={slide}>
            <div
              className={`cursor-pointer rounded-lg relative overflow-hidden focus-visible:ring-0 focus-visible:border-none ${
                selectedItems.includes(slide)
                  ? 'ring-4 focus:ring-4 focus:outline-none ring-primary-brand'
                  : 'ring-0'
              }`}
              onClick={() => handleItemClick(slide)}
              role="button"
              tabIndex={0}
            >
              <div
                className={cn(
                  `absolute inset-0 opacity-0 pointer-events-none`,
                  'transition-all duration-300 ease-in-out',
                  selectedItems.includes(slide) && 'opacity-100',
                )}
              >
                <div className="h-full w-full relative">
                  <div
                    className={cn(
                      'h-8 w-8 absolute right-2 top-2 bg-primary-brand rounded-full grid place-items-center border-white border-2 opacity-0',
                      'transition-all duration-500 ease-in-out',
                      selectedItems.includes(slide) && 'opacity-100',
                    )}
                  >
                    <Check className="h-5 w-5 text-white stroke-[4]" />
                  </div>
                </div>
              </div>
              <Image
                height={700}
                width={700}
                src={slide}
                className="h-auto max-w-full rounded-lg"
                alt=""
              />
            </div>
            <Button
              className="bg-primary-brand w-full hover:bg-primary-brand/90"
              onClick={() => singleSlideDownload(slide)}
            >
              Download
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataGrid;
