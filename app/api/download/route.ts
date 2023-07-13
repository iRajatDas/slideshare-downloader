import { NextResponse } from 'next/server';
import fetch from 'isomorphic-fetch';
import { load } from 'cheerio';

export interface SlideItem {
  url: string;
}

const URL_REGEX =
  /^https:\/\/www\.slideshare\.net\/[\w-]+\/[\w-]+(\/[\w-]+)*(\/\?.*)?$/;

export async function POST(request: Request) {
  const { url }: Partial<SlideItem> = await request.json();

  if (!url) return NextResponse.json({ message: 'url param missing' });
  if (!URL_REGEX.test(url))
    return NextResponse.json({ message: 'Invalid URL' });

  try {
    const data = await sliderDownloader(url);
    return NextResponse.json({ slides: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching slides', slides: [] });
  }
}

const sliderDownloader = async (url: string) => {
  try {
    // Send a GET request to the URL
    const response = await fetch(url);
    const html = await response.text();

    // Load the HTML content using Cheerio
    const $ = load(html);

    // Find the fullscreen-wrapper element
    const fullscreenWrapper = $('[data-testid="fullscreen-wrapper"]');

    // Find all slide images inside the fullscreen-wrapper
    const slideImages = fullscreenWrapper.find('[data-testid="slide-image"]');

    if (!fullscreenWrapper.length || !slideImages.length) {
      return [];
    }

    // Transform the image URLs
    const imageUrls = slideImages
      .map((_, image) => {
        const imageUrl = $(image).attr('src') as string; // Type assertion
        const transformedUrl = imageUrl
          .replace(/\/\d{2}\//, '/75/')
          .replace('-320.jpg', '-2048.jpg');
        return transformedUrl;
      })
      .get();

    // Return the transformed image URLs
    return imageUrls;
  } catch (error) {
    console.error(error);
    return [];
  }
};

