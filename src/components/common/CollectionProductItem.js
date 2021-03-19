import { html } from '@apollo-elements/haunted';

function CollectionProductItem() {
  return html`<h1>CollectionProductItem</h1>`;
}

export default {
  tagName: 'collection-product-item',
  renderer: CollectionProductItem,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
