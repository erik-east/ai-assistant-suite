import { OpenAI } from "langchain";
import _ from "lodash";

class CommonApiService {
  generateModel = () =>
    new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      maxTokens: 2049,
    });

  generateQueryChunks = async (model: OpenAI, queryText: string) => {
    const totalTextTokenCount = await model.getNumTokens(queryText);
    const chunkCount = Math.ceil(totalTextTokenCount / model.maxTokens) + 1;
    const chunkSize = Math.ceil(queryText.length / chunkCount);

    return _.chunk(queryText.split(""), chunkSize).map((c) => c.join(""));
  };
}

const commonApiService = new CommonApiService();
export default commonApiService;
