"use client"
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Why Use ssslideshare.com To Download SlideShare PPT?',
    answer:
      'According to user reviews, ssslideshare.com is currently the fastest, highest, most stable SlideShare downloader PDF, PPT and Image tool.',
  },
  {
    question: 'Is the SlideShare downloader free?',
    answer:
      'Yes! You can use our SlideShare downloader pdf online for free, we never ask you to charge. Our SlideShare download service is a great web-based application that is accessible and easy to use.',
  },
  {
    question: 'How to download SlideShare PPT or PDF to Computer?',
    answer:
      "It's very simple please follow the below steps.\n\n- Choose your slideshare you want to download.\n- Copy the URL of the slideshare you want to download.\n- Paste the URL in the download-box above.\n- Then press the download button.\n- Your file is ready to be downloaded to your device.\n\nNow select the SlideShare you want to download if you want to download all SlideShare then click on the checkbox on the top right corner and click on the download button in the top left corner. After clicking on download button your file will be downloaded.",
  },
  {
    question: 'How to download SlideShare PDF or PPT to Android?',
    answer:
      'You can easily start downloading SlideShare PDF or PPT on Android phone, just follow the above section: How to Download SlideShare.',
  },
  {
    question: 'Where is the downloaded slideshare saved?',
    answer:
      'If you did not change your default download path browser’s settings then check the "Download" folder of your device. Popular browsers, like Google Chrome, Mozilla Firefox, Opera, Safari, Microsoft Edge, and Brave browser, always use the default download folder.',
  },
  {
    question: 'Do you track the URLs?',
    answer:
      'No! We do not track any URLs you paste into input fields. We only track the URLs that you submit to us via bug report. This is done to improve the download.',
  },
];

const FaqSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="space-y-6 sm:space-y-12">
        <h2 className="font-semibold text-2xl md:text-3xl tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 md:space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="md:text-xl text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="md:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
