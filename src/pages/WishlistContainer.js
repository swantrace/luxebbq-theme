/* eslint-disable no-nested-ternary */
import { html, useEffect, useState, component } from '@apollo-elements/haunted';
import { CompareTable, MegaMenu, setupStart } from '../shared/index';
// import axios from 'axios';
import { GET_PRODUCT_BY_HANDLE } from '../shared/helpers';
import WishlistItem from '../components/wishlist/WishlistItem';

function WishlistContainer({ emptyImage, emptySearchImage }) {
  const client = window.__APOLLO_CLIENT__;
  const productHandles = JSON.parse(
    window.localStorage.getItem('user_wishlist') ?? '[]'
  );
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('default'); // default | name | price | availability
  const [reverse, setReverse] = useState(false);
  const transformFunc = (rawProduct) => {
    let product = null;
    if (rawProduct) {
      // console.log('rawProduct', rawProduct);
      product = {
        id: atob(rawProduct.id).replace('gid://shopify/Product/', ''),
        handle: rawProduct.handle,
        availability:
          rawProduct.totalInventory > 0
            ? rawProduct.totalInventory
            : rawProduct.availableForSale
            ? 0
            : -1,
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
                >INSTOCK</span
              >`
            : rawProduct.availableForSale
            ? html`<span class="instock-lable"
                ><i class="fa fa-check-circle" aria-hidden="true"></i
                >PREORDER</span
              >`
            : html`<span class="outofstock-lable"
                ><i class="fa fa-ban" aria-hidden="true"></i>OUT OF STOCK</span
              >`,
        price: `$${rawProduct.variants.edges?.[0]?.node?.priceV2?.amount}`,
        variantId: atob(rawProduct?.variants?.edges?.[0]?.node?.id).replace(
          'gid://shopify/ProductVariant/',
          ''
        ),
        unformattedPrice: rawProduct.variants.edges?.[0]?.node?.priceV2?.amount,
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
        product.addToCartButtonText = html`Add to cart`;
      } else {
        product.addToCartButtonUrl = '';
        product.addToCartButtonText = 'Not available';
      }
    }
    return product;
  };

  useEffect(() => {
    const getProducts = async () => {
      const promiseArr = productHandles
        .filter((a) => a)
        .map((handle) =>
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
      // console.log('products', ps);
      setProducts(ps);
    };
    getProducts();
  }, []);

  const sorter = (a, b) => {
    switch (sortBy) {
      case 'name': {
        if (reverse) {
          return a.handle.localeCompare(b.handle);
        }
        return b.handle.localeCompare(a.handle);
      }
      case 'price': {
        if (reverse) {
          return Number(a.unformattedPrice) - Number(b.unformattedPrice);
        }
        return Number(b.unformattedPrice) - Number(a.unformattedPrice);
      }
      case 'availability': {
        if (reverse) {
          return Number(a.availability) - Number(b.availability);
        }
        return Number(b.availability) - Number(a.availability);
      }
      default:
        return 0;
    }
  };

  // console.log(products.sort(sorter));

  // const handleCheckoutButtonClicked = (e) => {
  //   e.preventDefault();
  //   const productElements = Array.from(
  //     this.querySelectorAll('[data-product-variant-id]')
  //   );
  //   if (productElements.length > 0) {
  //     axios
  //       .post('/cart/add', {
  //         items: productElements.map(() => {
  //           const variantId = e.getAttribute('data-product-variant-id');
  //           return {
  //             id: variantId,
  //             quantity: 1,
  //           };
  //         }),
  //       })
  //       .then(() => {
  //         window.location.href = '/checkout';
  //       });
  //   }
  // };

  const handleSorterChanged = (type) => {
    // console.log('type', type);
    if (sortBy === type) {
      setReverse((oldReverse) => !oldReverse);
    } else {
      setSortBy(type);
      setReverse(false);
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
                    <th scope="col">
                      Product Name
                      <i
                        class="icon-shangxiajiantou iconfont text-center"
                        @click=${() => handleSorterChanged('name')}
                      ></i>
                    </th>
                    <th scope="col">
                      Price
                      <i
                        class="icon-shangxiajiantou iconfont text-center"
                        @click=${() => handleSorterChanged('price')}
                      ></i>
                    </th>
                    <th scope="col">
                      Avalibility
                      <i
                        class="icon-shangxiajiantou iconfont text-center"
                        @click=${() => handleSorterChanged('availability')}
                      ></i>
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                ${products
                  .sort(sorter)
                  .map(
                    (product) =>
                      html`${WishlistItem({ product, productHandles })}`
                  )}
              </table>
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

[
  CompareTable,
  MegaMenu,
  {
    tagName: 'wishlist-container',
    renderer: WishlistContainer,
    options: {
      observedAttributes: ['empty-image', 'empty-search-image'],
      useShadowDOM: false,
    },
  },
].forEach((pComponent) => {
  customElements.define(
    pComponent.tagName,
    component(pComponent.renderer, pComponent.options),
    pComponent?.elementOptions
  );
});

setupStart();
