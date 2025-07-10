'use server';
/**
 * @fileOverview A Genkit flow to generate a hint for an image.
 *
 * - generateImageHint - A function that takes image data and returns a hint.
 * - GenerateImageHintInput - The input type for the generateImageHint function.
 * - GenerateImageHintOutput - The return type for the generateImageHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageHintInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateImageHintInput = z.infer<typeof GenerateImageHintInputSchema>;

const GenerateImageHintOutputSchema = z.object({
  imageHint: z
    .string()
    .describe(
      'A one or two-word hint describing the main subject of the image (e.g., "dog retriever", "leather wallet").'
    ),
});
export type GenerateImageHintOutput = z.infer<typeof GenerateImageHintOutputSchema>;

export async function generateImageHint(
  input: GenerateImageHintInput
): Promise<GenerateImageHintOutput> {
  return generateImageHintFlow(input);
}

const generateImageHintPrompt = ai.definePrompt({
  name: 'generateImageHintPrompt',
  input: {schema: GenerateImageHintInputSchema},
  output: {schema: GenerateImageHintOutputSchema},
  prompt: `You are an AI assistant that provides a one or two-word hint for an image, suitable for an image search. Analyze the image and provide a concise hint.

  For example:
  - A photo of a golden retriever: "dog retriever"
  - A photo of a black leather wallet: "leather wallet"
  - A photo of keys on a red keychain: "keys keychain"

  Image: {{media url=photoDataUri}}`,
});

const generateImageHintFlow = ai.defineFlow(
  {
    name: 'generateImageHintFlow',
    inputSchema: GenerateImageHintInputSchema,
    outputSchema: GenerateImageHintOutputSchema,
  },
  async input => {
    const {output} = await generateImageHintPrompt(input);
    return output!;
  }
);
