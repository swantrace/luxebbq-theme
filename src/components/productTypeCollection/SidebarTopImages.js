import { html, virtual } from '@apollo-elements/haunted';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

const SidebarTopImages = virtual(({ collectionImages }) => {
  const topImagesPlaceHolder = document.querySelector(
    '#top-images-placeholder'
  );
  console.log(topImagesPlaceHolder);
  return html`<div class="collection-images-wrapper">
    ${topImagesPlaceHolder?.innerHTML
      ? html`${unsafeHTML(topImagesPlaceHolder.innerHTML)}`
      : html`${collectionImages.map(
          (image) => html`
            <div
              class="collection-image-wrapper py-2"
              style="width: 100%; min-height: 100px;"
            >
              <a href=${image.imageTarget}
                ><img
                  class="w-100"
                  src=${image.imageUrl}
                  alt=${image.imageText}
              /></a>
            </div>
          `
        )}`}
  </div>`;
});

export default SidebarTopImages;
