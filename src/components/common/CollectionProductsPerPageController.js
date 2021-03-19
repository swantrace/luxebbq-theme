import { html } from '@apollo-elements/haunted';

function CollectionProductsPerPageController() {
  console.log('CollectionProductsPerPageController');
  return html`<div class="product-page-per-view">
    <select name="pro_limit">
      <option value="12">Default</option>
      <option value="24">24 Products</option>
      <option value="36">36 Products</option>
      <option value="48">48 Products</option>
    </select>
  </div>`;
}

export default {
  tagName: 'collection-products-per-page-controller',
  renderer: CollectionProductsPerPageController,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
