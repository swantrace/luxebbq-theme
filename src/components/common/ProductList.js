import { html, virtual } from '@apollo-elements/haunted';
import ProductItem from './ProductItem';

const ProductList = virtual(
  ({
    viewMode,
    emptyCollectionImage,
    products = [],
    itemClassList = {
      grid: 'col-lg-4 col-md-6 col-grid-box',
      list: 'col-lg-12',
    },
  }) => html`<div
    class=${`product-wrapper-grid collection-grid${
      viewMode === 'grid' ? '' : ' list-view'
    }`}
    style="opacity: 1;"
  >
    <div class="container-fluid">
      <div class="row">
        ${products.length > 0
          ? products.map(
              (product) =>
                html`${ProductItem({ viewMode, product, itemClassList })}`
            )
          : html`<div class="col-sm-12 text-center mt-5">
              <img src=${emptyCollectionImage} class="img-fluid mb-5" />
              <h3 class="text-center m-0">Sorry, No products found</h3>
            </div>`}
      </div>
    </div>
  </div>`
);

export default ProductList;
