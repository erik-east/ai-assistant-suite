/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent } from "react";

interface GptFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  userInput: string;
  isLoading: boolean;
  onFormInputChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const GptForm = ({
  onSubmit,
  userInput,
  onFormInputChange,
  isLoading,
}: GptFormProps) => (
  <div className="mt-1.5 flex h-10 w-full rounded border-2	border-solid border-slate-400	">
    <form className="flex h-full w-full flex-row" onSubmit={(e) => onSubmit(e)}>
      <input
        className="w-90 p-3 text-lg	"
        type="text"
        name="gpt-query"
        placeholder="Please enter your query here."
        title="gpt-query-input"
        onChange={onFormInputChange}
        value={userInput}
        disabled={isLoading}
      />

      <button
        title="submit"
        className="w-10 text-lg	font-semibold"
        type="submit"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  </div>
);

export default GptForm;
