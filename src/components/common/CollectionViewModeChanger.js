import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';

function CollectionViewModeChanger() {
  const context = useBarbequeSmokerCollectionContext();
  const state = context?.collectionState;
  const viewMode = state?.viewMode ?? 'grid';
  const dispatch = context?.collectionDispatch;
  const handleViewModeIconClicked = (newViewMode) => {
    dispatch({ type: 'changeViewMode', payload: newViewMode });
  };
  return html`<div class="collection-view">
    <ul>
      <li class=${viewMode === 'grid' ? 'active' : ''}>
        <i
          class="fa fa-th grid-layout-view"
          @click=${(e) => handleViewModeIconClicked('grid', e)}
        ></i>
      </li>
      <li class=${viewMode === 'list' ? 'active' : ''}>
        <i
          class="fa fa-list-ul list-layout-view"
          @click=${(e) => handleViewModeIconClicked('list', e)}
        ></i>
      </li>
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
