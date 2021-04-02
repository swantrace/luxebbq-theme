import { html, virtual } from '@apollo-elements/haunted';
import '../common/DoubleSlider';

const CollectionSidebarFilter = virtual(
  () => html`<div class="collection-filter-block custom_filter mt-4">
    <cook-types-and-brands-filter></cook-types-and-brands-filter>
    <price-range-filter></price-range-filter>
    <grill-cooking-area-filter></grill-cooking-area-filter>
    <double-slider></double-slider>
  </div>`
);

export default CollectionSidebarFilter;
