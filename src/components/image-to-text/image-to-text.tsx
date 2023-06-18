import imageToTextHelper from "@/components/image-to-text/image-to-text-helper";
import React, { useEffect, useState } from "react";

const ImageToText = () => {
  const [ocr, setOcr] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");

  useEffect(() => {
    const convertImageToText = async () => {
      await imageToTextHelper.convertImageToText(imageData, setOcr);
    };
    void convertImageToText();
  }, [imageData]);

  return (
    <div className="App">
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
      <div className="display-flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageData} alt="" srcSet="" />
        <p>{ocr}</p>
      </div>
    </div>
  );
};

export default ImageToText;
