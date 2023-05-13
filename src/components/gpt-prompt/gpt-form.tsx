/* eslint-disable @typescript-eslint/no-misused-promises */

import React, {
  type ChangeEvent,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";

interface GptFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
}

const GptForm = ({ onSubmit, setQuery, query }: GptFormProps) => {
  const onInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setQuery(target.value);
    },
    [setQuery]
  );

  return (
    <div className="flex h-1/5 w-full">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="gpt-query"
          placeholder="Please enter your query here."
          title="gpt-query-input"
          onChange={onInputChange}
          value={query}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GptForm;
