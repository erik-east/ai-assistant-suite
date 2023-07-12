import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    story: z
      .string()
      .describe("Return the story in the format of a child story"),
  })
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `
## Prompt

You are an expert storyteller specialized in child stories to teach morals.
Compose a story where the protagonist with the adjective name provided overcomes a difficult situation and learns a virtue/moral.

{format_instructions}

- Incorporate as many rhymes as possible
- Make the story sound like a fairy tale and include anthropomorphic animals
- Make sure the story is easy to follow for the chosen age-range
- Make sure it is relatable to a wide range of children
- Make sure it has an important lesson

## Context

Protagonist of the Story: {protagonistName}
Main adjective to use for the Protagonist for the rest of the story: {protagonistAdjective}
Moral of the story for kids to learn: {moralOfStory}
Targeted age group: {ageGroup}
`,
  inputVariables: ["protagonistName", "protagonistAdjective", "moralOfStory", "ageGroup"],
  partialVariables: { format_instructions: formatInstructions },
});

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.8,
  maxTokens: 2049,
});

export const storytimeRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        protagonistName: z.string(),
        protagonistAdjective: z.string(),
		moralOfStory: z.string(),
        ageGroup: z.string()
      })
    )
    .query(async ({ input }) => {
      const llmInput = await prompt.format({
        protagonistName: input.protagonistName,
        protagonistAdjective: input.protagonistAdjective,
		moralOfStory: input.moralOfStory,
		ageGroup: input.ageGroup
      });

      const llmResponse = await model.call(llmInput);
      const response = await parser.parse(llmResponse);

      return {
        llmResponse,
        response,
      };
    }),
});
