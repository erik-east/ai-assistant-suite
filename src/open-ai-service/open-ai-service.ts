import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";

class OpenAIApiService {
  openai = null as unknown as OpenAIApi;

  generateNewOpenAIInstance = (apiKey: string) => {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: apiKey,
      })
    );
  };

  raiseQuery = async (
    apiKey: string,
    query: ChatCompletionRequestMessage[]
  ) => {
    if (!this.openai) {
      this.generateNewOpenAIInstance(apiKey);
    }

    return await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: query,
    });
  };
}

const openAIApiService = new OpenAIApiService();
export default openAIApiService;
