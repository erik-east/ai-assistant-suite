import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    greeting: z
      .string()
      .describe("Return text in the format of a greeting card"),
  })
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `
## Prompt

You are an expert writer specialized in writing beautiful greeting cards.
Compose a greeting card where the the tone of the card fits the given occasion, level of closeness to the sender and the relationship between the recipient and sender.

{format_instructions}

- Make sure the content of the message fits the occasion of the event and the relationship of the sender and recipient.
- Make sure to compose a message with the given tone

## Context

Recipient of Card: {recipientName}
Sender name: {senderName}
Relationship of recipient to sender: {relationship}
Tone of the card: {tone}
Occasion for the card to be sent: {occasion}
Closeness of recipient to the sender: {closeness}
`,
  inputVariables: ["recipientName", "senderName", "relationship", "tone", "occasion", "closeness"],
  partialVariables: { format_instructions: formatInstructions },
});

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.8,
  maxTokens: 2049,
});

export const greetifyRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
		recipientName: z.string(),
		senderName: z.string(),
		relationship: z.string(),
		tone: z.string(),
		occasion: z.string(),
		closeness: z.string(),
      })
    )
    .query(async ({ input }) => {
      const llmInput = await prompt.format({
        recipientName: input.recipientName,
        senderName: input.senderName,
		relationship: input.relationship,
		tone: input.tone,
		occasion: input.occasion,
		closeness: input.closeness
      });

      const llmResponse = await model.call(llmInput);
      const response = await parser.parse(llmResponse);

      return {
        llmResponse,
        response,
      };
    }),
});
