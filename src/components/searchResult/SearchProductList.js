import { html, useEffect } from '@apollo-elements/haunted';
import { useSearchResultContext } from '../../context/searchResult';
import { getFilteredSortedProducts } from '../../helpers';
import ProductList from '../common/ProductList';

function SearchProductList() {
  const context = useSearchResultContext();
  const state = context?.searchResultState ?? {};
  const viewMode = state?.viewMode ?? 'grid';
  const emptyCollectionImage = context?.emptyCollectionImage;
  const allProducts = state?.allProducts ?? [];
  const productsOfFirstPage = context?.productsOfFirstPage;
  let products = [];
  if (allProducts.length === 0) {
    products = productsOfFirstPage;
  } else {
    products = getFilteredSortedProducts(state);
  }

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
  tagName: 'search-product-list',
  renderer: SearchProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
