import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';
import { getBarbequesCollectionSearchedProducts } from '../../helpers';

function CollectionProductsCount({ productTypeName }) {
  const context = useBarbequeSmokerCollectionContext();
  const collectionState = context?.collectionState ?? {};
  const searchedProducts = getBarbequesCollectionSearchedProducts(
    collectionState
  );
  console.log(searchedProducts);
  return html`<div class="search-count">
    <h5>
      ${searchedProducts.length} ${productTypeName} match your search criteria
    </h5>
  </div>`;
}

export default {
  tagName: 'collection-products-count',
  renderer: CollectionProductsCount,
  options: {
    observedAttributes: ['product-type-name'],
    useShadowDOM: false,
  },
};
