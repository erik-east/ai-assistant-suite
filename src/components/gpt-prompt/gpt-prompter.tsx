import React, { type ChangeEvent, useCallback, useState } from "react";

import GptForm from "@/components/gpt-prompt/gpt-form";

import gptPromptHelper from "./gpt-prompt-helper";

import { type ChatCompletionRequestMessage } from "openai";
import ChatHistory from "@/components/gpt-prompt/chat-history/chat-history";

const GptPrompter = () => {
  const [gptMessages, setGptMessages] = useState<
    ChatCompletionRequestMessage[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFormInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setUserInput(target.value);
    },
    [setUserInput]
  );

  const submitGPTQuery = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setUserInput("");

      const newQuery: ChatCompletionRequestMessage = {
        role: "user",
        content: userInput,
      };

      // set all messages in order
      setGptMessages((previousQueries) => [...previousQueries, newQuery]);
      const gptMessage = await gptPromptHelper.getGPTQueryAnswer(
        newQuery,
        gptMessages
      );

      setGptMessages((previousQueries) => [...previousQueries, gptMessage]);
      setIsLoading(false);
    },
    [gptMessages, userInput]
  );

  return (
    <div className="flex h-screen	w-screen flex-col items-center justify-center bg-slate-600">
      <ChatHistory gptMessages={gptMessages} isLoading={isLoading} />

      <GptForm
        onSubmit={submitGPTQuery}
        userInput={userInput}
        onFormInputChange={onFormInputChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default GptPrompter;
