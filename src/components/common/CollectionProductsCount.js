import { html, virtual } from '@apollo-elements/haunted';

const CollectionProductsCount = virtual(
  ({ productsCount, productTypeName }) => html`<div class="search-count">
    <h5>${productsCount} ${productTypeName} match your search criteria</h5>
  </div>`
);

export default CollectionProductsCount;
