const GrillCookingAreaFilter = (html) => () =>
  html`<h1>GrillCookingAreaFilter</h1>`;

export default {
  tagName: 'grill-cooking-area-filter',
  renderer: GrillCookingAreaFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
