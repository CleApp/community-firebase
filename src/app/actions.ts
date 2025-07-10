'use server';

import { prioritizeReport } from '@/ai/flows/prioritize-reports';
import type { CommunityReport } from '@/lib/types';
import { ReportSchema } from '@/lib/schemas';

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
