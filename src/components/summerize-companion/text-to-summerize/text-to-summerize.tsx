import React from "react";
import { TextareaWithLabel } from "@/components/common/text-area-with-label/text-area-with-label";

interface TextToSummerizeProps {
  textToSummerize: string;
  setTextToSummerize: (text: string) => void;
}

export const TextToSummerize: React.FC<TextToSummerizeProps> = ({
  setTextToSummerize,
  textToSummerize,
}) => (
  <div className="container flex items-center justify-center gap-1 xsm:flex-col xsm:p-1 md:flex-row md:gap-16">
    <TextareaWithLabel
      labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
      label="Text to summerize"
      id="text-to-summerize"
      placeholder="Type your text to be summerized here"
      value={textToSummerize}
      onChange={(e) => setTextToSummerize(e.target.value)}
    />
  </div>
);
