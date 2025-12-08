import { z } from 'zod';

// Conduit Flow schemas
export const pipeConduitFlowSchema = z.object({
    type: z.literal('pipe'),
    pipeInvertSlope: z.number(),
    pipeManningsNValue: z.number(),
    pipeDiameter: z.number(),
    designDischarge: z.number()
});

export const boxConduitFlowSchema = z.object({
    type: z.literal('box'),
    boxConduitInvertSlope: z.number(),
    boxManningsNValue: z.number(),
    boxWidth: z.number(),
    boxHeight: z.number(),
    designDischarge: z.number()
});

// Culvert Rating schemas
export const pipeCulvertRatingSchema = z.object({
    type: z.literal('pipe'),
    barrelDiameter: z.number(),
    inletEdgeType: z.string()
});

export const boxCulvertRatingSchema = z.object({
    type: z.literal('box'),
    barrelHeight: z.number(),
    barrelWidth: z.number(),
    inletEdgeType: z.string(),
    numOfBarrels: z.number(),
    inletElevationAtCulvertInlet: z.number(),
    isSlope: z.boolean().optional(),
    outletElevationOrSlope: z.number(),
    culvertLength: z.number(),
    manningsRoughness: z.number(),
    bendLossCoefficient: z.number(),
    exitLossCoefficient: z.number()
});

// HW Outlet Protection schemas
export const pipeHWOutletProtectionSchema = pipeCulvertRatingSchema.extend({
    designDischarge: z.number()
});

export const boxHWOutletProtectionSchema = boxCulvertRatingSchema.extend({
    designDischarge: z.number(),
    tailwaterSurfaceElevation: z.number(),
    maxAllowableChannelVelocity: z.number()
});

// Profile schema
export const profileSchema = z.object({
    barrelDiameterOrHeight: z.number(),
    barrelLength: z.number(),
    barrelInvertSlope: z.number(),
    downstreamInvertElevation: z.number(),
    downstreamTopEmbankmentElevation: z.number(),
    upstreamTopEmbankmentElevation: z.number(),
    designHeadwaterDepth: z.number(),
    tailwaterDepth: z.number()
});

// Culvert schemas
export const pipeCulvertSchema = z.object({
    pipeId: z.number(),
    type: z.literal('pipe'),
    conduitFlow: pipeConduitFlowSchema.optional(),
    culvertRating: pipeCulvertRatingSchema.optional(),
    hwOutletProtection: pipeHWOutletProtectionSchema.optional(),
    profile: profileSchema.optional()
});

export const boxCulvertSchema = z.object({
    boxId: z.number(),
    type: z.literal('box'),
    conduitFlow: boxConduitFlowSchema.optional(),
    culvertRating: boxCulvertRatingSchema.optional(),
    hwOutletProtection: boxHWOutletProtectionSchema.optional(),
    profile: profileSchema.optional()
});

export const culvertSchema = z.discriminatedUnion('type', [pipeCulvertSchema, boxCulvertSchema]);

// DesignInfo schema
export const designInfoSchema = z.object({
    projectName: z.string(),
    projectId: z.number(),
    culverts: z.array(culvertSchema).optional()
});

// Export inferred types
export type PipeConduitFlow = z.infer<typeof pipeConduitFlowSchema>;
export type BoxConduitFlow = z.infer<typeof boxConduitFlowSchema>;
export type PipeCulvertRating = z.infer<typeof pipeCulvertRatingSchema>;
export type BoxCulvertRating = z.infer<typeof boxCulvertRatingSchema>;
export type PipeHWOutletProtection = z.infer<typeof pipeHWOutletProtectionSchema>;
export type BoxHWOutletProtection = z.infer<typeof boxHWOutletProtectionSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type PipeCulvert = z.infer<typeof pipeCulvertSchema>;
export type BoxCulvert = z.infer<typeof boxCulvertSchema>;
export type Culvert = z.infer<typeof culvertSchema>;
export type DesignInfo = z.infer<typeof designInfoSchema>;
