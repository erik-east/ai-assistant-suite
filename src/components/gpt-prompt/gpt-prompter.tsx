import React, { type ChangeEvent, useCallback, useState } from "react";
import GptForm from "@/components/gpt-prompt/gpt-form";
import openAIApiService from "@/open-ai-service/open-ai-ervice";
import { type ChatCompletionRequestMessage } from "openai";

interface GptPrompterProps {
  openAIApiKey: string;
}

const GptPrompter = ({ openAIApiKey }: GptPrompterProps) => {
  // TODO: Convert this to ChatCompletionRequestMessage[] type and pass array of { role, content } object
  const [query, setQuery] = useState<ChatCompletionRequestMessage[]>([]);
  const [userInput, setUserInput] = useState("");

  const onFormInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setUserInput(target.value);
    },
    [setUserInput]
  );

  const submitGPTQuery = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newQuery: ChatCompletionRequestMessage = {
        role: "user",
        content: userInput,
      };

      const queryToSubmit: ChatCompletionRequestMessage[] = [
        ...query,
        newQuery,
      ];

      const gptResponse = await openAIApiService.raiseQuery(
        openAIApiKey,
        queryToSubmit
      );

      // Always get the first choice
      const gptMessage = gptResponse.data.choices[0]
        ?.message as ChatCompletionRequestMessage;

      setQuery((previousQueries) => [...previousQueries, newQuery, gptMessage]);
      setUserInput("");
    },
    [query, openAIApiKey, userInput]
  );
  return (
    <div className="flex h-screen	w-screen flex-col items-center justify-center">
      <div className="flex h-4/5 w-full">i am the one</div>

      <GptForm
        onSubmit={submitGPTQuery}
        userInput={userInput}
        onFormInputChange={onFormInputChange}
      />
    </div>
  );
};

export default GptPrompter;
