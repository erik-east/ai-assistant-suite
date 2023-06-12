import React from "react";

interface ErrorProps {
  httpStatus?: number;
  message: string;
}

// TODO: Improve style
export const Error: React.FC<ErrorProps> = ({ message, httpStatus }) => {
  return (
    <div className="mt-3 flex flex-col">
      <h1>An Error Ocurred</h1>
      <span className="self-start">
        {httpStatus ? `status: ${httpStatus} - ${message}` : `${message}`}
      </span>
    </div>
  );
};
