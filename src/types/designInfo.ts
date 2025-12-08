// Re-export types from schema to maintain backward compatibility
export type {
    DesignInfo,
    Culvert,
    PipeCulvert,
    BoxCulvert,
    PipeConduitFlow,
    BoxConduitFlow,
    PipeCulvertRating,
    BoxCulvertRating,
    PipeHWOutletProtection,
    BoxHWOutletProtection,
    Profile
} from '@/schemas/designInfo.schema';

export type CulvertType = 'pipe' | 'box';
export type ConduitFlow = PipeConduitFlow | BoxConduitFlow;
export type CulvertRating = PipeCulvertRating | BoxCulvertRating;
export type HWOutletProtection = PipeHWOutletProtection | BoxHWOutletProtection;

// Note: Import the actual types above to use them in the union types
import type {
    PipeConduitFlow,
    BoxConduitFlow,
    PipeCulvertRating,
    BoxCulvertRating,
    PipeHWOutletProtection,
    BoxHWOutletProtection
} from '@/schemas/designInfo.schema';