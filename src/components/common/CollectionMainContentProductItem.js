import { html } from '@apollo-elements/haunted';

function CollectionMainContentProductItem() {
  return html`<h1>CollectionProductItem</h1>`;
}

export default {
  tagName: 'collection-main-content-product-item',
  renderer: CollectionMainContentProductItem,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
