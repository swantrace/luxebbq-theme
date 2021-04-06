import { html, virtual } from '@apollo-elements/haunted';

const BarbequesSidebarFilter = virtual(
  () => html`<div
    class="barbeques-sidebar-filter-wrapper collection-filter-block custom_filter mt-4"
  >
    <cook-types-and-brands-filter></cook-types-and-brands-filter>
    <price-range-filter></price-range-filter>
    <grill-cooking-area-filter></grill-cooking-area-filter>
  </div>`
);

export default BarbequesSidebarFilter;
