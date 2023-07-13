import React from 'react'
import Image from 'next/image';
import copy from '@/public/copy-url.gif';
import paste from '@/public/paste-url.gif';
import download from '@/public/download-success.gif';

const GuideSection = () => {
  return (
    <section className="bg-gray-100 py-12 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8 px-4 md:px-8">
        <div className="space-y-6 flex flex-col items-center">
          <Image
            alt="copy"
            src={copy}
            height={200}
            width={200}
            className="h-28 w-44 object-cover"
          />
          <h3 className="text-lg text-center sm:text-xl font-medium md:text-2xl">
            Choose the SlideShare
          </h3>
          <p className="text-center">
            Select the SlideShare that you want to download to your device then
            copy thier link.
          </p>
        </div>
        <div className="space-y-6 flex flex-col items-center">
          <Image
            alt="paste"
            src={paste}
            height={200}
            width={200}
            className="h-28 w-44 object-cover"
          />
          <h3 className="text-lg text-center sm:text-xl font-medium md:text-2xl">
            Paste SlideShare URL
          </h3>
          <p className="text-center">
            Paste the copied URL in the above downloader box and then click on
            the download button below the downloader box.
          </p>
        </div>
        <div className="space-y-6 flex flex-col items-center">
          <Image
            alt="download"
            src={download}
            height={200}
            width={200}
            className="h-28 w-44 object-cover"
          />
          <h3 className="text-lg text-center sm:text-xl font-medium md:text-2xl">
            Now Download
          </h3>
          <p className="text-center">
            After processing the URL, your SlideShare is ready for download in
            PDF, PPT, and IMAGE formats. To download SlideShare, select the
            checkbox in the top left corner, then click on the download button.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GuideSection