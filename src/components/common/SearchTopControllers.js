import { html } from '@apollo-elements/haunted';
import { useSearchResultContext } from '../../context/searchResult';
import TopControllers from './TopControllers';

function SearchTopControllers() {
  const context = useSearchResultContext();
  const state = context?.searchResultState ?? {};
  const dispatch = context?.searchResultDispatch ?? (() => {});
  const productsOfFirstPage = context?.productsOfFirstPage ?? [];
  let searchedProducts = state.allProducts ?? [];
  if (searchedProducts.length === 0) {
    searchedProducts = productsOfFirstPage ?? [];
  }
  const viewMode = state?.viewMode ?? 'grid';
  const productsPerPage = state?.productsPerPage ?? 24;
  const sortValue = state?.sortValue ?? 'BEST_SELLING_ASC';

  const handleViewModeIconClicked = (newViewMode) => {
    dispatch({ type: 'changeViewMode', payload: newViewMode });
  };

  const handleProPerPageChanged = (e) => {
    dispatch({
      type: 'changeProductsPerPage',
      payload: Number(e.target.value),
    });
  };

  const handleSortValueChanged = (e) => {
    dispatch({
      type: 'changeSortValue',
      payload: e.target.value,
    });
  };

  const searchedProductsSize = searchedProducts.length;
  const productTypeName = 'Items';

  return html`<div class="row">
    <div class="col-lg-10 offset-lg-1">
      <div class="product-filter-content search-top-controllers">
        ${TopControllers({
          searchedProductsSize,
          productTypeName,
          viewMode,
          productsPerPage,
          sortValue,
          handleViewModeIconClicked,
          handleProPerPageChanged,
          handleSortValueChanged,
        })}
      </div>
    </div>
  </div>`;
}
export default {
  tagName: 'search-top-controllers',
  renderer: SearchTopControllers,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
