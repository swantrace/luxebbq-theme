import { html, useEffect, virtual } from '@apollo-elements/haunted';
import ProductItem from './ProductItem';

const Products = virtual(
  ({
    productsOfCurrentPage,
    mainContentElement,
    viewMode,
    emptyCollectionImage,
    itemClassList = {
      grid: 'col-lg-4 col-md-6 col-grid-box',
      list: 'col-lg-12',
    },
  }) => {
    useEffect(() => {
      const imgs = mainContentElement.querySelectorAll('img.lazyloaded');
      imgs.forEach((img) => {
        img.classList.remove('lazyloaded');
        img.classList.add('lazyload');
      });
    }, [productsOfCurrentPage]);

    return html`<div
      class=${`product-wrapper-grid collection-grid${
        viewMode === 'grid' ? '' : ' list-view'
      }`}
      style="opacity: 1;"
    >
      <div class="container-fluid">
        <div class="row">
          ${productsOfCurrentPage.length > 0
            ? productsOfCurrentPage.map(
                (product) =>
                  html`${ProductItem({ viewMode, product, itemClassList })}`
              )
            : html`<div class="col-sm-12 text-center mt-5">
                <img src=${emptyCollectionImage} class="img-fluid mb-5" />
                <h3 class="text-center m-0">Sorry, No products found</h3>
              </div>`}
        </div>
      </div>
    </div>`;
  }
);

export default Products;
