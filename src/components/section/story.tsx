'use client';
import React from 'react';
import sd from '@/public/slideshare-download.svg';
import Image from 'next/image';
import { useSlideFormStore } from '@/src/lib/store';

const StorySection = () => {
  const { slides } = useSlideFormStore();

  if (slides.length > 0) return null;

  return (
    <section className="px-4 py-12 rounded-lg bg-gray-100 md:px-8">
      <h2 className="font-semibold text-2xl md:text-3xl tracking-tight text-center">
        How to <strong>Download SlideShare</strong>
      </h2>
      <p className="section-sub-title text-center mt-4">
        ssSlideShare is a better downloader tool. With its help, you will be
        able to <strong>Download SlideShare</strong> easily. <br />
        Please follow the below steps to download SlideShare in PPT, PDF, and
        Image format.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 py-6">
        <div className="md:col-md-4 md:offset-md-2 sm:col-sm-6">
          <h4 className="mb-4 text-xl">Copy SlideShare URL</h4>
          <ul className="text-gray-700 space-y-4">
            <li>
              — Open
              <a rel="noreferrer noopener" href="#" target="_blank">
                SlideShare
              </a>
              on your browser.
            </li>
            <li>
              — Choose the slideshare you want to save on your phone or PC.
            </li>
            <li>
              — Then click on the URL address bar and copy the entire URL.
            </li>
          </ul>
        </div>
        <div className="">
          <Image
            height={600}
            width={600}
            className="my-2 block mx-auto rounded"
            src={sd}
            alt="SlideShare Downloader"
            loading="lazy"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-6">
        <div className="md:col-md-4 md:offset-md-right-2 sm:col-sm-6 order-1 md:order-none">
          <Image
            height={600}
            width={600}
            className="my-2 block mx-auto rounded"
            src={sd}
            alt="SlideShare Downloader"
            loading="lazy"
          />
        </div>
        <div className="">
          <h4 className="mb-4 text-xl">Paste copied URL in downloader-box</h4>
          <ul className="text-gray-700 space-y-4">
            <li>
              — Go back to <a href="/">ssSlideShare</a>.
            </li>
            <li>— Paste your SlideShare URL in the downloader-box.</li>
            <li>
              — Click on the download button to start the download process.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
