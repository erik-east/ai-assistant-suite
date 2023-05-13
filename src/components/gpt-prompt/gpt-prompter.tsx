import GptForm from "@/components/gpt-prompt/gpt-form";
import openAIApiService from "@/open-ai-service/open-ai-ervice";
import React, { useCallback, useState } from "react";

interface GptPrompterProps {
  openAIApiKey: string;
}

const GptPrompter = ({ openAIApiKey }: GptPrompterProps) => {
  // TODO: Convert this to ChatCompletionRequestMessage[] type and pass array of { role, content } object
  const [query, setQuery] = useState("");

  const askQuestion = useCallback(
    // eslint-disable-next-line @typescript-eslint/require-await
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("🚀 ~ file: index.tsx:12 ~ query:", query);

      const gptAnswer = await openAIApiService.raiseQuery(openAIApiKey, query);
      console.log(
        "🚀 ~ file: index.tsx:13 ~ askQuestion ~ gptAnswer:",
        gptAnswer
      );
    },
    [query, openAIApiKey]
  );
  return (
    <div className="flex h-screen	w-screen flex-col items-center justify-center">
      <div className="flex h-4/5 w-full">i am the one</div>

      <GptForm onSubmit={askQuestion} setQuery={setQuery} query={query} />
    </div>
  );
};

export default GptPrompter;
