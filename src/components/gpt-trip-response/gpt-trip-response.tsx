import React from "react";

interface GPTTripResponseType {
  itinerary: {
    day: string;
    morning: string;
    afternoon: string;
    evening: string;
  }[];
}
interface GptTripResponseProps {
  gptTripResponse: GPTTripResponseType;
}

export const GptTripResponse: React.FC<GptTripResponseProps> = ({
  gptTripResponse,
}) => (
  <div className="mt-8 flow-root sm:mt-16">
    <div className="-m-2 rounded-xl bg-gray-900/5 p-1 text-justify ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
      {gptTripResponse.itinerary.map((item) => (
        <div key={`gpt-answer-${item.day}`} className="flex flex-col p-2">
          <span className="color-white text-md p-1 font-bold	text-slate-500">
            {item.day}
          </span>
          <span className="color-white px-1 py-2 text-sm text-slate-500">
            <span className="font-bold">Morning:&nbsp;</span>
            <span>{item.morning}</span>
          </span>
          <span className="color-white px-1 py-2 text-sm text-slate-500">
            <span className="font-bold">Afternoon:&nbsp;</span>
            <span>{item.afternoon}</span>
          </span>
          <span className="color-white px-1 pt-2 text-sm text-slate-500">
            <span className="font-bold">Evening:&nbsp;</span>
            <span>{item.evening}</span>
          </span>
        </div>
      ))}
    </div>
  </div>
);
