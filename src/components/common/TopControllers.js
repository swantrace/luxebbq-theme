import { html, virtual } from '@apollo-elements/haunted';
import ProductListLoading from './ProductListLoading';

const MainContentTopControllers = virtual(
  ({
    fetchIsFinished,
    productsSize,
    viewMode,
    productsPerPage,
    sortValue,
    handleViewModeIconClicked,
    handleProductsPerPageChanged,
    handleSortValueChanged,
  }) =>
    // const context = usePageContext();
    // const state = context?.state ?? {};
    // const dispatch = context?.dispatch ?? (() => {});
    // const fetchIsFinished = state?.fetchIsFinished ?? false;
    // const searchedProducts = getFilteredSortedProducts(state, productType);
    // const viewMode = state?.viewMode ?? 'grid';
    // const productsPerPage = context?.state?.productsPerPage ?? 24;
    // const sortValue = state?.sortValue ?? 'BEST_SELLING_ASC';

    // const handleViewModeIconClicked = (newViewMode) => {
    //   dispatch({ type: 'changeViewMode', payload: newViewMode });
    // };

    // const handleProductsPerPageChanged = (e) => {
    //   dispatch({
    //     type: 'changeProductsPerPage',
    //     payload: Number(e.target.value),
    //   });
    // };

    // const handleSortValueChanged = (e) => {
    //   dispatch({
    //     type: 'changeSortValue',
    //     payload: e.target.value,
    //   });
    // };

    // const productsSize = searchedProducts.length;

    html`<div class="row py-5">
      <div class="col-12">
        <div class="product-filter-content collection-top-controllers mx-3">
          <div class="search-count">
            ${fetchIsFinished
              ? html`<h5>
                  ${productsSize} Products match your search criteria
                </h5>`
              : html`${ProductListLoading()}`}
          </div>
          <div class="collection-view">
            <ul>
              <li class=${viewMode === 'grid' ? 'active' : ''}>
                <i
                  class="fa fa-th grid-layout-view"
                  @click=${(e) => handleViewModeIconClicked('grid', e)}
                ></i>
              </li>
              <li class=${viewMode === 'list' ? 'active' : ''}>
                <i
                  class="fa fa-list-ul list-layout-view"
                  @click=${(e) => handleViewModeIconClicked('list', e)}
                ></i>
              </li>
            </ul>
          </div>
          <div class="product-page-per-view">
            <select
              name="pro_limit"
              value=${productsPerPage}
              @change=${handleProductsPerPageChanged}
            >
              ${[12, 24, 36, 48].map(
                (ppp) => html`
                  <option value=${ppp} ?selected=${productsPerPage === ppp}>
                    ${ppp} Products
                  </option>
                `
              )}
            </select>
          </div>
          <div class="product-page-filter">
            <select
              name="sortBy"
              id="sortBy"
              value=${sortValue}
              @change=${handleSortValueChanged}
            >
              ${[
                ['BEST_SELLING_ASC', 'Best Selling'],
                ['TITLE_ASC', 'Alphabetically, A-Z'],
                ['TITLE_DESC', 'Alphabetically, Z-A'],
                ['PRICE_ASC', 'Price, low to high'],
                ['PRICE_DESC', 'Price, high to low'],
              ].map(
                ([value, label]) => html` <option
                  value=${value}
                  ?selected=${sortValue === value}
                >
                  ${label}
                </option>`
              )}
            </select>
          </div>
        </div>
      </div>
    </div>`
);

export default MainContentTopControllers;
