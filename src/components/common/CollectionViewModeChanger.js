import { html, virtual } from '@apollo-elements/haunted';

const CollectionViewModeChanger = virtual(
  () => html`<div class="collection-view">
    <ul>
      <li class="active"><i class="fa fa-th grid-layout-view"></i></li>
      <li><i class="fa fa-list-ul list-layout-view"></i></li>
    </ul>
  </div>`
);

export default CollectionViewModeChanger;
