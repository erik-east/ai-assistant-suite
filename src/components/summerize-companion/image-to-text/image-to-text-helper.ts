import { convertPdfToPng } from "@/components/summerize-companion/image-to-text/converting-to-png";
import { createWorker } from "tesseract.js";

enum ImageToTextInputTypeEnum {
  PNG = "data:image/png;base64,",
  PDF = "data:application/pdf;base64,",
}

class ImageToTextHelper {
  isPdf = (imageData: string) => {
    return imageData.startsWith(ImageToTextInputTypeEnum.PDF);
  };

  handleImageChange = (
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

        const base64PNGObject = await convertPdfToPng(base64PdfData);
        base64ImageObject = `${ImageToTextInputTypeEnum.PNG}${base64PNGObject}`;
      } else {
        base64ImageObject = imageDataUri;
      }

      setImageData(base64ImageObject);
    };
    reader.readAsDataURL(file);
  };

  convertImageToText = async (
    imageData: string,
    setOcr: (text: string) => void
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
    setOcr(text);
  };
}

const imageToTextHelper = new ImageToTextHelper();
export default imageToTextHelper;
