import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import summariseService from "@/services/api-service/sumarise-service";
import { type ChatCompletionRequestMessage } from "openai";
import openAIApiService from "@/services/open-ai-service/open-ai-service";

export const coverLetter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        resumeText: z.string(),
        jobDescription: z.string(),
        characterCount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { resumeText, jobDescription, characterCount } = input;

      const resumeSummaryParams = {
        textToSummarise: resumeText,
        characterCount: 1000,
      };
      const jobDescriptionSummaryParams = {
        textToSummarise: jobDescription,
        characterCount: 1000,
      };
      const resumeSummary = await summariseService.generateSummary(
        resumeSummaryParams
      );
      const jobDescriptionSummary = await summariseService.generateSummary(
        jobDescriptionSummaryParams
      );

      const query = `
      You are an expert cover letter generator.
      You are given a summarised resume and a summarised job description below. \n
      Generate a professional cover letter for the job description based on the given resume. \n
      Keep the cover letter less than ${characterCount} characters \n
      Do not mention skills that resume does not have.
      Do not repeat the sentences from the job description.

      Summarised Resume is,
      ${resumeSummary.response}

      Summarised Job Description is,
      ${jobDescriptionSummary.response}`;

      let coverLetter = "";
      const newQuery: ChatCompletionRequestMessage = {
        role: "user",
        content: query,
      };

      const response = await openAIApiService.raiseQuery([newQuery]);
      coverLetter = response.data.choices[0]?.message?.content as string;

      return { response: coverLetter };
    }),
});
