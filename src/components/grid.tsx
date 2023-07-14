'use client';
import React, { useEffect, useState } from 'react';
import { useSlideFormStore } from '@/src/lib/store';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  handleConvertToPdfMultiple,
  handleConvertToPdfSingle,
} from '@/src/lib/pdf';
import { toast } from './ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

interface Slide {
  slug: string;
  original: string;
  images: SlideImages;
}

interface SlideImages {
  [resolution: string]: SlideImage;
}

interface SlideImage {
  resolution: string;
  image: string;
}

const DataGrid = () => {
  const slides = useSlideFormStore((state) => state.slides);
  const [data, setData] = useState<Slide[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

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

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all slides
      setSelectedItems([]);
    } else {
      // Select all slides
      setSelectedItems(data.map((slide) => slide.original));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleDownloadAll = async () => {
    const toastId = toast({
      itemID: 'td',
      variant: 'default',
      title: 'Please wait',
      description: 'We are processing your request.',
    });

    // Get the images to download for all selected slides
    const imagesToDownload: string[] = selectedItems.reduce(
      (acc: string[], slide: string) => {
        const selectedSlide = data.find((item) => item.original === slide);
        if (selectedSlide) {
          const imageToDownload = selectedSlide.images[638]?.image as string;
          if (imageToDownload) {
            acc.push(imageToDownload);
          }
        }
        return acc;
      },
      [],
    );

    // Perform the download operation for all selected slides

    console.log(imagesToDownload);

    await handleConvertToPdfMultiple(imagesToDownload);

    toastId.update({
      id: 'td',
      variant: 'default',
      title: 'File Downloaded',
      description: 'Check your Download folder to find the file.',
    });
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="px-4 space-y-4">
      <div className="flex items-center py-6 border">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="rounded border-gray-300 text-primary-brand focus:ring-primary-brand"
          />
          <span>
            {selectedItems.length} / {data.length} selected
          </span>
        </label>
        <Button
          className="ml-auto bg-primary-brand hover:bg-primary-brand/90"
          onClick={handleDownloadAll}
        >
          Download All Slides
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
        <AnimatePresence>
          {data.map((slide: Slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div
                className={`cursor-pointer rounded-lg relative overflow-hidden focus-visible:ring-0 focus-visible:border-none ${
                  selectedItems.includes(slide.original)
                    ? 'ring-4 focus:ring-4 focus:outline-none ring-primary-brand'
                    : 'ring-0'
                }`}
                onClick={() => handleItemClick(slide.original)}
                role="button"
                tabIndex={0}
              >
                <div
                  className={cn(
                    'absolute inset-0 opacity-0 pointer-events-none',
                    'transition-all duration-300 ease-in-out',
                    selectedItems.includes(slide.original) && 'opacity-100',
                  )}
                >
                  <div className="h-full w-full relative">
                    <div
                      className={cn(
                        'h-8 w-8 absolute right-2 top-2 bg-primary-brand rounded-full grid place-items-center border-white border-2 opacity-0',
                        'transition-all duration-500 ease-in-out',
                        selectedItems.includes(slide.original) && 'opacity-100',
                      )}
                    >
                      <Check className="h-5 w-5 text-white stroke-[4]" />
                    </div>
                  </div>
                </div>
                <Image
                  height={700}
                  width={700}
                  src={slide.images[638]?.image as string}
                  className="h-auto max-w-full rounded-lg"
                  alt=""
                />
              </div>
              <Button
                className="bg-primary-brand w-full hover:bg-primary-brand/90"
                onClick={() =>
                  handleConvertToPdfSingle(slide.images[2048]?.image as string)
                }
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
