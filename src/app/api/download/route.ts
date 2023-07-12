import { NextResponse } from "next/server";
import fetch from "isomorphic-fetch";
import { load } from "cheerio";

interface SlideDownloaderRequest {
  url: string;
}

export async function POST(request: Request) {
  const { url }: Partial<SlideDownloaderRequest> = await request.json();

  console.log(url);

  if (!url) return NextResponse.json({ message: "url param missing" });

  const data = await sliderDownloader(url);

  return NextResponse.json({ data: data });
}

const sliderDownloader = async (url: string) => {
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
    return NextResponse.json({
      message: "Fullscreen wrapper or slide images not found",
    });
  }

  // Extract the image URLs
  const imageUrls = slideImages.map((_, image) => $(image).attr("src")).get();

  // Log the image URLs
  return imageUrls;
};
