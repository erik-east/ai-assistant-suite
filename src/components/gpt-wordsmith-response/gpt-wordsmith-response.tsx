import React from "react";

interface GPTWordsmithResponseType {
  essay: {
    title: string;
    introduction: string;
    body: string;
    conclusion: string;
  };
}
interface GptWordsmithResponseProps {
  gptWordsmithResponse: GPTWordsmithResponseType;
}

export const GptWordsmithResponse: React.FC<GptWordsmithResponseProps> = ({
  gptWordsmithResponse,
}) => (
  <div className="mt-8 flow-root sm:mt-16">
    <div className="-m-2 rounded-xl bg-gray-900/5 p-1 text-justify ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
      <div className="flex flex-col p-2">
        <span className="self-center p-1 font-bold text-slate-500">
          {gptWordsmithResponse.essay.title}
        </span>
        <p className="color-white px-1 py-2 indent-2.5 text-sm">
          {gptWordsmithResponse.essay.introduction}
        </p>
        <p className="color-white px-1 py-2 indent-2.5 text-sm">
          {gptWordsmithResponse.essay.body}
        </p>
        <p className="color-white px-1 py-2 indent-2.5 text-sm">
          {gptWordsmithResponse.essay.conclusion}
        </p>
      </div>
    </div>
  </div>
);
