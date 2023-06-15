import React from "react";

interface GPTWordsmithResponseType {
  essay: string;
}
interface GptWordsmithResponseProps {
  gptWordsmithResponse: GPTWordsmithResponseType;
}

export const GptWordsmithResponse: React.FC<GptWordsmithResponseProps> = ({
	gptWordsmithResponse,
}) => (
  <div className="mt-8 flow-root sm:mt-16">
    <div className="-m-2 rounded-xl bg-gray-900/5 p-1 text-justify ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
      {gptWordsmithResponse.essay}
    </div>
  </div>
);
