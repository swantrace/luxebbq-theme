/* eslint-disable no-nested-ternary */
import { html, useEffect, virtual } from '@apollo-elements/haunted';

const WishlistItem = virtual(({ product, productHandles }) => {
  useEffect(() => {
    if (typeof window.$ === 'function' && product && product.id) {
      window.addEventListener(
        'mouseenter',
        (e) => {
          if (e?.target?.closest('.share-button')) {
            console.log(e);
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
          }
        },
        true
      );
      window.addEventListener(
        'mouseout',
        (e) => {
          if (e?.target?.closest('.share-button')) {
            console.log(e);
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
          }
        },
        true
      );
      window.addEventListener(
        'mouseover',
        (e) => {
          if (e?.target?.closest('.share-button')) {
            console.log(e);
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
          }
        },
        true
      );
    }
    window.$(`#share-button-${product.id}`).tooltip({
      html: true,
      title: () => `<div class="social-icons">
          <a
            class="social-link"
            href="//www.facebook.com/sharer.php?u={{ shop.url }}"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M16.913 13.919h-2.17v7.907h-3.215V13.92H10v-2.794h1.528V9.316c0-1.294.601-3.316 3.245-3.316l2.38.01V8.72h-1.728c-.282 0-.68.145-.68.762v1.642h2.449l-.281 2.794z"
              />
            </svg>
          </a>
          <a
            class="social-link"
            href="//twitter.com/share?text={{ shop.name | url_param_escape }}&amp;url={{ shop.url }}"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M20.218 9.925a3.083 3.083 0 0 0 1.351-1.7 6.156 6.156 0 0 1-1.952.746 3.074 3.074 0 0 0-5.238 2.804 8.727 8.727 0 0 1-6.336-3.212 3.073 3.073 0 0 0 .951 4.104 3.062 3.062 0 0 1-1.392-.385v.039c0 1.49 1.06 2.732 2.466 3.014a3.078 3.078 0 0 1-1.389.053 3.077 3.077 0 0 0 2.872 2.135A6.168 6.168 0 0 1 7 18.795a8.7 8.7 0 0 0 4.712 1.382c5.654 0 8.746-4.685 8.746-8.747 0-.133-.003-.265-.009-.397a6.248 6.248 0 0 0 1.534-1.592 6.146 6.146 0 0 1-1.765.484z"
              />
            </svg>
          </a>
          <a
            class="social-link"
            href="http://pinterest.com/pin/create/button/?url={{ shop.url }}&description={{ shop.name | url_param_escape }}"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.914 6a7.913 7.913 0 0 0-2.885 15.281c-.07-.626-.132-1.586.028-2.27.144-.618.928-3.933.928-3.933s-.238-.475-.238-1.175c0-1.098.64-1.922 1.433-1.922.675 0 1 .507 1 1.115 0 .68-.43 1.694-.654 2.634-.188.789.395 1.43 1.172 1.43 1.405 0 2.487-1.482 2.487-3.622 0-1.894-1.361-3.219-3.306-3.219-2.251 0-3.571 1.689-3.571 3.434 0 .68.26 1.409.587 1.805.065.08.074.149.056.228-.06.25-.194.787-.22.897-.035.144-.114.176-.266.106-.987-.46-1.606-1.905-1.606-3.066 0-2.497 1.814-4.787 5.23-4.787 2.744 0 4.878 1.955 4.878 4.57 0 2.726-1.72 4.922-4.108 4.922-.801 0-1.555-.418-1.813-.91l-.495 1.88c-.178.688-.66 1.55-.983 2.075a7.914 7.914 0 0 0 10.258-7.56 7.914 7.914 0 0 0-7.913-7.912V6z"
              />
            </svg>
          </a>
        </div>`,
    });
  }, [product]);
  return html`${product
    ? html` <tbody
        class="product-tile-container wishlist-tile-container"
        data-product-id=${product.id}
        data-product-handle=${product.handle}
        data-product-variant-id=${product.variantId}
      >
        <tr>
          <td>
            <a href=${product.url}
              ><img
                class="image--main"
                src=${product.featuredImageUrl}
                alt=${product.title}
            /></a>
          </td>
          <td>
            <a href=${product.url}>
              <h4>${product.title}</h4>
            </a>
            <div class="mobile-cart-content row">
              <div class="col-xs-3">
                <p>${product.stockInfo}</p>
              </div>
              <div class="col-xs-3">
                <h2 class="td-color">${product.price}</h2>
              </div>
              <div class="col-xs-3">
                <h2 class="td-color product-tile--tile-actions">
                  <a
                    class="action--wishlist tile-actions--btn flex wishlist-btn hidden"
                    href="javascript:void(0)"
                    data-product-handle=${product.handle}
                  >
                    <i class="ti-heart btn--main" aria-hidden="true"></i>
                  </a>
                  <a
                    href=${product.addToCartButtonUrl}
                    class="icon mr-1 action--quick-cart tile-actions--btn flex cart-btn"
                  >
                    <i class="ti-close"></i>
                  </a>
                </h2>
              </div>
            </div>
          </td>
          <td>
            <h2 class="td-color">${product.price}</h2>
          </td>
          <td>
            <p>${product.stockInfo}</p>
          </td>
          <td>
            <a href=${product.addToCartButtonUrl} class="btn btn-solid">
              ${product.addToCartButtonText}
            </a>
            <div class="share-buttons py-3 d-flex flex-column">
              <div class="product-icon">
                <div class="share-btn">
                  <a
                    class="action--wishlist tile-actions--btn flex "
                    href="javascript:void(0)"
                  >
                    <i
                      class="ti-sharethis btn--main pl-0 ml-0"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <span
                    class="title-font share-button"
                    id=${`share-button-${product.id}`}
                    @click=${() => {
                      console.log(`#share-button-${product.id}`);
                      window.$(`#share-button-${product.id}`).tooltip('toggle');
                    }}
                  >
                    Share
                  </span>
                </div>
              </div>
              <div class="product-icon">
                <div class="compare-btn">
                  <a
                    class="action--wishlist tile-actions--btn flex"
                    href="javascript:void(0)"
                    data-product-handle=${product.handle}
                  >
                    <i
                      class="fa fa-balance-scale btn--main"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <span class="title-font compare" data-pid=${product.handle}>
                    Compare
                  </span>
                </div>
              </div>
              <div class="product-icon">
                <div class="remove-btn">
                  <a
                    class="action--wishlist tile-actions--btn flex"
                    href="#"
                    data-product-handle=${product.handle}
                  >
                    <i class="fa fa-times btn--main" aria-hidden="true"></i>
                  </a>
                  <span
                    class="title-font"
                    style=""
                    @click=${(e) => {
                      const tbodyElement = e.target.closest('tbody');
                      const updatedProductHandles = productHandles.filter(
                        (handle) => handle !== product.handle
                      );
                      window.localStorage.setItem(
                        'user_wishlist',
                        JSON.stringify(updatedProductHandles)
                      );
                      tbodyElement.remove();
                    }}
                    >Remove</span
                  >
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>`
    : null} `;
});

export default WishlistItem;
