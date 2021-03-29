import { html } from '@apollo-elements/haunted';
import TitleBanner from './TitleBanner';

function CollectionMainContent() {
  return html`<div class="page-main-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          ${TitleBanner({
            title: 'Grills / Smokers',
          })}
          <product-list-top-controllers
            .productType=${'Barbeques'}
          ></product-list-top-controllers>
          <collection-main-content-product-list></collection-main-content-product-list>
          <product-list-pagination
            .productType=${'Barbeques'}
          ></product-list-pagination>
        </div>
      </div>
    </div>
  </div>`;
}

export default {
  tagName: 'collection-main-content',
  renderer: CollectionMainContent,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
