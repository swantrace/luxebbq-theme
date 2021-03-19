import { html } from '@apollo-elements/haunted';

function CollectionProductsCount({ productsCount, productTypeName }) {
  console.log('CollectionProductsCount');
  return html`<div class="search-count">
    <h5>${productsCount} ${productTypeName} match your search criteria</h5>
  </div>`;
}

export default {
  tagName: 'collection-products-count',
  renderer: CollectionProductsCount,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
