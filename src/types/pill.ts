import { z } from 'zod';

export const pillSchema = z.object({
  id: z.number(),
  label: z.string(),
  text: z.string(),
  color: z.string().optional()
});

export type Pill = z.infer<typeof pillSchema>;