import { html, virtual } from '@apollo-elements/haunted';

const CollectionSidebar = virtual(
  ({ FilterForTheProductType }) => html`<div class="collection-filter col-sm-3">
    <div class="coll_sidebar">
      <collection-sidebar-top-images></collection-sidebar-top-images>
      <collection-sidebar-search-input></collection-sidebar-search-input>
      ${FilterForTheProductType()}
    </div>
  </div>`
);

export default CollectionSidebar;
