import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';

function CollectionSortByController() {
  const context = useBarbequeSmokerCollectionContext();
  const state = context?.collectionState ?? {};
  const sortValue = state?.sortValue ?? 'BEST_SELLING_ASC';
  const dispatch = context?.collectionDispatch ?? (() => {});
  const handleSortValueChanged = (e) => {
    dispatch({
      type: 'changeSortValue',
      payload: e.target.value,
    });
  };
  return html`<div class="product-page-filter">
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
  </div>`;
}

export default {
  tagName: 'collection-sort-by-controller',
  renderer: CollectionSortByController,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
