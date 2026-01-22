const RATIONAL: string = '/rational';
const CULVERT: string = '/culvert';
const BID_ITEMS: string = '/bid-items';
const LOMC: string = '/lomc';
const CASE_TRACKING: string = '/case-tracking';

export default {
    APP: '/',
    HOME: '/',
    RATIONAL: {
        HOME: RATIONAL,
    },
    CULVERT: {
        HOME: CULVERT,
        CONDUIT_FLOW: `${CULVERT}/conduit-flow`,
        CULVERT_RATING: `${CULVERT}/culvert-rating`,
        HW_OUTLET_PROTECTION: `${CULVERT}/hw-outlet-protection`,
        PROFILE: `${CULVERT}/profile`,
        PREVIOUS_VERSIONS: `${CULVERT}/versions`,
        DOCUMENTATION: `${CULVERT}/docs`,
    },
    BID_ITEM: {
        HOME: BID_ITEMS,
        ESTIMATE: `${BID_ITEMS}/estimate`,
    },
    LOMC: {
        HOME: LOMC,
        MAP: `${LOMC}/map`,
        SETTINGS: `${LOMC}/settings`
    },
    CASE_TRACKING: {
        HOME: CASE_TRACKING,
    },
    ABOUT: '/about',
    UNKNOWN: '*',
} as const;