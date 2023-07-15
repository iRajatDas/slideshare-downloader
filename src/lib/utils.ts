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

    return fetchImageDataAlternative(imageUrl);
  }
};

export const fetchImageDataAlternative = async (
  imageUrl: string,
): Promise<ImageData> => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/${imageUrl}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
    );
    const blob = await response.blob();

    return new Promise<ImageData>((resolve, reject) => {
      const reader = new FileReader();
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
