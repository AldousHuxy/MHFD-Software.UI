import { z } from 'zod';

export const caseSchema = z.object({
    filename: z.string().min(1),
    reports: z.array(z.object({
        projectId: z.string(),
        caseNum: z.string(),
        received: z.string(),
        type: z.string(),
        analystOrEngineer: z.string(),
        dueDate: z.string().optional(),
        workGroup: z.string(),
        status: z.string(),
        organization: z.string(),
        city: z.string(),
        communityId: z.string(),
        region: z.string(),
        county: z.string(),
        correspondence: z.array(z.string()),
    }))
});

export const reportSchema = z.object({
    projectId: z.string(),
    caseNum: z.string(),
    received: z.string(),
    type: z.string(),
    analystOrEngineer: z.string(),
    dueDate: z.string().optional(),
    workGroup: z.string(),
    status: z.string(),
    organization: z.string(),
    city: z.string(),
    communityId: z.string(),
    region: z.string(),
    county: z.string(),
    correspondence: z.array(z.string()),
});

export type Case = z.infer<typeof caseSchema>;
export type Report = z.infer<typeof reportSchema>;