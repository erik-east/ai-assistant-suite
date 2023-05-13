import { Configuration, OpenAIApi } from "openai";

class OpenAIApiService {
  openai = null as unknown as OpenAIApi;

  generateNewOpenAIInstance = (apiKey: string) => {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: apiKey,
      })
    );
  };

  raiseQuery = async (apiKey: string, query: string) => {
    /* this.openai = new OpenAIApi(
      new Configuration({
        apiKey: apiKey,
      })
    ); */
    if (!this.openai) {
      console.log("generating new");
      this.generateNewOpenAIInstance(apiKey);
    }

    return this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }],
    });
  };
}

const openAIApiService = new OpenAIApiService();
export default openAIApiService;
