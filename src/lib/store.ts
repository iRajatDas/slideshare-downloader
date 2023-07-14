import { create } from 'zustand';

interface SlideFormStore {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  clearSlides: () => void;
}

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

export const useSlideFormStore = create<SlideFormStore>((set) => ({
  slides: [],
  setSlides: (slides) => set({ slides }),
  clearSlides: () => set({ slides: [] }),
}));
