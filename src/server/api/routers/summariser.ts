import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import summariseLLMQueryService from "@/services/api-service/sumarise-llm-query-service";

export const summariserRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        textToSummarise: z.string(),
        characterCount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return summariseLLMQueryService.generateSummary(input);
    }),
});
