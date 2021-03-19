import { html } from '@apollo-elements/haunted';

function CollectionMainContent() {
  return html`<h1>CollectionMainContent</h1>`;
}

export default {
  tagName: 'collection-main-content',
  renderer: CollectionMainContent,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
