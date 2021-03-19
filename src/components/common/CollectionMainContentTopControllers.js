import { html } from '@apollo-elements/haunted';
import CollectionProductsCount from './CollectionProductsCount';
import CollectionProductsPerPageController from './CollectionProductsPerPageController';
import CollectionSortByController from './CollectionSortByController';
import CollectionViewModeChanger from './CollectionViewModeChanger';

function CollectionMainContentTopControllers() {
  console.log('CollectionMainContentTopControllers');
  return html`<div class="row">
    <div class="col-12">
      <div class="product-filter-content collection-top-controllers">
        ${CollectionProductsCount({
          productsCount: 28,
          productTypeName: 'Grills',
        })}
        ${CollectionViewModeChanger()} ${CollectionProductsPerPageController()}
        ${CollectionSortByController()}
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
