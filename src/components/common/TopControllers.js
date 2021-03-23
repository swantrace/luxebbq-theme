import { html, virtual } from '@apollo-elements/haunted';

const TopControllers = virtual(
  ({
    searchedProductsSize,
    productTypeName,
    viewMode,
    productsPerPage,
    sortValue,
    handleViewModeIconClicked,
    handleProPerPageChanged,
    handleSortValueChanged,
  }) => html`<div class="search-count">
      <h5>
        ${searchedProductsSize} ${productTypeName} match your search criteria
      </h5>
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
        @change=${handleProPerPageChanged}
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
    </div>`
);

export default TopControllers;
