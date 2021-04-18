import { html, useEffect, virtual } from '@apollo-elements/haunted';
import ProductItem from '../common/ProductItem';
import ProductListLoading from '../common/ProductListLoading';
import TitleBanner from '../common/TitleBanner';

const RelatedProducts = virtual(({ relatedProducts, fetchIsFinished }) => {
  useEffect(() => {
    if (fetchIsFinished) {
      if (window.Wishlist && window.Wishlist.init) {
        window.Wishlist.init();
      }
    }
  }, [relatedProducts]);
  return html`<div class="container">
    <div class="row">
      <div class="col">
        ${TitleBanner({ title: 'RELATED PRODUCTS' })}
        ${fetchIsFinished
          ? html` <div
              class="slick_carousel product-m"
              data-slick='{"slidesToShow": 4,"slidesToScroll": 1, "autoplay": false, "autoplaySpeed": 1000, "infinite": false, "arrows": true,"dots": false, "responsive":[{"breakpoint": 1367,"settings":{"slidesToShow": 4 }},{"breakpoint": 1024,"settings":{"slidesToShow": 4 }},{"breakpoint": 767,"settings":{"slidesToShow": 2 }},{"breakpoint": 577,"settings":{"slidesToShow": 1 }} ]}'
            >
              ${relatedProducts.map(
                (product) =>
                  html`${ProductItem({
                    product,
                    itemClassList: { grid: 'col-lg-3 col-md-6 col-grid-box' },
                  })}`
              )}
            </div>`
          : html`${ProductListLoading()}`}
      </div>
    </div>
  </div>`;
});

export default RelatedProducts;
