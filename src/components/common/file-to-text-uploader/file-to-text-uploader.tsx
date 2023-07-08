import { useEffect, useState } from "react";

import Image from "next/image";
import FileUploader from "@/components/common/file-uploader/file-uploader";

import fileToTextUploaderHelper from "@/components/common/file-to-text-uploader/file-to-text-uploader-helper";
import { getTextFromFile } from "@/services/file-to-text-converter/file-to-text-converter";

import { type FileTypeEnum } from "@/services/file-to-text-converter/types";

interface FileToTextUploaderProps {
  onTextReady: (text: string) => void;
  setDidFileScanFinish: (isReadingFile: boolean) => void;
  didFileScanFinish: boolean;
}

export const FileToTextUploader: React.FC<FileToTextUploaderProps> = ({
  onTextReady,
  setDidFileScanFinish,
  didFileScanFinish,
}) => {
  const [fileData, setFileData] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [fileType, setFileType] = useState<FileTypeEnum>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextReady("");
    fileToTextUploaderHelper.onFileChange(
      e,
      setFileType,
      setFileData,
      setImageData
    );
  };

  useEffect(() => {
    const convertFileToText = async () => {
      if (!!fileData && !!fileType) {
        setDidFileScanFinish(true);
        const text = await getTextFromFile(fileType, fileData);
        onTextReady(text);
        setDidFileScanFinish(false);
      }
    };
    void convertFileToText();
  }, [fileData, fileType, onTextReady, setDidFileScanFinish]);

  return (
    <div className="m-5 flex h-auto w-auto flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <FileUploader onFileReady={onFileChange} />
      </div>

      <span className="px-1 py-2 text-sm text-slate-500">
        <p>only image and pdf formats are supported </p>
      </span>

      {didFileScanFinish && (
        <span className="px-1 py-2 text-sm text-slate-500">
          <p>Please wait, Scanning the image</p>
        </span>
      )}

      {imageData && (
        <div className="display-flex">
          <Image src={imageData} alt="" width={150} height={150} />
        </div>
      )}
    </div>
  );
};
