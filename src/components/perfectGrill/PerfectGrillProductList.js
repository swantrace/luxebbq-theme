import { html, useEffect } from '@apollo-elements/haunted';
import { usePageContext as usePerfectGrillContext } from '../../context';
import { getFilteredSortedProductsOfCurrentPage } from '../../helpers';
import ProductList from '../common/ProductList';

function PerfectGrillProductList() {
  const context = usePerfectGrillContext();
  const state = context?.state ?? {};
  const viewMode = state?.viewMode ?? 'grid';
  const emptyCollectionImage = context?.emptyCollectionImage;
  const products = getFilteredSortedProductsOfCurrentPage(state, 'Barbeques');

  useEffect(() => {
    // console.log('change');
    const imgs = this.querySelectorAll('img.lazyloaded');
    imgs.forEach((img) => {
      img.removeAttribute('src');
      img.classList.remove('lazyloaded');
      img.classList.add('lazyload');
    });
  }, [products]);
  return html`<div class="row">
    <div class="col-lg-10 offset-lg-1">
      <div class="product-list-content search-product-list">
        ${ProductList({
          viewMode,
          products,
          emptyCollectionImage,
          itemClassList: {
            grid: 'col-lg-3 col-md-6 col-grid-box',
            list: 'col-lg-12',
          },
        })}
      </div>
    </div>
  </div>`;
}

export default {
  tagName: 'perfect-grill-product-list',
  renderer: PerfectGrillProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
