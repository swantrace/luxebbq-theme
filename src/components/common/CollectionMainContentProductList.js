import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';
import { getBarbequesCollectionSearchedProductsOfCurrentPage } from '../../helpers';

function CollectionMainContentProductList() {
  const context = useBarbequeSmokerCollectionContext();
  const state = context?.collectionState ?? {};
  const searchedProductsOfCurrentPage = getBarbequesCollectionSearchedProductsOfCurrentPage(
    state
  );
  const productsOfFirstPage = context?.productsOfFirstPage;
  let products = [];
  if ((searchedProductsOfCurrentPage ?? []).length === 0) {
    products = productsOfFirstPage;
  } else {
    products = searchedProductsOfCurrentPage;
  }

  const viewMode = state?.viewMode ?? 'grid';
  return html`<div
    class=${`product-wrapper-grid collection-grid${
      viewMode === 'grid' ? '' : ' list-view'
    }`}
    style="opacity: 1;"
  >
    <div class="container-fluid">
      <div class="row">
        ${products.map(
          (product) =>
            html`<collection-main-content-product-item
              class=${viewMode === 'grid'
                ? 'col-xl-4 col-md-6 col-grid-box'
                : 'col-lg-12'}
              .product=${product}
            ></collection-main-content-product-item>`
        )}
      </div>
    </div>
  </div>`;
}

export default {
  tagName: 'collection-main-content-product-list',
  renderer: CollectionMainContentProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
