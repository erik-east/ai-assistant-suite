import React, { type ChangeEvent, useCallback, useState } from "react";

import GptForm from "@/components/gpt-prompt/gpt-form";

import gptPromptHelper from "./gpt-prompt-helper";

import { type ChatCompletionRequestMessage } from "openai";

interface GptPrompterProps {
  openAIApiKey: string;
}

const GptPrompter = ({ openAIApiKey }: GptPrompterProps) => {
  const [gptMessages, setGptMessages] = useState<
    ChatCompletionRequestMessage[]
  >([]);
  const [userInput, setUserInput] = useState("");

  console.log(
    "🚀 ~ file: gpt-prompter.tsx:15 ~ GptPrompter ~ gptMessages:",
    gptMessages
  );

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
      const gptMessage = await gptPromptHelper.getGPTQueryAnswer(
        openAIApiKey,
        newQuery,
        gptMessages
      );

      // set all messages in order
      setGptMessages((previousQueries) => [
        ...previousQueries,
        newQuery,
        gptMessage,
      ]);
      setUserInput("");
    },
    [gptMessages, openAIApiKey, userInput]
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
