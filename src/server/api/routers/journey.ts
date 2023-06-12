import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    itinerary: z
      .array(
        z.object({
          day: z.string(),
          morning: z.string(),
          afternoon: z.string(),
          evening: z.string(),
        })
      )
      .describe("Return a list of each itinerary day of the planned itinerary"),
  })
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `
## Prompt

You are an expert travel agent. I want you to plan an itinerary for a trip.
{format_instructions}

- Recommend optimum travel option from {origin} to {destination} on day 1 morning. Write an estimated cost for the travel.
- Recommend optimum travel option from {destination} to {origin} on last day evening as the last activity of the entire trip.
- Recommend with day-by-day itinerary at the {destination}.
- Recommend an activity for each morning, afternoon and evening.
- When you suggest to have breakfast, lunch or dinner as an activity, make sure to include name of the suggested restaurant and only recommend the same place once.
- Type at least 3 sentences for each morning, afternoon and evening of each day.
- Recommend multiple fun activities for each day at the {destination}.
- Recommend a realistic cost(USD) for activities for each morning, afternoon and evening.
- Make sure the total cost you recommend is below {budget} including travel cost.

## Context

Origin of Trip: {origin}
Destination: {destination}
Duration: {duration} days
Interests: {interests}
Budget: {budget} dollars
`,
  inputVariables: ["origin", "destination", "duration", "interests", "budget"],
  partialVariables: { format_instructions: formatInstructions },
});
// Interests: Soccer, Sightseeing, Architecture, Cycling --> Below Duration - omitting for now
// - Separate days into morning, afternoon, and evening --> this was below Respond with day-by day itinerary instruction

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.6,
  maxTokens: 2049,
});

export const journeyRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        origin: z.string().optional(),
        destination: z.string().optional(),
        duration: z.string().optional(),
        budget: z.string().optional(),
        interests: z.array(z.string()),
      })
    )
    .query(async ({ input }) => {
      const llmInput = await prompt.format({
        origin: input.origin,
        destination: input.destination,
        duration: input.duration,
        interests: input.interests,
        budget: input.budget,
      });

      const llmResponse = await model.call(llmInput);
      const response = await parser.parse(llmResponse);

      return {
        llmResponse,
        response,
      };
    }),
});
