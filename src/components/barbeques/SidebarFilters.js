import { html } from '@apollo-elements/haunted';

function SidebarFilters() {
  return html`<h1>SidebarFilters</h1>`;
}

export default {
  tagName: 'barbeques-sidebar-filters',
  renderer: SidebarFilters,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
