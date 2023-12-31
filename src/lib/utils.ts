import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ImageData {
  dataURL: string;
  width: number;
  height: number;
}

export const getImageData = async (imageUrl: string): Promise<ImageData> => {
  try {
    const response = await fetch(`/api/image?imageUrl=${imageUrl}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_TOKEN}`,
      },
    });
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURL = `data:${response.headers.get(
      'content-type',
    )};base64,${base64}`;

    return new Promise<ImageData>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve({
          dataURL: dataURL,
          width: image.width,
          height: image.height,
        });
      };
      image.onerror = reject;
      image.src = dataURL;
    });
  } catch (error) {
    // Fallback to the alternative method
    throw new Error('Something went wrong!');
  }
};
