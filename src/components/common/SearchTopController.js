import { html } from '@apollo-elements/haunted';

function SearchContent() {
  return html`<section class="section-b-space pt-0">
    <div class="container">
      <div class="row search-product">
        <div class="col-12">
          <div class="product-filter-content collection-top-controllers">
            <collection-products-count></collection-products-count>
            <collection-view-mode-changer></collection-view-mode-changer>
            <collection-products-per-page-controller></collection-products-per-page-controller>
            <collection-sort-by-controller></collection-sort-by-controller>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export default {
  tagName: 'search-content',
  renderer: SearchContent,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
