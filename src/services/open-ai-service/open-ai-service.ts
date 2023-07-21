import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";

class OpenAIApiService {
  openai = null as unknown as OpenAIApi;

  generateNewOpenAIInstance = () => {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );
  };

  raiseQuery = async (query: ChatCompletionRequestMessage[]) => {
    if (!this.openai) {
      this.generateNewOpenAIInstance();
    }

    return await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: query,
    });
  };
}

const openAIApiService = new OpenAIApiService();
export default openAIApiService;
