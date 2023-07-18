import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import summariseService from "@/services/api-service/sumarise-service";

export const summariserRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        textToSummarise: z.string(),
        characterCount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return summariseService.generateSummary(input);
    }),
});
