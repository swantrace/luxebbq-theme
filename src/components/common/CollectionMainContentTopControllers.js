import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';
import { getBarbequesCollectionSearchedProducts } from '../../helpers';
import TopControllers from './TopControllers';

function CollectionMainContentTopControllers() {
  const context = useBarbequeSmokerCollectionContext();
  const state = context?.collectionState ?? {};
  const dispatch = context?.collectionDispatch ?? (() => {});
  const productsOfFirstPage = context?.productsOfFirstPage ?? [];
  let searchedProducts = getBarbequesCollectionSearchedProducts(state);
  if (searchedProducts.length === 0) {
    searchedProducts = productsOfFirstPage ?? [];
  }
  const viewMode = state?.viewMode ?? 'grid';
  const productsPerPage = context?.collectionState?.productsPerPage ?? 24;
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
  const productTypeName = 'Grills';

  console.log(searchedProducts);
  return html`<div class="row">
    <div class="col-12">
      <div class="product-filter-content collection-top-controllers">
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
  tagName: 'collection-main-content-top-controllers',
  renderer: CollectionMainContentTopControllers,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
