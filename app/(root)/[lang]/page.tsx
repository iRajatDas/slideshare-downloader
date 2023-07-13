import axios from 'axios';
import { dictionary } from '@/content';
import SlideForm from '@/components/form';
import DataGrid from '@/components/grid';
import GuideSection from '@/components/section/guide';

const _getSlides = async (url: string) => {
  const slides = await axios.post('/api/download', { url: url });
  console.log(slides);
};

async function Page({ params }: { params: { lang: string } }) {
  const t = dictionary[params.lang];
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
      <section>
        <DataGrid />
      </section>
      <GuideSection />
    </div>
  );
}

export default Page;
