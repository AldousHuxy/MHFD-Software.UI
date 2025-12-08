import type { ReactNode } from 'react';
import { z } from 'zod';

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  shortName: z.string(),
  disabled: z.boolean().optional(),
});

export type Agent = (z.infer<typeof AgentSchema> & { icon: ReactNode });