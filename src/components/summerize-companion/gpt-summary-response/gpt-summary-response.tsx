import React from "react";

interface GptSummaryResponseType {
  summary: string;
}
interface GptSummaryResponseProps {
  gptSummaryResponse: GptSummaryResponseType;
}

export const GptSummaryResponse: React.FC<GptSummaryResponseProps> = ({
  gptSummaryResponse,
}) => (
  <div className="mb-8 mt-8 flow-root">
    <div className="-m-2 rounded-xl bg-gray-900/5 p-3 text-justify ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
      <span className="self-center p-1 font-bold text-slate-500">
        {gptSummaryResponse.summary}
      </span>
    </div>
  </div>
);
