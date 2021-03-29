import { html, virtual } from '@apollo-elements/haunted';

const CollectionSidebarFilter = virtual(
  () => html`<div class="collection-filter-block custom_filter">
    <cook-types-and-brands-filter></cook-types-and-brands-filter>
    <price-range-filter></price-range-filter>
    <grill-cooking-area-filter></grill-cooking-area-filter>
  </div>`
);

export default CollectionSidebarFilter;
