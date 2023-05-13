/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent } from "react";

interface GptFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  userInput: string;
  onFormInputChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const GptForm = ({ onSubmit, userInput, onFormInputChange }: GptFormProps) => (
  <div className="flex h-1/5 w-full">
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        name="gpt-query"
        placeholder="Please enter your query here."
        title="gpt-query-input"
        onChange={onFormInputChange}
        value={userInput}
      />

      <button type="submit">Submit</button>
    </form>
  </div>
);

export default GptForm;
