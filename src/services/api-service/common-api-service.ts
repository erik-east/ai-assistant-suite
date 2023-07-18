import { OpenAI, type PromptTemplate } from "langchain";
import _ from "lodash";

class CommonApiService {
  generateModel = () =>
    new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      maxTokens: 2049,
    });

  escapeProperties = <T extends Record<string, string>>(
    jsonString: string,
    propertiesToEscape: Array<keyof T>
  ): string => {
    const jsonObject = JSON.parse(jsonString) as T;
    const escapedObject = { ...jsonObject };
    propertiesToEscape.forEach((property) => {
      const propertyValue = escapedObject[property];
      if (propertyValue) {
        escapedObject[property] = propertyValue
          .replace(/\\/g, "\\\\") // Escape backslashes
          .replace(/\n/g, "\\n") // Escape newlines
          .replace(/"/g, '\\"') as T[keyof T]; // Type assertion to inform TypeScript about the assignment
      }
    });
    return JSON.stringify(escapedObject);
  };

  generateFormattedLLMInput = async (
    prompt: PromptTemplate,
    inputParams = {}
  ) => prompt.format({ ...inputParams });

  generateQueryChunks = async (model: OpenAI, queryText: string) => {
    const totalTextTokenCount = await model.getNumTokens(queryText);
    const chunkCount = Math.ceil(totalTextTokenCount / model.maxTokens) + 1;
    const chunkSize = Math.ceil(queryText.length / chunkCount);

    return _.chunk(queryText.split(""), chunkSize).map((c) => c.join(""));
  };
}

const commonApiService = new CommonApiService();
export default commonApiService;
