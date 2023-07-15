interface DictionaryEntry {
  homeHeader: string;
  homeSubtitle: string;
  aboutHeader: string;
  aboutContent: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
  en: {
    homeHeader: 'Slidershare Downloader!',
    homeSubtitle: 'Download SlideShare Online PDF, PPT, Images.',
    aboutHeader: 'About Me',
    aboutContent:
      'Here is some information about me. English is my primary language.',
  },
  es: {
    homeHeader: 'Casa',
    homeSubtitle: 'Beinvenidos a mi casa.',
    aboutHeader: 'Sobre Yo',
    aboutContent:
      'Aqui tenemos un poco informacion sobre yo. Hablo espanol tambien.',
  },
};
