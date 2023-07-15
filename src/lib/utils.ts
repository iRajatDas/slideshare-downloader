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
    const response = await fetch(
      `/api/blob?url=${encodeURIComponent(imageUrl)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SECRET_TOKEN}`,
        },
      },
    );
    const data = await response.json();

    return new Promise<ImageData>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve({
          dataURL: data.dataURL,
          width: image.width,
          height: image.height,
        });
      };
      image.onerror = reject;
      image.src = data.dataURL;
    });
  } catch (error) {
    // Fallback to the alternative method
    throw new Error("SWW~!!!!!")
  }
};


