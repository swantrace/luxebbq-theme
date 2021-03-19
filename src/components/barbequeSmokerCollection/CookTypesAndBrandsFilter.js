const CookTypesAndBrandsFilter = (html) => () => {
  console.log(html);
  return html`<h1>CookTypesAndBrandsFilter</h1>`;
};

export default {
  tagName: 'cook-types-and-brands-filter',
  renderer: CookTypesAndBrandsFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
