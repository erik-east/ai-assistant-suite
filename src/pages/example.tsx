import { NextPage } from "next";
import { api } from "@/utils/api";
import { useRef, useState } from "react";

const Example: NextPage = () => {
  const [question, setQuestion] = useState<string>("");

  const promptQuery = api.journey.prompt.useQuery(
    {
    //   question,
    },
    {
      enabled: question !== "",
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setQuestion(inputRef.current?.value ?? "");
        }}
      >
        <input
          type="text"
          placeholder="Ask a question"
          ref={inputRef}
          className="rounded-md border border-gray-300 p-2"
        />
        <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
          Ask
        </button>
      </form>
      <div className="mt-4">
        <div className="text-lg font-bold">
          {promptQuery.isFetching ? (
            "Loading..."
          ) : (
            <pre>{JSON.stringify(promptQuery.data?.response)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Example;
