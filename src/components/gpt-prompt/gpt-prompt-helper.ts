import openAIApiService from "@/open-ai-service/open-ai-ervice";
import { type ChatCompletionRequestMessage } from "openai";

class GptPromptHelper {
    getGPTQueryAnswer = async (openAIApiKey: string, newQuery:ChatCompletionRequestMessage, gptMessages:ChatCompletionRequestMessage[] ): Promise<ChatCompletionRequestMessage> => {
      const queryToSubmit: ChatCompletionRequestMessage[] = [
        ...gptMessages,
        newQuery,
      ];

      const gptResponse = await openAIApiService.raiseQuery(
        openAIApiKey,
        queryToSubmit
      );

      // Always get the first choice
      return gptResponse.data.choices[0]
        ?.message as ChatCompletionRequestMessage;
    }
}

const gptPromptHelper = new GptPromptHelper()
export default gptPromptHelper