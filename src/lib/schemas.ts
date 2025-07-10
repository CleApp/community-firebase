import { z } from 'zod';

export const PostItemSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
  contact: z.string().min(3, { message: "Contact information is required." }),
});

export const ReportSchema = z.object({
  type: z.string({required_error: "Please select a report type."}).min(1, { message: "Please select a report type." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
});
