'use client';
import React, { useEffect, useState } from 'react';
import { useSlideFormStore } from '@/src/lib/store';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn, getImageData } from '../lib/utils';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';

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
    console.log(url);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.setAttribute('download', 'slide.pdf');
    link.click();
  };

  const handleConvertToPdf = async (url: string) => {
    const pdf = new jsPDF('portrait', 'px', 'a4');
    try {
      const { dataURL, width, height } = await getImageData(url);
      console.log(width, height);

      const aspectRatio = width / height;
      let pdfWidth = pdf.internal.pageSize.getWidth() - 40; // Subtracting 40px for left and right margins
      let pdfHeight = pdfWidth / aspectRatio;

      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        const scaleFactor = pdf.internal.pageSize.getHeight() / pdfHeight;
        pdfHeight = pdf.internal.pageSize.getHeight();
        pdfWidth *= scaleFactor;
      }

      // Calculate the center position to horizontally and vertically position the image
      const marginLeft = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
      const marginTop = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;

      pdf.addImage(dataURL, 'JPEG', marginLeft, marginTop, pdfWidth, pdfHeight);
      pdf.save('converted.pdf');
    } catch (error) {
      console.error('Failed to convert to PDF:', error);
    }
  };

  return (
    <section className="px-4">
      <div className="flex items-center"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        <AnimatePresence>
          {data.map((slide: string, index) => (
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
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
                onClick={() => handleConvertToPdf(slide)}
              >
                Download
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DataGrid;
