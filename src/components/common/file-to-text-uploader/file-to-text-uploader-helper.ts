import { FileTypeEnum } from "@/services/file-to-text-converter/types";
import { convertPdfToPng } from "@/services/pdf-to-png-converter/pdf-to-png-converter";
import { createWorker } from "tesseract.js";

enum FileInputTypeEnum {
  PNG = "data:image/png;base64,",
  PDF = "data:application/pdf;base64,",
}

class FileToTextUploaderHelper {
  isPdf = (fileData: string) => {
    return fileData.startsWith(FileInputTypeEnum.PDF);
  };

  onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileType: (type: FileTypeEnum) => void,
    setFileData: (text: string) => void,
    setImageData: (text: string) => void
  ) => {
    if (!e.target.files?.length) {
      throw new Error("No file selected");
    }

    const file = e.target.files[0] as File;
    const reader = new FileReader();

    reader.onloadend = async () => {
      if (!reader.result) {
        return;
      }

      const fileDataUri = reader.result as string;

      let fileType: FileTypeEnum;
      let base64FileData: string;
      let base64ImageData: string;

      if (this.isPdf(fileDataUri)) {
        const base64PdfData = fileDataUri.replace(FileInputTypeEnum.PDF, "");
        base64FileData = base64PdfData;
        base64ImageData = await convertPdfToPng(base64PdfData);
        fileType = FileTypeEnum.PDF;
      } else {
        base64FileData = fileDataUri;
        base64ImageData = fileDataUri;
        fileType = FileTypeEnum.PNG;
      }

      setImageData(base64ImageData);
      setFileData(base64FileData);
      setFileType(fileType);
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

const fileToTextUploaderHelper = new FileToTextUploaderHelper();
export default fileToTextUploaderHelper;
