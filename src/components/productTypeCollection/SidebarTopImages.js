import { html, virtual } from '@apollo-elements/haunted';

const SidebarTopImages = virtual(
  ({ collectionImages }) => html`<div class="collection-images-wrapper">
    ${collectionImages.map(
      (image) => html`
      <div class="collection-image-wrapper py-2" style="width: 100%; min-height: 100px;">
        <a href=${image.imageTarget}
          ><img class="w-100" src=${image.imageUrl} alt=${image.imageText}
        /></a>
      </div></div>
    `
    )}
  </div>`
);

export default SidebarTopImages;
