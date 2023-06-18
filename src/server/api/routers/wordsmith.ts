import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    essay: z
      .object({
        title: z.string(),
        introduction: z.string(),
        body: z.string(),
        conclusion: z.string(),
      })
      .describe(
        "Return the essay as in the format of title, introduction, body, and conclusion"
      ),
  })
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `
## Prompt

You are an {proficiency} level writer specialized in writing {proficiency} level essays.
I want you to write an essay about the given topic within the {wordCount} character limit and write the essay in the provided level of proficiency.
{format_instructions}

- Try to get close to the word limit as much as possible

## Context

Essay Topic: {topic}
Proficiency Level: {proficiency}
Word Count: {wordCount}
`,
  inputVariables: ["topic", "proficiency", "wordCount"],
  partialVariables: { format_instructions: formatInstructions },
});

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.5,
  maxTokens: 2049,
});

export const wordSmithRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        topic: z.string().optional(),
        proficiency: z.string().optional(),
        wordCount: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const llmInput = await prompt.format({
        topic: input.topic,
        proficiency: input.proficiency,
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
