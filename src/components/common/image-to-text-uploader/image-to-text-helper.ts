import { convertPdfToPng } from "@/services/pdf-to-png-converter/pdf-to-png-converter";
import { createWorker } from "tesseract.js";

enum ImageToTextInputTypeEnum {
  PNG = "data:image/png;base64,",
  PDF = "data:application/pdf;base64,",
}

class ImageToTextHelper {
  isPdf = (imageData: string) => {
    return imageData.startsWith(ImageToTextInputTypeEnum.PDF);
  };

  onImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageData: (text: string) => void
  ) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0] as File;

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (!reader.result) {
        return;
      }
      const imageDataUri = reader.result as string;
      let base64ImageObject = "";

      if (this.isPdf(imageDataUri)) {
        // convert pdf to base64
        const base64PdfData = imageDataUri.replace(
          ImageToTextInputTypeEnum.PDF,
          ""
        );

        base64ImageObject = await convertPdfToPng(base64PdfData);
      } else {
        base64ImageObject = imageDataUri;
      }

      setImageData(base64ImageObject);
    };
    reader.readAsDataURL(file);
  };

  convertImageToText = async (
    imageData: string,
    onTextReady: (text: string) => void
  ) => {
    const worker = await createWorker({
      logger: (m) => {
        console.log(m);
      },
    });

    if (!imageData) {
      return;
    }
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    onTextReady(text);
  };
}

const imageToTextHelper = new ImageToTextHelper();
export default imageToTextHelper;
