import { html } from '@apollo-elements/haunted';
import { usePageContext as useBarbequeSmokerCollectionContext } from '../../context';

function CollectionSidebarSearchInput() {
  const context = useBarbequeSmokerCollectionContext();
  const searchString = context?.state?.searchString ?? '';
  const allProducts = context?.state?.allProducts ?? [];
  const dispatch = context?.dispatch;
  return html`<input
    type="text"
    ?disabled=${allProducts?.length === 0}
    class="form-control"
    id="collection-search-input"
    placeholder="Search"
    value=${searchString}
    @keyup=${(e) => {
      dispatch({
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
