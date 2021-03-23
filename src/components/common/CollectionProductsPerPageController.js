import { html, useEffect } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';

function CollectionProductsPerPageController() {
  const context = useBarbequeSmokerCollectionContext();
  const productsPerPage = context?.collectionState?.productsPerPage ?? 24;
  const dispatch = context?.collectionDispatch ?? (() => {});
  const handleProPerPageChanged = (e) => {
    dispatch({
      type: 'changeProductsPerPage',
      payload: Number(e.target.value),
    });
  };
  return html`<div class="product-page-per-view">
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
  </div>`;
}

export default {
  tagName: 'collection-products-per-page-controller',
  renderer: CollectionProductsPerPageController,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
