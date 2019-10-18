const mobileBreakpoint = 600;
const tabletBreakpoint = 1024;

const mobileBreakpointPx = `${mobileBreakpoint}px`;
const tabletBreakpointPx = `${tabletBreakpoint}px`;

const mobileMixin = `@media only screen and (max-width:${mobileBreakpointPx})`;
const tabletMixin = `@media only screen and (max-width:${tabletBreakpointPx} mind-width:${mobileBreakpointPx})`;
const desktopMixin = `@media only screen and (mind-width:${tabletBreakpointPx})`;

const mixins = {
  mobileMixin,
  tabletMixin,
  desktopMixin,
};

export { mixins };
