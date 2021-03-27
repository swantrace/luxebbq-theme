import { html } from '@apollo-elements/haunted';
import { useBarbequeSmokerCollectionContext } from '../../context/barbequeSmokerCollection';

function CollectionSidebar() {
  const { brandInfo, collectionHandle } = useBarbequeSmokerCollectionContext();
  // console.log('brandInfo', brandInfo, 'collectionHandle', collectionHandle);
  return html`
    <div class="coll_sidebar">
      <collection-sidebar-top-images></collection-sidebar-top-images />
      <collection-sidebar-search-input></collection-sidebar-search-input>
      <collection-sidebar-filter></collection-sidebar-filter>
    </div>
  `;
}

export default {
  tagName: 'collection-sidebar',
  renderer: CollectionSidebar,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
