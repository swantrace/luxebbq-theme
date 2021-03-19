import { html, virtual } from '@apollo-elements/haunted';

const CollectionBanner = virtual(
  ({ collectionName }) => html`<div
    class="collection-banner d-flex justify-content-between align-items-center"
  >
    <h2 class="collection-banner-name">${collectionName}</h2>
    <div class="parallelograms-group">
      <span class="parallelograms parallelogram-lt"> </span>
      <span class="parallelograms parallelogram-rt"> </span>
      <span class="parallelograms parallelogram-br"> </span>
    </div>
  </div>`
);

export default CollectionBanner;
