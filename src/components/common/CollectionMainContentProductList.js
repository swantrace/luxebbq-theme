import { html } from '@apollo-elements/haunted';

function CollectionMainContentProductList() {
  return html`<h1>CollectionProductList</h1>`;
}

export default {
  tagName: 'collection-main-content-product-list',
  renderer: CollectionMainContentProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
