const CULVERT: string = '/culvert';

export default {
    APP: '/',
    HOME: '/',
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
        HOME: '/lomc',
        SETTINGS: '/lomc/settings',
    },
    ABOUT: '/about',
    UNKNOWN: '*',
};