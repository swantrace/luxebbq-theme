import { html, useEffect } from '@apollo-elements/haunted';
import { usePageContext as useBarbequeSmokerCollectionContext } from '../../context';
import { getFilteredSortedProductsOfCurrentPage } from '../../helpers';
import ProductList from './ProductList';

function CollectionMainContentProductList() {
  const context = useBarbequeSmokerCollectionContext();
  const state = context?.state ?? {};
  const viewMode = state?.viewMode ?? 'grid';
  const emptyCollectionImage = context?.emptyCollectionImage;
  const allProducts = state?.allProducts ?? [];
  const productsOfFirstPage = context?.productsOfFirstPage;
  let products = [];
  if (allProducts.length === 0) {
    products = productsOfFirstPage;
  } else {
    products = getFilteredSortedProductsOfCurrentPage(state, 'Barbeques');
  }
  useEffect(() => {
    // console.log('change');
    const imgs = this.querySelectorAll('img.lazyloaded');
    // console.log(imgs);
    imgs.forEach((img) => {
      img.removeAttribute('src');
      img.classList.remove('lazyloaded');
      img.classList.add('lazyload');
    });
  }, [products]);

  return html`${ProductList({ viewMode, products, emptyCollectionImage })}`;
}

export default {
  tagName: 'collection-main-content-product-list',
  renderer: CollectionMainContentProductList,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
