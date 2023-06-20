import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    summary: z.string(),
  })
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `
## Prompt

You are an expert level text summariser.
I want you to explain what is text is about. The text is, {textToSummarise}.
Also please summarise it within {wordCount} character limit.

{format_instructions}

- Try to get close to the word limit as much as possible

## Context

Text To Summarise: {textToSummarise}
Word Count: {wordCount}
`,
  inputVariables: ["textToSummarise", "wordCount"],
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
        textToSummarise: z.string().optional(),
        wordCount: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const llmInput = await prompt.format({
        textToSummarise: input.textToSummarise,
        wordCount: input.wordCount,
      });

      const llmResponse = await model.call(llmInput);
      const response = await parser.parse(llmResponse);

      return {
        llmResponse,
        response,
      };
    }),
});
