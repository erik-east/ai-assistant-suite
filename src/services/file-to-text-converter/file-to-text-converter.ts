//TODO: Fix eslint errors

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { createWorker } from "tesseract.js";

import { FileTypeEnum } from "@/services/file-to-text-converter/types";

export const getTextFromFile = async (
  fileType: FileTypeEnum,
  file: string
): Promise<string> => {
  return fileType === FileTypeEnum.PNG
    ? await getTextFromImage(file)
    : await getTextFromPdf(file);
};

interface TextContent {
  items: TextItem[];
}
interface TextItem {
  str: string;
}

export const getTextFromPdf = async (base64Pdf: string): Promise<string> => {
  const pdfData = window.atob(base64Pdf);
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  try {
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const maxPages: number = pdf.numPages;
    const countPromises = []; // collecting all page promises

    for (let j = 1; j <= maxPages; j++) {
      const page = await pdf.getPage(j);
      const textContent: TextContent = await page.getTextContent();
      const pageValue = textContent.items.map((item) => item.str).join("");
      countPromises.push(Promise.resolve(pageValue));
      countPromises.push(" "); // Empty space after each page
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then(function (texts) {
      return texts.join("");
    });
  } catch (e) {
    // TODO: Handle error
    throw e as string;
  }
};

export const getTextFromImage = async (
  base64Image: string
): Promise<string> => {
  try {
    const worker = await createWorker({
      logger: (m) => {
        console.log(m);
      },
    });

    if (!base64Image) {
      throw new Error("No image data");
    }

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const {
      data: { text },
    } = await worker.recognize(base64Image);

    return text;
  } catch (e) {
    // TODO: Handle error
    throw e as string;
  }
};
