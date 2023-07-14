import { jsPDF } from 'jspdf';
import { getImageData } from './utils';

export const handleConvertToPdfSingle = async (url: string) => {
  try {
    const { dataURL, width, height } = await getImageData(url);
    console.log(width, height);

    const pdf = createPdf(width, height);
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

    pdf.addImage(dataURL, 'JPEG', marginLeft, marginTop, pdfWidth, pdfHeight);
    pdf.save('converted.pdf');
  } catch (error) {
    console.error('Failed to convert to PDF:', error);
  }
};
export const handleConvertToPdfMultiple = async (
  urls: string[] | undefined,
) => {
  if (!urls) {
    console.error('No image URLs provided');
    return;
  }

  const pdf = createPdf();
  try {
    for (let i = 0; i < urls.length; i++) {
      const { dataURL, width, height } = await getImageData(urls[i]!!);
      console.log(width, height);

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

      pdf.addImage(dataURL, 'JPEG', marginLeft, marginTop, pdfWidth, pdfHeight);
    }

    pdf.save('Multi_Converted.pdf');
  } catch (error) {
    console.error('Failed to convert to PDF:', error);
  }
};

const createPdf = (width?: number, height?: number): jsPDF => {
  const pdf = new jsPDF('portrait', 'px', 'a4');
  pdf.setProperties({ title: 'Converted PDF' });
  return pdf;
};

const calculatePdfDimensions = (
  pdfPageWidth: number,
  pdfPageHeight: number,
  imageWidth: number,
  imageHeight: number,
): { pdfWidth: number; pdfHeight: number } => {
  const aspectRatio = imageWidth / imageHeight;
  let pdfWidth = pdfPageWidth - 40; // Subtracting 40px for left and right margins
  let pdfHeight = pdfWidth / aspectRatio;

  if (pdfHeight > pdfPageHeight) {
    const scaleFactor = pdfPageHeight / pdfHeight;
    pdfHeight = pdfPageHeight;
    pdfWidth *= scaleFactor;
  }

  return { pdfWidth, pdfHeight };
};

const calculateImagePosition = (
  pdfPageWidth: number,
  pdfWidth: number,
  pdfPageHeight: number,
  pdfHeight: number,
): { marginLeft: number; marginTop: number } => {
  const marginLeft = (pdfPageWidth - pdfWidth) / 2;
  const marginTop = (pdfPageHeight - pdfHeight) / 2;
  return { marginLeft, marginTop };
};
