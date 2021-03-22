import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';

function CollectionSidebarSearchInput() {
  const context = useBarbequeSmokerCollectionContext();
  const searchString = context?.collectionState?.searchString ?? '';
  const allProducts = context?.collectionState?.allProducts ?? [];
  const collectionDispatch = context?.collectionDispatch;
  return html`<input
    type="text"
    ?disabled=${allProducts?.length === 0}
    class="form-control"
    id="collection-search-input"
    placeholder="Search"
    value=${searchString}
    @keyup=${(e) => {
      collectionDispatch({
        type: 'changeSearchString',
        payload: e.target.value,
      });
    }}
  />`;
}

export default {
  tagName: 'collection-sidebar-search-input',
  renderer: CollectionSidebarSearchInput,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
