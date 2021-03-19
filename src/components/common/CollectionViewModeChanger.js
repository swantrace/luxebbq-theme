import { html } from '@apollo-elements/haunted';

function CollectionViewModeChanger() {
  console.log('CollectionViewModeChanger');
  return html`<div class="collection-view">
    <ul>
      <li class="active"><i class="fa fa-th grid-layout-view"></i></li>
      <li><i class="fa fa-list-ul list-layout-view"></i></li>
    </ul>
  </div>`;
}

export default {
  tagName: 'collection-view-mode-changer',
  renderer: CollectionViewModeChanger,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
