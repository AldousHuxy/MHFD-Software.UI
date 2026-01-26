import { z } from 'zod';

type Date = string; // MM/DD/YYYY

const CORRESPONDENCE = {
    ALL_DATA_RECEIVED: 'All Data Received',
    ACKNOWLEDGE_RECEIPT: 'Acknowledge receipt of request/all data',
    REQUEST_FOR_ADDITIONAL_DATA: 'Request for Additional Data',
    DETERMINATION_LETTER: 'Determination letter to FEMA',
    SUSPENDED_DUE_TO_FEE: 'Suspended Due to Fee to Data',
    AUDIT_DETERMINATION: 'Audit Determination',
    REVIEW_DETERMINATION: 'Review Determination',
    DISTRIBUTE_DETERMINATION: 'Distribute Determination',
    RECEIVE_BFE_PUBLICATION_AFFIDAVIT: 'Receive BFE Publication Affidavit',
    REQUEST_ADDITIONAL_FEE: 'Request additional fee',
} as const;

type CorrespondenceOptions = typeof CORRESPONDENCE[keyof typeof CORRESPONDENCE];

type Correspondence = Record<Date, CorrespondenceOptions>;

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
    cities: z.array(z.string()),
    communityIds: z.array(z.string()),
    counties: z.array(z.string()),
});

export type Report = z.infer<typeof reportSchema> & {
    correspondence: Correspondence;
};