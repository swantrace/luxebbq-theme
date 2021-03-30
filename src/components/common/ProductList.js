import { html, useEffect } from '@apollo-elements/haunted';
import { usePageContext } from '../../context';
import { getFilteredSortedProductsOfCurrentPage } from '../../helpers';
import ProductItem from './ProductItem';

function ProductList({
  productType,
  itemClassList = {
    grid: 'col-lg-4 col-md-6 col-grid-box',
    list: 'col-lg-12',
  },
}) {
  const context = usePageContext();
  const state = context?.state ?? {};
  const viewMode = state?.viewMode ?? 'grid';
  const emptyCollectionImage = context?.emptyCollectionImage;
  const allProducts = state?.allProducts ?? [];
  const productsOfFirstPage = context?.productsOfFirstPage;
  let products = [];
  if (allProducts.length === 0 && productsOfFirstPage) {
    products = productsOfFirstPage;
  } else {
    products = getFilteredSortedProductsOfCurrentPage(state, productType) ?? [];
  }
  useEffect(() => {
    const imgs = this.querySelectorAll('img.lazyloaded');
    imgs.forEach((img) => {
      img.classList.remove('lazyloaded');
      img.classList.add('lazyload');
    });
  }, [products]);

  return html`<div
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
  </div>`;
}

export default {
  tagName: 'product-list',
  renderer: ProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
