import { html } from '@apollo-elements/haunted';

function CollectionMainContentBanner({ collectionName }) {
  return html`<div
    class="collection-banner d-flex justify-content-between align-items-center"
  >
    <h2 class="collection-banner-name">${collectionName}</h2>
    <div class="parallelograms-group">
      <span class="parallelograms parallelogram-lt"> </span>
      <span class="parallelograms parallelogram-rt"> </span>
      <span class="parallelograms parallelogram-br"> </span>
    </div>
  </div>`;
}

export default {
  tagName: 'collection-main-content-banner',
  renderer: CollectionMainContentBanner,
  options: {
    observedAttributes: ['collection-name'],
    useShadowDOM: false,
  },
};
