import { html } from '@apollo-elements/haunted';

function CollectionSidebarTopImages() {
  return html`<h1>CollectionSidebarTopImages</h1>`;
}

export default {
  tagName: 'collection-sidebar-top-images',
  renderer: CollectionSidebarTopImages,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
