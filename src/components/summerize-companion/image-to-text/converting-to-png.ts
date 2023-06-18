/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

/**
 * Convert PDF code to PNG code
 *
 * @param base64Pdf PDF file encoded in base64
 * @return PNG file encoded in base64
 */
export const convertPdfToPng = async (base64Pdf: string): Promise<string> => {
  const pdfData = window.atob(base64Pdf);

  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

  try {
    // Fetch the first page
    const pageNumber = 1;
    const page = await pdf.getPage(pageNumber);

    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });

    // Prepare canvas using PDF page dimensions
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
    const base64Png = canvas.toDataURL().replace("data:image/png;base64,", "");
    return base64Png;
  } catch (e) {
    console.log(e);
    throw e as string;
  }
};
