/* eslint-disable no-nested-ternary */
import { html, useEffect, useState } from '@apollo-elements/haunted';
import axios from 'axios';
import { GET_PRODUCT_BY_HANDLE } from '../../helpers';
import WishlistItem from './WishlistItem';

function WishlistContainer({ emptyImage, emptySearchImage }) {
  const client = window.__APOLLO_CLIENT__;
  const productHandles = JSON.parse(
    window.localStorage.getItem('user_wishlist') ?? '[]'
  );
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const transformFunc = (rawProduct) => {
    let product = null;
    if (rawProduct) {
      console.log('rawProduct', rawProduct);
      product = {
        id: atob(rawProduct.id).replace('gid://shopify/Product/', ''),
        handle: rawProduct.handle,
        url: rawProduct.onlineStoreUrl
          ? rawProduct.onlineStoreUrl
          : `/products/${rawProduct.handle}`,
        featuredImageUrl:
          rawProduct.variants.edges?.[0]?.node?.image?.transformedSrc ??
          emptyImage,
        title: rawProduct.title,
        stockInfo:
          rawProduct.totalInventory > 0
            ? html`<span class="instock-lable"
                ><i class="fa fa-check-circle" aria-hidden="true"></i
                >Instock</span
              >`
            : html`<span class="outofstock-lable">Out of stock</span>`,
        price: `$${rawProduct.variants.edges?.[0]?.node?.priceV2?.amount}`,
        variantId: atob(rawProduct?.variants?.edges?.[0]?.node?.id).replace(
          'gid://shopify/ProductVariant/',
          ''
        ),
      };
      if ((rawProduct?.variants?.edges?.length ?? 0) > 1) {
        product.addToCartButtonUrl = rawProduct.onlineStoreUrl
          ? rawProduct.onlineStoreUrl
          : `/products/${rawProduct.handle}`;
        product.addToCartButtonText = html`Select options &nbsp;&nbsp;&nbsp;>>`;
      } else if (rawProduct?.variants?.edges?.[0]?.node?.availableForSale) {
        product.addToCartButtonUrl = `/cart/add?id=${product.variantId.replace(
          'gid://shopify/Product/',
          ''
        )}&quantity=1`;
        product.addToCartButtonText = html`Add to cart &nbsp;&nbsp;&nbsp;>>`;
      } else {
        product.addToCartButtonUrl = '';
        product.addToCartButtonText = 'Not available';
      }
    }
    return product;
  };

  useEffect(() => {
    const getProducts = async () => {
      const promiseArr = productHandles.map((handle) =>
        client
          .query({
            query: GET_PRODUCT_BY_HANDLE,
            variables: {
              handle,
            },
          })
          .then(({ data: { productByHandle: rawProduct } }) =>
            transformFunc(rawProduct)
          )
      );
      setIsLoading(true);
      const ps = await Promise.all(promiseArr);
      setIsLoading(false);
      console.log('products', ps);
      setProducts(ps);
    };
    getProducts();
  }, []);

  const handleCheckoutButtonClicked = (e) => {
    e.preventDefault();
    const productElements = Array.from(
      this.querySelectorAll('[data-product-variant-id]')
    );
    if (productElements.length > 0) {
      axios
        .post('/cart/add', {
          items: productElements.map(() => {
            const variantId = e.getAttribute('data-product-variant-id');
            return {
              id: variantId,
              quantity: 1,
            };
          }),
        })
        .then(() => {
          window.location.href = '/checkout';
        });
    }
  };

  return html`<div class="row pt-5">
      ${!isLoading && products.length > 0
        ? html`<div class="col-sm-12 wishlist-grid flex">
            <div class="wishlist-grid flex">
              <table
                class="table cart-table table-responsive-xs wishlist_table wishlist-grid"
              >
                <thead>
                  <tr class="table-head">
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Avalibility</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                ${products.map(
                  (product) =>
                    html`${WishlistItem({ product, productHandles })}`
                )}
              </table>
            </div>
            <div class="text-right mt-5 checkout wishlist-grid ">
              <button
                @click=${handleCheckoutButtonClicked}
                class="btn btn-solid"
              >
                Check out
              </button>
            </div>
          </div>`
        : null}
    </div>
    ${!isLoading && products.length === 0
      ? html`<div class="row cart-buttons wishlist-grid--empty-list">
          <div class="col-12">
            <div class="text-center">
              <img class="" src=${emptySearchImage} alt="Wishlist loading" />
              <h5 class="title-font mb-3 empty-list--text ">
                Your wish list is currently empty.
              </h5>
              <a href="/collections/Barbeques" class="btn btn-solid"
                >Start Shopping</a
              >
            </div>
          </div>
        </div>`
      : null}
    ${isLoading
      ? html` <div class="wishlist-loader">
          <h5 class="wishlist-loader--text">
            Loading your customized wishlist...
          </h5>
        </div>`
      : null}`;
}

export default {
  tagName: 'wishlist-container',
  renderer: WishlistContainer,
  options: {
    observedAttributes: ['empty-image', 'empty-search-image'],
    useShadowDOM: false,
  },
};
