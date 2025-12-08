export const BOX_INLET_EDGE_TYPES = {
    SQUARE_EDGE_W_90_HEADWALL: 'Square Edge w/ 90 deg. Headwall',
    SQUARE_EDGE_W_90_HEADWALL_N_15_FLARED: 'Square Edge w/ 90 deg. Headwall & 15 deg. Flared Wingwall',
    SQUARE_EDGE_W_30_75_FLARED: 'Square Edge w/ 30-75 deg. Flared Wingwall',
    SQUARE_EDGE_W_0_FLARED: 'Square Edge w/ 0 deg. Flared Wingwall',
    BEVEL_1to1_90_HEADWALL: '1:1 Bevel w/ 90 deg. Headwall',
    BEVEL_1to1_45_FLARED: '1:1 Bevel w/ 45 deg. Flared Wingwall',
    BEVEL_1to5to1_90_HEADWALL: '1:5:1 Bevel w/ 90 deg. Headwall',
    BEVEL_1to5to1_19_34_HEADWALL: '1:5:1 Bevel w/ 19-34 deg. Flared Wingwall',
} as const;

export type BoxInletEdgeType = keyof typeof BOX_INLET_EDGE_TYPES;

export const PIPE_INLET_EDGE_TYPES = {
    GROOVED_EDGE_PROJECTING: 'Grooved Edge Projecting',
    GROOVED_EDGE_IN_HEADWALL: 'Grooved Edge in Headwall',
    BEVEL_EDGE_1to1: 'Beveled Edge (1:1)',
    BEVEL_EDGE_1to5to1: 'Beveled Edge (1:5:1)',
    SQUARE_EDGE_PROJECTING: 'Squared Edge Projecting',
    SQUARE_EDGE_W_HEADWALL: 'Squared Edge with Headwall'
} as const;

export type PipeInletEdgeType = keyof typeof PIPE_INLET_EDGE_TYPES;