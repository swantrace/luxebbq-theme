import { html } from '@apollo-elements/haunted';

function CollectionProductList() {
  return html`<h1>CollectionProductList</h1>`;
}

export default {
  tagName: 'collection-product-list',
  renderer: CollectionProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
