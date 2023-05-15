/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ChangeEvent } from "react";

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
  <div className="m-1.5 flex h-5p w-full">
    <form className="flex h-full w-full flex-row" onSubmit={(e) => onSubmit(e)}>
      <input
        className="m-1 w-90	rounded-lg border-2 border-solid border-slate-400 p-3 text-lg text-lg font-semibold"
        type="text"
        name="gpt-query"
        placeholder="Please enter your query here."
        title="gpt-query-input"
        onChange={onFormInputChange}
        value={userInput}
        disabled={isLoading}
      />

      <button
        className="m-1 w-10 rounded-lg border-2 border-solid border-slate-400 text-lg font-semibold text-white"
        title="submit"
        type="submit"
        disabled={isLoading || !userInput}
      >
        Submit
      </button>
    </form>
  </div>
);

export default GptForm;
