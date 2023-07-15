import { NextResponse } from 'next/server';
import { load } from 'cheerio';

export interface SlideItem {
  url: string;
}

interface SlideImage {
  resolution: string;
  image: string;
}

interface SlideImages {
  [resolution: string]: SlideImage;
}

interface Slide {
  slug: string;
  original: string;
  images: SlideImages;
}

const URL_REGEX =
  /^https:\/\/www\.slideshare\.net\/[\w-]+(\/[\w-]+)*(\/)?(\?.*)?$/;

export async function POST(request: Request) {
  const { url }: Partial<SlideItem> = await request.json();

  if (!url) return NextResponse.json({ message: 'url param missing' });
  if (!URL_REGEX.test(url))
    return NextResponse.json({ message: 'Invalid URL' });

  try {
    const slides: Slide[] = await sliderDownloader(url);
    return NextResponse.json({ slides });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching slides', slides: [] });
  }
}

const sliderDownloader = async (url: string): Promise<Slide[]> => {
  try {
    // Send a GET request to the URL
    const response = await fetch(url);
    const html = await response.text();

    // Load the HTML content using Cheerio
    const $ = load(html);

    // Extract the slug from the URL
    const slug = (url.match(URL_REGEX) || [])[1]!!.replace('/', '') || 'slidershare-slide-item';

    // Find the fullscreen-wrapper element
    const fullscreenWrapper = $('[data-testid="fullscreen-wrapper"]');

    // Find all slide images inside the fullscreen-wrapper
    const slideImages = fullscreenWrapper.find('[data-testid="slide-image"]');

    if (!fullscreenWrapper.length || !slideImages.length) {
      return [];
    }

    // Transform the image URLs and create slide objects
    const slides: Slide[] = slideImages
      .map((_, image) => {
        const imageUrl = $(image).attr('src') as string;

        // Find the corresponding <source> tag with the slide image
        const sourceTag = $(image).siblings(
          '[data-testid="slide-image-source"]',
        );

        // Extract the image links from the srcset attribute of the source tag
        const imageSrcset = sourceTag.attr('srcset') as string;

        // Extract the different resolution image links from the srcset attribute
        const imageLinks: SlideImage[] = imageSrcset.split(',').map((src) => {
          const [imageLink, resolution] = src.trim().split(' ');
          const resolutionName = resolution!!.replace('w', '');

          return {
            resolution: resolutionName,
            image: imageLink || '',
          };
        });

        // Create an object to store the image URLs
        const images: SlideImages = {};

        // Assign the image URLs to the respective resolution properties
        imageLinks.forEach((link) => {
          const { resolution, image } = link;
          images[resolution] = { resolution, image };
        });

        return {
          slug,
          original: imageUrl,
          images,
        };
      })
      .get() as Slide[];

    // Return the slide objects
    return slides;
  } catch (error) {
    console.error(error);
    return [];
  }
};
