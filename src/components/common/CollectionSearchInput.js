import { html } from '@apollo-elements/haunted';

function CollectionSearchInput() {
  return html`<h1>CollectionSearchInput</h1>`;
}

export default {
  tagName: 'collection-search-input',
  renderer: CollectionSearchInput,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
