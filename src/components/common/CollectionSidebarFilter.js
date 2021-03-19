import { html } from '@apollo-elements/haunted';

function CollectionSidebarFilter() {
  return html`<h1>CollectionSidebarFilter</h1>`;
}

export default {
  tagName: 'collection-sidebar-filter',
  renderer: CollectionSidebarFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
