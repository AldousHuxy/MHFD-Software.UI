const RATIONAL: string = '/rational';
const CULVERT: string = '/culvert';
const LOMC: string = '/lomc';

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
    LOMC: {
        HOME: LOMC,
        MAP: `${LOMC}/map`,
        SETTINGS: `${LOMC}/settings`
    },
    ABOUT: '/about',
    UNKNOWN: '*',
};