import { html } from '@apollo-elements/haunted';

function CollectionSidebar() {
  return html`<h1>CollectionSidebar</h1>`;
}

export default {
  tagName: 'collection-sidebar',
  renderer: CollectionSidebar,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
