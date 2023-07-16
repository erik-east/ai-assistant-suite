import { OpenAI, type PromptTemplate } from "langchain";
import _ from "lodash";

class CommonApiService {
  generateModel = () =>
    new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      maxTokens: 2049,
    });

  generateFormattedLLMInput = async (
    prompt: PromptTemplate,
    inputParams = {}
  ) => prompt.format({ ...inputParams });

  generateQueryChunks = async (
    model: OpenAI,
    formattedQuery: string,
    queryText: string
  ) => {
    const baseInputTokenCount = await model.getNumTokens(formattedQuery);
    const availableTokenCountPerChunk = model.maxTokens - baseInputTokenCount;
    const totalTextTokenCount = await model.getNumTokens(queryText);
    const chunkCount =
      Math.ceil(totalTextTokenCount / availableTokenCountPerChunk) + 1;
    const chunkSize = Math.ceil(queryText.length / chunkCount);

    return _.chunk(queryText.split(""), chunkSize).map((c) => c.join(""));
  };
}

const commonApiService = new CommonApiService();
export default commonApiService;
