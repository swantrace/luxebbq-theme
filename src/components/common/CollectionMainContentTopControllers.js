import { html } from '@apollo-elements/haunted';

function CollectionMainContentTopControllers() {
  console.log('CollectionMainContentTopControllers');
  return html`<div class="row">
    <div class="col-12">
      <div class="product-filter-content collection-top-controllers">
        <collection-products-count
          products-count="28"
          product-type-name="Grills"
        ></collection-products-count>
        <collection-view-mode-changer></collection-view-mode-changer>
        <collection-products-per-page-controller></collection-products-per-page-controller>
        <collection-sort-by-controller></collection-sort-by-controller>
      </div>
    </div>
  </div>`;
}
export default {
  tagName: 'collection-main-content-top-controllers',
  renderer: CollectionMainContentTopControllers,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
