'use server';

import { prioritizeReport } from '@/ai/flows/prioritize-reports';
import { generateImageHint } from '@/ai/flows/generate-image-hint-flow';
import type { CommunityReport, LostAndFoundItem } from '@/lib/types';
import { ReportSchema, PostItemSchema } from '@/lib/schemas';

export async function submitDisturbanceReport(
  prevState: any,
  formData: FormData
): Promise<{ message: string; report?: CommunityReport; errors?: any }> {
  
  const rawData = {
    type: formData.get('type') as string,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
  };

  const validatedFields = ReportSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: 'Invalid report data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { description } = validatedFields.data;
  
  try {
    const aiResponse = await prioritizeReport({ reportText: description });

    const newReport: CommunityReport = {
      id: crypto.randomUUID(),
      ...validatedFields.data,
      priority: aiResponse.priority as 'High' | 'Medium' | 'Low',
      reason: aiResponse.reason,
    };

    return { message: 'Report submitted successfully.', report: newReport };
  } catch (error) {
    console.error('AI prioritization failed:', error);
    return { message: 'Failed to prioritize report. Please try again later.' };
  }
}

export async function submitLostAndFoundItem(
  prevState: any,
  formData: FormData
): Promise<{ message: string; item?: LostAndFoundItem; errors?: any }> {
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    contact: formData.get('contact'),
    image: formData.get('image'),
  };

  const validatedFields = PostItemSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      message: 'Invalid item data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { image, ...itemData } = validatedFields.data;
  const itemType = formData.get('type') as 'lost' | 'found';

  let imageUrl = 'https://placehold.co/600x400.png';
  let imageHint = `${itemType} item`;

  if (image && image.size > 0) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const photoDataUri = `data:${image.type};base64,${buffer.toString('base64')}`;
    imageUrl = photoDataUri;

    try {
      const hintResponse = await generateImageHint({ photoDataUri });
      imageHint = hintResponse.imageHint;
    } catch(e) {
      console.error("Failed to generate image hint", e);
      // Fallback to default hint
    }
  }

  const newItem: LostAndFoundItem = {
    id: crypto.randomUUID(),
    ...itemData,
    type: itemType,
    date: new Date().toISOString().split('T')[0],
    imageUrl,
    imageHint,
  };

  return { message: 'Item posted successfully.', item: newItem };
}
