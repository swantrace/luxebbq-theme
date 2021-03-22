import { html } from '@apollo-elements/haunted';

function CollectionSidebarFilter() {
  return html`<div class="collection-filter-block custom_filter">
    <cook-types-and-brands-filter></cook-types-and-brands-filter>
    <price-range-filter></price-range-filter>
    <grill-cooking-area-filter></grill-cooking-area-filter>
  </div>`;
}

export default {
  tagName: 'collection-sidebar-filter',
  renderer: CollectionSidebarFilter,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
