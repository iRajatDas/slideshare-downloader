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
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise<ImageData>((resolve, reject) => {
      reader.onloadend = () => {
        const image = new Image();
        image.onload = () => {
          resolve({
            dataURL: reader.result as string,
            width: image.width,
            height: image.height,
          });
        };
        image.onerror = reject;
        image.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error('Failed to fetch or convert the image.');
  }
};
