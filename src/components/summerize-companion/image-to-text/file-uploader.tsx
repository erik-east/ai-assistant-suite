import imageToTextHelper from "@/components/summerize-companion/image-to-text/image-to-text-helper";
import React, { useEffect, useState } from "react";

interface FileUploaderProps {
  setTextToSummerize: (text: string) => void;
  textToSummerize: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  setTextToSummerize,
}) => {
  const [imageData, setImageData] = useState<string>("");

  useEffect(() => {
    const convertImageToText = async () => {
      await imageToTextHelper.convertImageToText(imageData, setTextToSummerize);
    };
    void convertImageToText();
  }, [imageData, setTextToSummerize]);

  return (
    <div className="flex h-auto w-auto flex-col items-center justify-center">
      <div>
        <p>Choose an Image</p>
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => imageToTextHelper.handleImageChange(e, setImageData)}
          accept="image/*,application/pdf"
        />
      </div>
      <div className="display-flex h-52	w-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageData} alt="" srcSet="" />
      </div>
    </div>
  );
};
