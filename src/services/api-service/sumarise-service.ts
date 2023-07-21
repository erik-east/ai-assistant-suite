import openAIApiService from "@/services/open-ai-service/open-ai-service";
import commonApiService from "@/services/api-service/common-api-service";
import { type ChatCompletionRequestMessage } from "openai";

export interface SummaryParameters {
  textToSummarise: string;
  characterCount: number;
}

class SummariseService {
  generateSummary = async (summaryParameters: SummaryParameters) => {
    const { characterCount, textToSummarise } = summaryParameters;

    const model = commonApiService.generateModel();

    const queryChunks = await commonApiService.generateQueryChunks(
      model,
      textToSummarise
    );

    let summary = "";

    for (const chunk of queryChunks) {
      const previousSummary = summary;
      const textToSummarise = chunk;

      const query = `
      Summarize the following text in your own words. Incorporate the summary of previous text into your summary.
      Keep your summary within ${characterCount} characters.
      Try to point out the important parts

      ## Previous Text Summary

      ${previousSummary}

      Text To Summarize

      ${textToSummarise}`;

      const newQuery: ChatCompletionRequestMessage = {
        role: "user",
        content: query,
      };

      const response = await openAIApiService.raiseQuery([newQuery]);
      summary = response.data.choices[0]?.message?.content as string;
    }

    return { response: summary };
  };
}

const summariseService = new SummariseService();
export default summariseService;
