import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    itinerary: z.array(z.object({
      day: z.string(),
      morning: z.string(),
      afternoon: z.string(),
      evening: z.string(),
    })).describe("Return a list of each itinerary day of the planned itinerary"),
    costEstimation: z
      .array(z.string())
      .describe("Estimate the cost of this itinerary by each of the following estimation categories: Flights, Public Transportation, Accommodation, Food, Entertainment, Miscellaneous"),
    })
);

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `
## Prompt

I want you to plan an itinerary for a trip.
{format_instructions}

- Add multiple fun activities for each day
- Respond with day-by-day itinerary
- Write at least 3 sentences for each morning, afternoon and evening
- Make sure to use different verbs and phrases for each sentences.

## Context

Origin of Trip: {origin}
Destination: {destination}
Duration: {duration} days
Budget: {budget} dollars
`,
  inputVariables: ["origin", "destination", "duration", "budget"],
  partialVariables: { format_instructions: formatInstructions },
});
// Interests: Soccer, Sightseeing, Architecture, Cycling --> Below Duration - omitting for now
// - Separate days into morning, afternoon, and evening --> this was below Respond with day-by day itinerary instruction

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.6,
  maxTokens: 2049
});

export const journeyRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(z.object({
      origin: z.string().optional(),
      destination: z.string().optional(),
      duration: z.string().optional(),
      budget: z.string().optional()
    }))
    .query(async ({ input }) => {
      const llmInput = await prompt.format({
        origin: input.origin,
        destination: input.destination,
        duration: input.duration,
        budget: input.budget
      });

      const llmResponse = await model.call(llmInput);
      const response = await parser.parse(llmResponse);

      return {
        llmResponse,
        response,
      };
    }),
});
