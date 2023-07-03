import { useEffect, useState } from "react";

import { Label } from "@radix-ui/react-label";
import Image from "next/image";

import imageToTextHelper from "@/components/common/image-to-text-uploader/image-to-text-helper";

interface ImageToTextUploaderProps {
  onTextReady: (text: string) => void;
  setIsReadingImage: (isReadingImage: boolean) => void;
  isReadingImage: boolean;
}

export const ImageToTextUploader: React.FC<ImageToTextUploaderProps> = ({
  onTextReady,
  setIsReadingImage,
  isReadingImage,
}) => {
  const [imageData, setImageData] = useState<string>("");

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextReady("");
    imageToTextHelper.onImageChange(e, setImageData);
  };

  useEffect(() => {
    const convertImageToText = async () => {
      setIsReadingImage(true);
      await imageToTextHelper.convertImageToText(imageData, onTextReady);
      setIsReadingImage(false);
    };
    void convertImageToText();
  }, [imageData, onTextReady, setIsReadingImage]);

  return (
    <div className="m-5 flex h-auto w-auto flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="upload-file"
          className="dark:hover:bg-bray-800 flex h-12 w-12 w-auto cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              aria-hidden="true"
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
          </div>
          <input
            aria-label="upload-file"
            id="upload-file"
            type="file"
            className="hidden"
            onChange={(e) => onImageChange(e)}
            accept="image/*,application/pdf"
          />
        </Label>
      </div>
      <span className="px-1 py-2 text-sm text-slate-500">
        <p>only image and pdf formats are supported </p>
      </span>
      {isReadingImage && (
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
