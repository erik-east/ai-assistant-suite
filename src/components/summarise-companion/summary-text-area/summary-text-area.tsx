import React from "react";
import { TextareaWithLabel } from "@/components/common/text-area-with-label/text-area-with-label";

interface TextToSummariseProps {
  textToSummarise: string;
  setTextToSummarise: (text: string) => void;
}

export const TextToSummarise: React.FC<TextToSummariseProps> = ({
  setTextToSummarise,
  textToSummarise,
}) => (
  <div className="container flex items-center justify-center gap-1 xsm:flex-col xsm:p-1 md:flex-row md:gap-16">
    <TextareaWithLabel
      labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
      label="Text to summarise"
      id="text-to-summarise"
      placeholder="Type your text to be summarised here"
      value={textToSummarise}
      onChange={(e) => setTextToSummarise(e.target.value)}
    />
  </div>
);
