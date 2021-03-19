import { html } from '@apollo-elements/haunted';

function CollectionSortByController() {
  console.log('CollectionSortByController');
  return html`<div class="product-page-filter">
    <select name="sortBy" id="sortBy">
      <option value="manual">Featured</option>
      <option value="best-selling">Best Selling</option>
      <option value="title-ascending">Alphabetically, A-Z</option>
      <option value="title-descending">Alphabetically, Z-A</option>
      <option value="price-ascending">Price, low to high</option>
      <option value="price-descending">Price, high to low</option>
    </select>
  </div>`;
}

export default {
  tagName: 'collection-sort-by-controller',
  renderer: CollectionSortByController,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
