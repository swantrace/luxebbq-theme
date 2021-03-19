import { html } from '@apollo-elements/haunted';

function PriceRangeFilter() {
  return html`<h1>PriceRangeFilter</h1>`;
}

export default {
  tagName: 'price-range-filter',
  renderer: PriceRangeFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
