import { html, virtual } from '@apollo-elements/haunted';

const ProductItem = virtual(
  ({ product }) =>
    html`<div class="product-box qurox-feature-product p-md-3 mt-2">
      <div class="img-block">
        <div class="img-effect">
          <div class="lable-wrapper"></div>
          ${product?.images?.[0]
            ? html`
                <div class="front">
                  <a href=${`/products/${product.handle}`}>
                    <img
                      src=${product?.images?.[0]?.imageTransformedSrc}
                      class="blur-up img-fluid w-100 lazyload"
                      alt=${product?.images?.[0]?.imageAltText ?? product.title}
                    />
                  </a>
                </div>
              `
            : html`<div class="front">
                <a href=${`/products/${product.handle}`}>
                  <img
                    src="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_340x340.gif"
                    class="blur-up img-fluid w-100 lazyload"
                    alt=${product.title}
                  />
                </a>
              </div>`}
          ${product?.images?.[1]
            ? html`<div class="back">
                <a href=${`/products/${product.handle}`}>
                  <img
                    data-src=${product?.images?.[1]?.imageTransformedSrc ??
                    '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_340x340.gif'}
                    class="blur-up  img-fluid  w-100 lazyload"
                    alt="Weber igrill 3"
                  />
                </a>
              </div>`
            : null}
        </div>
        <div class="cart-info">
          <a
            class="action--shopping tile-actions--btn flex shopping-btn"
            href=${`/products/${product.handle}`}
          >
            <i class="ti-shopping-cart"></i>
          </a>
          <a
            class="action--wishlist tile-actions--btn flex wishlist-btn"
            href="javascript:void(0)"
            data-product-handle=${product.handle}
          >
            <i
              class="icon-heart-outline iconfont btn--main"
              aria-hidden="true"
            ></i>
          </a>
          <a
            href="#"
            data-placement="top"
            data-pid=${product.handle}
            class="compare"
            data-original-title="Compare"
            ><i class="iconfont icon-balance" aria-hidden="true"></i
          ></a>
        </div>
      </div>
      <div class="product-detail">
        <a href=${`/products/${product.handle}`}>
          <h6 itemprop="name">${product.title}</h6>
        </a>
        <h4 data-id="6592390725789" data-price=${product.minVariantPrice}>
          $${product.minVariantPrice}
        </h4>
      </div>
    </div>`
);

export default ProductItem;
