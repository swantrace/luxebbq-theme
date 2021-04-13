import { html } from '@apollo-elements/haunted';
import RelatedProducts from '../components/productPage/RelatedProducts';
import Specifications from '../components/productPage/Specifications';

function ProductPage({ productHandle }) {
  console.log(productHandle);
  return html`<section
      class="specifications-wrapper section-b-space ratio_square product-specifications"
    >
      ${Specifications()}
    </section>
    <section
      class="related-products-wrapper section-b-space ratio_square product-related equal_height"
    >
      ${RelatedProducts()}
    </section>`;
}

export default {
  tagName: 'product-page',
  renderer: ProductPage,
  options: {
    observedAttributes: ['product-handle'],
    useShadowDOM: false,
  },
};
