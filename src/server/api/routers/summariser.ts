import { z } from "zod";
import _ from "lodash";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    summary: z
      .string()
      .describe("Return the summary of the text in the format of summary"),
  })
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `
Summarize the following text in your own words. Incorporate the summary of previous text into your summary.
Keep your summary within {characterCount} characters.

## Previous Text Summary

{previousSummary}

TLDR

{textToSummarise}

{format_instructions}
`,
  inputVariables: ["textToSummarise", "characterCount", "previousSummary"],
  partialVariables: { format_instructions: formatInstructions },
});

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.5,
  maxTokens: 2049,
});

export const summariserRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        textToSummarise: z.string(),
        characterCount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const textToSummarise = input.textToSummarise;
      const baseInput = await prompt.format({
        textToSummarise: ".",
        characterCount: input.characterCount,
        previousSummary: "",
      });

      const baseInputTokenCount = await model.getNumTokens(baseInput);
      const availableTokenCountPerChunk = model.maxTokens - baseInputTokenCount;
      const totalTextTokenCount = await model.getNumTokens(textToSummarise);
      const chunkCount =
        Math.ceil(totalTextTokenCount / availableTokenCountPerChunk) + 1;
      const chunkSize = Math.ceil(textToSummarise.length / chunkCount);

      const chunks = _.chunk(textToSummarise.split(""), chunkSize).map((c) =>
        c.join("")
      );

      let summary = "";

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const llmInput = await prompt.format({
          textToSummarise: chunk,
          characterCount: input.characterCount / chunkCount,
          previousSummary: summary,
        });
        const llmResponse = await model.call(llmInput);
        const response = await parser.parse(llmResponse);
        summary = response.summary;
      }

      return {
        response: summary,
      };
    }),
});
