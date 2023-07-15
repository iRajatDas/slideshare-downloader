import {
  createPdf,
  calculatePdfDimensions,
  calculateImagePosition,
} from '@/src/lib/pdf';
import axios from 'axios';
// import { getImageData } from '@/src/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';

export const getImageData = async (imageUrl: string) => {
  const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
  });

  const buffer = Buffer.from(response.data, 'binary');
  const image = await loadImage(buffer);

  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  const convertedImageBuffer = await sharp(canvas.toBuffer())
    .jpeg() // Convert the image to JPEG format (or use the desired format)
    .toBuffer();

  const dataURL = `data:image/jpeg;base64,${convertedImageBuffer.toString(
    'base64',
  )}`;

  return {
    dataURL,
    width: image.width,
    height: image.height,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { imageUrls } = req.body;

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({ error: 'Invalid image URLs provided' });
    }

    try {
      const pdf = createPdf();

      for (let i = 0; i < imageUrls.length; i++) {
        const { dataURL, width, height } = await getImageData(imageUrls[i]);

        const { pdfWidth, pdfHeight } = calculatePdfDimensions(
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight(),
          width,
          height,
        );
        const { marginLeft, marginTop } = calculateImagePosition(
          pdf.internal.pageSize.getWidth(),
          pdfWidth,
          pdf.internal.pageSize.getHeight(),
          pdfHeight,
        );

        if (i !== 0) {
          pdf.addPage();
        }

        pdf.addImage(
          dataURL,
          'JPEG',
          marginLeft,
          marginTop,
          pdfWidth,
          pdfHeight,
        );
      }

      const pdfBuffer = await pdf.output('arraybuffer');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="slides.pdf"');
      res.send(Buffer.from(pdfBuffer));
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      return res.status(500).json({ error: 'Failed to generate PDF' });
    }
  } else if (req.method === 'GET') {
    return res.status(200).json({ message: 'API is working' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export { handler as POST };
