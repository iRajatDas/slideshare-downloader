'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import copy from '@/public/copy-url.gif';
import paste from '@/public/paste-url.gif';
import download from '@/public/download-success.gif';
import { useSlideFormStore } from '@/src/lib/store';

interface GuideItemProps {
  imageSrc: StaticImageData;
  alt: string;
  heading: string;
  description: string;
}

const GuideItem: React.FC<GuideItemProps> = ({
  imageSrc,
  alt,
  heading,
  description,
}) => {
  return (
    <div className="space-y-4 md:space-y-6 flex flex-col items-center py-6">
      <Image
        alt={alt}
        src={imageSrc}
        height={200}
        width={200}
        className="h-28 w-28 md:w-36 object-cover"
      />
      <h3 className="text-lg text-center sm:text-xl font-medium">{heading}</h3>
      <p className="text-center text-xs md:text-sm">{description}</p>
    </div>
  );
};

const GuideSection: React.FC = () => {
  const { slides } = useSlideFormStore();

  if (slides.length > 0) return null;

  return (
    <section className="bg-gray-100 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8 px-4 md:px-8">
        <GuideItem
          imageSrc={copy}
          alt="copy"
          heading="Choose the SlideShare"
          description="Select the SlideShare that you want to download to your device then copy their link."
        />
        <GuideItem
          imageSrc={paste}
          alt="paste"
          heading="Paste SlideShare URL"
          description="Paste the copied URL in the above downloader box and then click on the download button below the downloader box."
        />
        <GuideItem
          imageSrc={download}
          alt="download"
          heading="Now Download"
          description="After processing the URL, your SlideShare is ready for download in PDF, PPT, and IMAGE formats. To download SlideShare, select the checkbox in the top left corner, then click on the download button."
        />
      </div>
    </section>
  );
};

export default GuideSection;
