// 'use server';
/**
 * @fileOverview This file contains a Genkit flow for prioritizing urgent disturbance reports based on keywords.
 *
 * - prioritizeReport - A function that takes a disturbance report as input and returns a priority assessment.
 * - PrioritizeReportInput - The input type for the prioritizeReport function.
 * - PrioritizeReportOutput - The return type for the prioritizeReport function.
 */

'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The text content of the disturbance report.'),
});
export type PrioritizeReportInput = z.infer<typeof PrioritizeReportInputSchema>;

const PrioritizeReportOutputSchema = z.object({
  priority: z
    .string()
    .describe(
      'The priority level of the report, can be High, Medium, or Low.'
    ),
  reason: z
    .string()
    .describe(
      'The reason why the report was assigned the given priority.  Explain the keywords found in the report.'
    ),
});
export type PrioritizeReportOutput = z.infer<typeof PrioritizeReportOutputSchema>;

export async function prioritizeReport(
  input: PrioritizeReportInput
): Promise<PrioritizeReportOutput> {
  return prioritizeReportFlow(input);
}

const prioritizeReportPrompt = ai.definePrompt({
  name: 'prioritizeReportPrompt',
  input: {schema: PrioritizeReportInputSchema},
  output: {schema: PrioritizeReportOutputSchema},
  prompt: `You are an AI assistant designed to analyze community disturbance reports and determine their priority.

  Analyze the following report and determine if it should be flagged as high, medium, or low priority.

  If the report contains keywords such as 'emergency', 'danger', 'violence', 'urgent', 'attack', or any other terms indicating an immediate threat, mark it as High priority. Explain the keywords found in the report.

  If the report describes a concerning situation but does not indicate an immediate threat, mark it as Medium priority. Explain why.

  If the report is vague, unclear, or describes a minor issue, mark it as Low priority. Explain why.

  Report: {{{reportText}}}
  `,
});

const prioritizeReportFlow = ai.defineFlow(
  {
    name: 'prioritizeReportFlow',
    inputSchema: PrioritizeReportInputSchema,
    outputSchema: PrioritizeReportOutputSchema,
  },
  async input => {
    const {output} = await prioritizeReportPrompt(input);
    return output!;
  }
);
