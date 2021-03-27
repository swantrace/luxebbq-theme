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
          <collection-main-content-top-controllers></collection-main-content-top-controllers>
          <collection-main-content-product-list></collection-main-content-product-list>
          <collection-main-content-pagination></collection-main-content-pagination>
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
