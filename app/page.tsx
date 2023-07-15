import axios from 'axios';
import { dictionary } from '@/content';
import SlideForm from '@/components/form';
import DataGrid from '@/components/grid';
import GuideSection from '@/components/section/guide';
import Features from '@/components/section/features';
import StorySection from '@/components/section/story';
import FaqSection from '@/components/section/faqs';

const _getSlides = async (url: string) => {
  const slides = await axios.post('/api/download', { url: url });
  console.log(slides);
};

async function Page() {
  const t = dictionary['en'];
  return (
    <div>
      <section className="py-12 md:py-20">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center tracking-wide">
          {t?.homeHeader}
        </h1>
        <p className="text-sm md:text-2xl mt-2 text-stone-500 text-center">
          {t?.homeSubtitle}
        </p>
        <SlideForm />
      </section>
      <DataGrid />
      <GuideSection />
      <Features />
      <StorySection />
      <FaqSection />
    </div>
  );
}

export default Page;
