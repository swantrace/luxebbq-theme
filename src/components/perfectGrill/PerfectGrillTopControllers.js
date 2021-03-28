import { html } from '@apollo-elements/haunted';
import { usePerfectGrillContext } from '../../context/perfectGrill';
import { getFilteredSortedProducts } from '../../helpers';
import TopControllers from '../common/TopControllers';

function PerfectGrillTopControllers() {
  const context = usePerfectGrillContext();
  const state = context?.state ?? {};
  const dispatch = context?.dispatch ?? (() => {});
  const searchedProducts = getFilteredSortedProducts(state, 'Barbeques');

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
  tagName: 'perfect-grill-top-controllers',
  renderer: PerfectGrillTopControllers,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
