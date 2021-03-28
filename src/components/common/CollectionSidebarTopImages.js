import { html } from '@apollo-elements/haunted';
import { usePageContext as useBarbequeSmokerCollectionContext } from '../../context';

function CollectionSidebarTopImages() {
  const context = useBarbequeSmokerCollectionContext();
  const collectionImages = context?.collectionImages ?? [];

  return html`<div class="collection-images-wrapper">
    ${collectionImages.map(
      (image) => html`
      <div class="collection-image-wrapper" style="width: 100%; padding: 5px; border: 1px solid black; min-height: 100px;">
        <a href=${image.imageTarget}
          ><img src=${image.imageUrl} alt=${image.imageText}
        /></a>
      </div></div>
    `
    )}
  </div>`;
}

export default {
  tagName: 'collection-sidebar-top-images',
  renderer: CollectionSidebarTopImages,
  options: {
    observedAttributes: [],
    useShadowDOM: false,
  },
};
