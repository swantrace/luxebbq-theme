import { html } from '@apollo-elements/haunted';

function BackToTopBanner() {
  return html`<h1>BackToTopBanner</h1>`;
}

export default {
  tagName: 'back-to-top-banner',
  renderer: BackToTopBanner,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
