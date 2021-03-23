import { html } from '@apollo-elements/haunted';

function SearchProductList() {
  return html`<div class="row search-product search-product-list-row"></div>`;
}

export default {
  tagName: 'search-product-list',
  renderer: SearchProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
