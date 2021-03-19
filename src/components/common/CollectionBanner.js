import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';

function CollectionBanner({ collectionName }) {
  const { brandInfo } = useBarbequeSmokerCollectionContext();
  console.log('brandInfo', brandInfo);
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
  tagName: 'collection-banner',
  renderer: CollectionBanner,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
