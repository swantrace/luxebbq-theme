import { html } from '@apollo-elements/haunted';

function CollectionMainContentPagination() {
  return html`<h1>CollectionMainContentPagination</h1>`;
}

export default {
  tagName: 'collection-main-content-pagination',
  renderer: CollectionMainContentPagination,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
