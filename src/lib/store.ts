import { create } from 'zustand';

interface SlideFormStore {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  clearSlides: () => void;
}

interface Slide {
  url: string;
}

export const useSlideFormStore = create<SlideFormStore>((set) => ({
  slides: [],
  setSlides: (slides) => set({ slides }),
  clearSlides: () => set({ slides: [] }),
}));
