import{F as T,f as s,g as f,i as o,l as C,n as S,r as _}from"./chunk-NCQMUVAP.js";var k=S(({product:e,productHandles:r})=>(f(()=>{typeof window.$=="function"&&e&&e.id&&(window.addEventListener("mouseenter",i=>{i?.target?.closest(".share-button")&&(i.preventDefault(),i.stopImmediatePropagation(),i.stopPropagation())},!0),window.addEventListener("mouseout",i=>{i?.target?.closest(".share-button")&&(i.preventDefault(),i.stopImmediatePropagation(),i.stopPropagation())},!0),window.addEventListener("mouseover",i=>{i?.target?.closest(".share-button")&&(i.preventDefault(),i.stopImmediatePropagation(),i.stopPropagation())},!0)),window.$(`#share-button-${e.id}`).tooltip({html:!0,title:()=>`<div class="social-icons">
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
        </div>`})},[e]),s`${e?s` <tbody
        class="product-tile-container wishlist-tile-container"
        data-product-id=${e.id}
        data-product-handle=${e.handle}
        data-product-variant-id=${e.variantId}
      >
        <tr>
          <td>
            <a href=${e.url}
              ><img
                class="image--main"
                src=${e.featuredImageUrl}
                alt=${e.title}
            /></a>
          </td>
          <td>
            <a href=${e.url}>
              <h4>${e.title}</h4>
            </a>
            <div class="mobile-cart-content row">
              <div class="col-xs-3">
                <p>${e.stockInfo}</p>
              </div>
              <div class="col-xs-3">
                <h2 class="td-color">${e.price}</h2>
              </div>
              <div class="col-xs-3">
                <h2 class="td-color product-tile--tile-actions">
                  <a
                    class="action--wishlist tile-actions--btn flex wishlist-btn hidden"
                    href="javascript:void(0)"
                    data-product-handle=${e.handle}
                  >
                    <i class="ti-heart btn--main" aria-hidden="true"></i>
                  </a>
                  <a
                    href=${e.addToCartButtonUrl}
                    class="icon mr-1 action--quick-cart tile-actions--btn flex cart-btn"
                  >
                    <i class="ti-close"></i>
                  </a>
                </h2>
              </div>
            </div>
          </td>
          <td>
            <h2 class="td-color">${e.price}</h2>
          </td>
          <td>
            <p>${e.stockInfo}</p>
          </td>
          <td>
            <a href=${e.addToCartButtonUrl} class="btn btn-solid">
              ${e.addToCartButtonText}
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
                    id=${`share-button-${e.id}`}
                    @click=${()=>{window.$(`#share-button-${e.id}`).tooltip("toggle")}}
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
                    data-product-handle=${e.handle}
                  >
                    <i
                      class="fa fa-balance-scale btn--main"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <span class="title-font compare" data-pid=${e.handle}>
                    Compare
                  </span>
                </div>
              </div>
              <div class="product-icon">
                <div class="remove-btn">
                  <a
                    class="action--wishlist tile-actions--btn flex"
                    href="#"
                    data-product-handle=${e.handle}
                  >
                    <i class="fa fa-times btn--main" aria-hidden="true"></i>
                  </a>
                  <span
                    class="title-font"
                    style=""
                    @click=${i=>{let n=i.target.closest("tbody"),l=r.filter(c=>c!==e.handle);window.localStorage.setItem("user_wishlist",JSON.stringify(l)),n.remove()}}
                    >Remove</span
                  >
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>`:null} `)),b=k;function B({emptyImage:e,emptySearchImage:r}){let i=window.__APOLLO_CLIENT__,n=JSON.parse(window.localStorage.getItem("user_wishlist")??"[]"),[l,c]=o([]),[d,m]=o(!1),[u,g]=o("default"),[h,v]=o(!1),w=t=>{let a=null;return t&&(a={id:atob(t.id).replace("gid://shopify/Product/",""),handle:t.handle,availability:t.totalInventory>0?t.totalInventory:t.availableForSale?0:-1,url:t.onlineStoreUrl?t.onlineStoreUrl:`/products/${t.handle}`,featuredImageUrl:t.variants.edges?.[0]?.node?.image?.transformedSrc??e,title:t.title,stockInfo:t.totalInventory>0?s`<span class="instock-lable"
                ><i class="fa fa-check-circle" aria-hidden="true"></i
                >INSTOCK</span
              >`:t.availableForSale?s`<span class="instock-lable"
                ><i class="fa fa-check-circle" aria-hidden="true"></i
                >PREORDER</span
              >`:s`<span class="outofstock-lable"
                ><i class="fa fa-ban" aria-hidden="true"></i>OUT OF STOCK</span
              >`,price:`$${t.variants.edges?.[0]?.node?.priceV2?.amount}`,variantId:atob(t?.variants?.edges?.[0]?.node?.id).replace("gid://shopify/ProductVariant/",""),unformattedPrice:t.variants.edges?.[0]?.node?.priceV2?.amount},(t?.variants?.edges?.length??0)>1?(a.addToCartButtonUrl=t.onlineStoreUrl?t.onlineStoreUrl:`/products/${t.handle}`,a.addToCartButtonText=s`Select options &nbsp;&nbsp;&nbsp;>>`):t?.variants?.edges?.[0]?.node?.availableForSale?(a.addToCartButtonUrl=`/cart/add?id=${a.variantId.replace("gid://shopify/Product/","")}&quantity=1`,a.addToCartButtonText=s`Add to cart &nbsp;&nbsp;&nbsp;>>`):(a.addToCartButtonUrl="",a.addToCartButtonText="Not available")),a};f(()=>{(async()=>{let a=n.map(y=>i.query({query:_,variables:{handle:y}}).then(({data:{productByHandle:I}})=>w(I)));m(!0);let x=await Promise.all(a);m(!1),c(x)})()},[]);let $=(t,a)=>{switch(u){case"name":return h?t.handle.localeCompare(a.handle):a.handle.localeCompare(t.handle);case"price":return h?Number(t.unformattedPrice)-Number(a.unformattedPrice):Number(a.unformattedPrice)-Number(t.unformattedPrice);case"availability":return h?Number(t.availability)-Number(a.availability):Number(a.availability)-Number(t.availability);default:return 0}},p=t=>{u===t?v(a=>!a):(g(t),v(!1))};return s`<div class="row pt-5">
      ${!d&&l.length>0?s`<div class="col-sm-12 wishlist-grid flex">
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
                        @click=${()=>p("name")}
                      ></i>
                    </th>
                    <th scope="col">
                      Price
                      <i
                        class="icon-shangxiajiantou iconfont text-center"
                        @click=${()=>p("price")}
                      ></i>
                    </th>
                    <th scope="col">
                      Avalibility
                      <i
                        class="icon-shangxiajiantou iconfont text-center"
                        @click=${()=>p("availability")}
                      ></i>
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                ${l.sort($).map(t=>s`${b({product:t,productHandles:n})}`)}
              </table>
            </div>
          </div>`:null}
    </div>
    ${!d&&l.length===0?s`<div class="row cart-buttons wishlist-grid--empty-list">
          <div class="col-12">
            <div class="text-center">
              <img class="" src=${r} alt="Wishlist loading" />
              <h5 class="title-font mb-3 empty-list--text ">
                Your wish list is currently empty.
              </h5>
              <a href="/collections/Barbeques" class="btn btn-solid"
                >Start Shopping</a
              >
            </div>
          </div>
        </div>`:null}
    ${d?s` <div class="wishlist-loader">
          <h5 class="wishlist-loader--text">
            Loading your customized wishlist...
          </h5>
        </div>`:null}`}[T,{tagName:"wishlist-container",renderer:B,options:{observedAttributes:["empty-image","empty-search-image"],useShadowDOM:!1}}].forEach(e=>{customElements.define(e.tagName,C(e.renderer,e.options))});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbXBvbmVudHMvd2lzaGxpc3QvV2lzaGxpc3RJdGVtLmpzIiwgIi4uL3NyYy9wYWdlcy9XaXNobGlzdENvbnRhaW5lci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmltcG9ydCB7IGh0bWwsIHVzZUVmZmVjdCwgdmlydHVhbCB9IGZyb20gJ0BhcG9sbG8tZWxlbWVudHMvaGF1bnRlZCc7XG5cbmNvbnN0IFdpc2hsaXN0SXRlbSA9IHZpcnR1YWwoKHsgcHJvZHVjdCwgcHJvZHVjdEhhbmRsZXMgfSkgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93LiQgPT09ICdmdW5jdGlvbicgJiYgcHJvZHVjdCAmJiBwcm9kdWN0LmlkKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGlmIChlPy50YXJnZXQ/LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ21vdXNlb3V0JyxcbiAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZT8udGFyZ2V0Py5jbG9zZXN0KCcuc2hhcmUtYnV0dG9uJykpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cnVlXG4gICAgICApO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdtb3VzZW92ZXInLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGlmIChlPy50YXJnZXQ/LmNsb3Nlc3QoJy5zaGFyZS1idXR0b24nKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfVxuICAgIHdpbmRvdy4kKGAjc2hhcmUtYnV0dG9uLSR7cHJvZHVjdC5pZH1gKS50b29sdGlwKHtcbiAgICAgIGh0bWw6IHRydWUsXG4gICAgICB0aXRsZTogKCkgPT4gYDxkaXYgY2xhc3M9XCJzb2NpYWwtaWNvbnNcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3M9XCJzb2NpYWwtbGlua1wiXG4gICAgICAgICAgICBocmVmPVwiLy93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dT17eyBzaG9wLnVybCB9fVwiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICAgIHdpZHRoPVwiMjhcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyOFwiXG4gICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjggMjhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgIGQ9XCJNMTYuOTEzIDEzLjkxOWgtMi4xN3Y3LjkwN2gtMy4yMTVWMTMuOTJIMTB2LTIuNzk0aDEuNTI4VjkuMzE2YzAtMS4yOTQuNjAxLTMuMzE2IDMuMjQ1LTMuMzE2bDIuMzguMDFWOC43MmgtMS43MjhjLS4yODIgMC0uNjguMTQ1LS42OC43NjJ2MS42NDJoMi40NDlsLS4yODEgMi43OTR6XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3M9XCJzb2NpYWwtbGlua1wiXG4gICAgICAgICAgICBocmVmPVwiLy90d2l0dGVyLmNvbS9zaGFyZT90ZXh0PXt7IHNob3AubmFtZSB8IHVybF9wYXJhbV9lc2NhcGUgfX0mYW1wO3VybD17eyBzaG9wLnVybCB9fVwiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICAgIHdpZHRoPVwiMjhcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIyOFwiXG4gICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjggMjhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgIGQ9XCJNMjAuMjE4IDkuOTI1YTMuMDgzIDMuMDgzIDAgMCAwIDEuMzUxLTEuNyA2LjE1NiA2LjE1NiAwIDAgMS0xLjk1Mi43NDYgMy4wNzQgMy4wNzQgMCAwIDAtNS4yMzggMi44MDQgOC43MjcgOC43MjcgMCAwIDEtNi4zMzYtMy4yMTIgMy4wNzMgMy4wNzMgMCAwIDAgLjk1MSA0LjEwNCAzLjA2MiAzLjA2MiAwIDAgMS0xLjM5Mi0uMzg1di4wMzljMCAxLjQ5IDEuMDYgMi43MzIgMi40NjYgMy4wMTRhMy4wNzggMy4wNzggMCAwIDEtMS4zODkuMDUzIDMuMDc3IDMuMDc3IDAgMCAwIDIuODcyIDIuMTM1QTYuMTY4IDYuMTY4IDAgMCAxIDcgMTguNzk1YTguNyA4LjcgMCAwIDAgNC43MTIgMS4zODJjNS42NTQgMCA4Ljc0Ni00LjY4NSA4Ljc0Ni04Ljc0NyAwLS4xMzMtLjAwMy0uMjY1LS4wMDktLjM5N2E2LjI0OCA2LjI0OCAwIDAgMCAxLjUzNC0xLjU5MiA2LjE0NiA2LjE0NiAwIDAgMS0xLjc2NS40ODR6XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3M9XCJzb2NpYWwtbGlua1wiXG4gICAgICAgICAgICBocmVmPVwiaHR0cDovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD17eyBzaG9wLnVybCB9fSZkZXNjcmlwdGlvbj17eyBzaG9wLm5hbWUgfCB1cmxfcGFyYW1fZXNjYXBlIH19XCJcbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIyOFwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjI4XCJcbiAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyOCAyOFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgICAgZD1cIk0xMy45MTQgNmE3LjkxMyA3LjkxMyAwIDAgMC0yLjg4NSAxNS4yODFjLS4wNy0uNjI2LS4xMzItMS41ODYuMDI4LTIuMjcuMTQ0LS42MTguOTI4LTMuOTMzLjkyOC0zLjkzM3MtLjIzOC0uNDc1LS4yMzgtMS4xNzVjMC0xLjA5OC42NC0xLjkyMiAxLjQzMy0xLjkyMi42NzUgMCAxIC41MDcgMSAxLjExNSAwIC42OC0uNDMgMS42OTQtLjY1NCAyLjYzNC0uMTg4Ljc4OS4zOTUgMS40MyAxLjE3MiAxLjQzIDEuNDA1IDAgMi40ODctMS40ODIgMi40ODctMy42MjIgMC0xLjg5NC0xLjM2MS0zLjIxOS0zLjMwNi0zLjIxOS0yLjI1MSAwLTMuNTcxIDEuNjg5LTMuNTcxIDMuNDM0IDAgLjY4LjI2IDEuNDA5LjU4NyAxLjgwNS4wNjUuMDguMDc0LjE0OS4wNTYuMjI4LS4wNi4yNS0uMTk0Ljc4Ny0uMjIuODk3LS4wMzUuMTQ0LS4xMTQuMTc2LS4yNjYuMTA2LS45ODctLjQ2LTEuNjA2LTEuOTA1LTEuNjA2LTMuMDY2IDAtMi40OTcgMS44MTQtNC43ODcgNS4yMy00Ljc4NyAyLjc0NCAwIDQuODc4IDEuOTU1IDQuODc4IDQuNTcgMCAyLjcyNi0xLjcyIDQuOTIyLTQuMTA4IDQuOTIyLS44MDEgMC0xLjU1NS0uNDE4LTEuODEzLS45MWwtLjQ5NSAxLjg4Yy0uMTc4LjY4OC0uNjYgMS41NS0uOTgzIDIuMDc1YTcuOTE0IDcuOTE0IDAgMCAwIDEwLjI1OC03LjU2IDcuOTE0IDcuOTE0IDAgMCAwLTcuOTEzLTcuOTEyVjZ6XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+YCxcbiAgICB9KTtcbiAgfSwgW3Byb2R1Y3RdKTtcbiAgcmV0dXJuIGh0bWxgJHtwcm9kdWN0XG4gICAgPyBodG1sYCA8dGJvZHlcbiAgICAgICAgY2xhc3M9XCJwcm9kdWN0LXRpbGUtY29udGFpbmVyIHdpc2hsaXN0LXRpbGUtY29udGFpbmVyXCJcbiAgICAgICAgZGF0YS1wcm9kdWN0LWlkPSR7cHJvZHVjdC5pZH1cbiAgICAgICAgZGF0YS1wcm9kdWN0LWhhbmRsZT0ke3Byb2R1Y3QuaGFuZGxlfVxuICAgICAgICBkYXRhLXByb2R1Y3QtdmFyaWFudC1pZD0ke3Byb2R1Y3QudmFyaWFudElkfVxuICAgICAgPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRkPlxuICAgICAgICAgICAgPGEgaHJlZj0ke3Byb2R1Y3QudXJsfVxuICAgICAgICAgICAgICA+PGltZ1xuICAgICAgICAgICAgICAgIGNsYXNzPVwiaW1hZ2UtLW1haW5cIlxuICAgICAgICAgICAgICAgIHNyYz0ke3Byb2R1Y3QuZmVhdHVyZWRJbWFnZVVybH1cbiAgICAgICAgICAgICAgICBhbHQ9JHtwcm9kdWN0LnRpdGxlfVxuICAgICAgICAgICAgLz48L2E+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICA8YSBocmVmPSR7cHJvZHVjdC51cmx9PlxuICAgICAgICAgICAgICA8aDQ+JHtwcm9kdWN0LnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9iaWxlLWNhcnQtY29udGVudCByb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zXCI+XG4gICAgICAgICAgICAgICAgPHA+JHtwcm9kdWN0LnN0b2NrSW5mb308L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTNcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0ZC1jb2xvclwiPiR7cHJvZHVjdC5wcmljZX08L2gyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0zXCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGQtY29sb3IgcHJvZHVjdC10aWxlLS10aWxlLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYWN0aW9uLS13aXNobGlzdCB0aWxlLWFjdGlvbnMtLWJ0biBmbGV4IHdpc2hsaXN0LWJ0biBoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1wcm9kdWN0LWhhbmRsZT0ke3Byb2R1Y3QuaGFuZGxlfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInRpLWhlYXJ0IGJ0bi0tbWFpblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9JHtwcm9kdWN0LmFkZFRvQ2FydEJ1dHRvblVybH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpY29uIG1yLTEgYWN0aW9uLS1xdWljay1jYXJ0IHRpbGUtYWN0aW9ucy0tYnRuIGZsZXggY2FydC1idG5cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInRpLWNsb3NlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJ0ZC1jb2xvclwiPiR7cHJvZHVjdC5wcmljZX08L2gyPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkPlxuICAgICAgICAgICAgPHA+JHtwcm9kdWN0LnN0b2NrSW5mb308L3A+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICA8YSBocmVmPSR7cHJvZHVjdC5hZGRUb0NhcnRCdXR0b25Vcmx9IGNsYXNzPVwiYnRuIGJ0bi1zb2xpZFwiPlxuICAgICAgICAgICAgICAke3Byb2R1Y3QuYWRkVG9DYXJ0QnV0dG9uVGV4dH1cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaGFyZS1idXR0b25zIHB5LTMgZC1mbGV4IGZsZXgtY29sdW1uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWljb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hhcmUtYnRuXCI+XG4gICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImFjdGlvbi0td2lzaGxpc3QgdGlsZS1hY3Rpb25zLS1idG4gZmxleCBcIlxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGlcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRpLXNoYXJldGhpcyBidG4tLW1haW4gcGwtMCBtbC0wXCJcbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICA+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0aXRsZS1mb250IHNoYXJlLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGlkPSR7YHNoYXJlLWJ1dHRvbi0ke3Byb2R1Y3QuaWR9YH1cbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPSR7KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAjc2hhcmUtYnV0dG9uLSR7cHJvZHVjdC5pZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuJChgI3NoYXJlLWJ1dHRvbi0ke3Byb2R1Y3QuaWR9YCkudG9vbHRpcCgndG9nZ2xlJyk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFNoYXJlXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1pY29uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbXBhcmUtYnRuXCI+XG4gICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImFjdGlvbi0td2lzaGxpc3QgdGlsZS1hY3Rpb25zLS1idG4gZmxleFwiXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLXByb2R1Y3QtaGFuZGxlPSR7cHJvZHVjdC5oYW5kbGV9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxpXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmYSBmYS1iYWxhbmNlLXNjYWxlIGJ0bi0tbWFpblwiXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgPjwvaT5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGUtZm9udCBjb21wYXJlXCIgZGF0YS1waWQ9JHtwcm9kdWN0LmhhbmRsZX0+XG4gICAgICAgICAgICAgICAgICAgIENvbXBhcmVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWljb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVtb3ZlLWJ0blwiPlxuICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJhY3Rpb24tLXdpc2hsaXN0IHRpbGUtYWN0aW9ucy0tYnRuIGZsZXhcIlxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtcHJvZHVjdC1oYW5kbGU9JHtwcm9kdWN0LmhhbmRsZX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aW1lcyBidG4tLW1haW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRpdGxlLWZvbnRcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIlwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz0keyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGJvZHlFbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdCgndGJvZHknKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkUHJvZHVjdEhhbmRsZXMgPSBwcm9kdWN0SGFuZGxlcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAoaGFuZGxlKSA9PiBoYW5kbGUgIT09IHByb2R1Y3QuaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlcl93aXNobGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh1cGRhdGVkUHJvZHVjdEhhbmRsZXMpXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB0Ym9keUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5SZW1vdmU8L3NwYW5cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90Ym9keT5gXG4gICAgOiBudWxsfSBgO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFdpc2hsaXN0SXRlbTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXN0ZWQtdGVybmFyeSAqL1xuaW1wb3J0IHsgaHRtbCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgY29tcG9uZW50IH0gZnJvbSAnQGFwb2xsby1lbGVtZW50cy9oYXVudGVkJztcbmltcG9ydCB7IENvbXBhcmVUYWJsZSB9IGZyb20gJy4uL3NoYXJlZC9pbmRleCc7XG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgR0VUX1BST0RVQ1RfQllfSEFORExFIH0gZnJvbSAnLi4vc2hhcmVkL2hlbHBlcnMnO1xuaW1wb3J0IFdpc2hsaXN0SXRlbSBmcm9tICcuLi9jb21wb25lbnRzL3dpc2hsaXN0L1dpc2hsaXN0SXRlbSc7XG5cbmZ1bmN0aW9uIFdpc2hsaXN0Q29udGFpbmVyKHsgZW1wdHlJbWFnZSwgZW1wdHlTZWFyY2hJbWFnZSB9KSB7XG4gIGNvbnN0IGNsaWVudCA9IHdpbmRvdy5fX0FQT0xMT19DTElFTlRfXztcbiAgY29uc3QgcHJvZHVjdEhhbmRsZXMgPSBKU09OLnBhcnNlKFxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl93aXNobGlzdCcpID8/ICdbXSdcbiAgKTtcbiAgY29uc3QgW3Byb2R1Y3RzLCBzZXRQcm9kdWN0c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzb3J0QnksIHNldFNvcnRCeV0gPSB1c2VTdGF0ZSgnZGVmYXVsdCcpOyAvLyBkZWZhdWx0IHwgbmFtZSB8IHByaWNlIHwgYXZhaWxhYmlsaXR5XG4gIGNvbnN0IFtyZXZlcnNlLCBzZXRSZXZlcnNlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgdHJhbnNmb3JtRnVuYyA9IChyYXdQcm9kdWN0KSA9PiB7XG4gICAgbGV0IHByb2R1Y3QgPSBudWxsO1xuICAgIGlmIChyYXdQcm9kdWN0KSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygncmF3UHJvZHVjdCcsIHJhd1Byb2R1Y3QpO1xuICAgICAgcHJvZHVjdCA9IHtcbiAgICAgICAgaWQ6IGF0b2IocmF3UHJvZHVjdC5pZCkucmVwbGFjZSgnZ2lkOi8vc2hvcGlmeS9Qcm9kdWN0LycsICcnKSxcbiAgICAgICAgaGFuZGxlOiByYXdQcm9kdWN0LmhhbmRsZSxcbiAgICAgICAgYXZhaWxhYmlsaXR5OlxuICAgICAgICAgIHJhd1Byb2R1Y3QudG90YWxJbnZlbnRvcnkgPiAwXG4gICAgICAgICAgICA/IHJhd1Byb2R1Y3QudG90YWxJbnZlbnRvcnlcbiAgICAgICAgICAgIDogcmF3UHJvZHVjdC5hdmFpbGFibGVGb3JTYWxlXG4gICAgICAgICAgICA/IDBcbiAgICAgICAgICAgIDogLTEsXG4gICAgICAgIHVybDogcmF3UHJvZHVjdC5vbmxpbmVTdG9yZVVybFxuICAgICAgICAgID8gcmF3UHJvZHVjdC5vbmxpbmVTdG9yZVVybFxuICAgICAgICAgIDogYC9wcm9kdWN0cy8ke3Jhd1Byb2R1Y3QuaGFuZGxlfWAsXG4gICAgICAgIGZlYXR1cmVkSW1hZ2VVcmw6XG4gICAgICAgICAgcmF3UHJvZHVjdC52YXJpYW50cy5lZGdlcz8uWzBdPy5ub2RlPy5pbWFnZT8udHJhbnNmb3JtZWRTcmMgPz9cbiAgICAgICAgICBlbXB0eUltYWdlLFxuICAgICAgICB0aXRsZTogcmF3UHJvZHVjdC50aXRsZSxcbiAgICAgICAgc3RvY2tJbmZvOlxuICAgICAgICAgIHJhd1Byb2R1Y3QudG90YWxJbnZlbnRvcnkgPiAwXG4gICAgICAgICAgICA/IGh0bWxgPHNwYW4gY2xhc3M9XCJpbnN0b2NrLWxhYmxlXCJcbiAgICAgICAgICAgICAgICA+PGkgY2xhc3M9XCJmYSBmYS1jaGVjay1jaXJjbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2lcbiAgICAgICAgICAgICAgICA+SU5TVE9DSzwvc3BhblxuICAgICAgICAgICAgICA+YFxuICAgICAgICAgICAgOiByYXdQcm9kdWN0LmF2YWlsYWJsZUZvclNhbGVcbiAgICAgICAgICAgID8gaHRtbGA8c3BhbiBjbGFzcz1cImluc3RvY2stbGFibGVcIlxuICAgICAgICAgICAgICAgID48aSBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaVxuICAgICAgICAgICAgICAgID5QUkVPUkRFUjwvc3BhblxuICAgICAgICAgICAgICA+YFxuICAgICAgICAgICAgOiBodG1sYDxzcGFuIGNsYXNzPVwib3V0b2ZzdG9jay1sYWJsZVwiXG4gICAgICAgICAgICAgICAgPjxpIGNsYXNzPVwiZmEgZmEtYmFuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPk9VVCBPRiBTVE9DSzwvc3BhblxuICAgICAgICAgICAgICA+YCxcbiAgICAgICAgcHJpY2U6IGAkJHtyYXdQcm9kdWN0LnZhcmlhbnRzLmVkZ2VzPy5bMF0/Lm5vZGU/LnByaWNlVjI/LmFtb3VudH1gLFxuICAgICAgICB2YXJpYW50SWQ6IGF0b2IocmF3UHJvZHVjdD8udmFyaWFudHM/LmVkZ2VzPy5bMF0/Lm5vZGU/LmlkKS5yZXBsYWNlKFxuICAgICAgICAgICdnaWQ6Ly9zaG9waWZ5L1Byb2R1Y3RWYXJpYW50LycsXG4gICAgICAgICAgJydcbiAgICAgICAgKSxcbiAgICAgICAgdW5mb3JtYXR0ZWRQcmljZTogcmF3UHJvZHVjdC52YXJpYW50cy5lZGdlcz8uWzBdPy5ub2RlPy5wcmljZVYyPy5hbW91bnQsXG4gICAgICB9O1xuICAgICAgaWYgKChyYXdQcm9kdWN0Py52YXJpYW50cz8uZWRnZXM/Lmxlbmd0aCA/PyAwKSA+IDEpIHtcbiAgICAgICAgcHJvZHVjdC5hZGRUb0NhcnRCdXR0b25VcmwgPSByYXdQcm9kdWN0Lm9ubGluZVN0b3JlVXJsXG4gICAgICAgICAgPyByYXdQcm9kdWN0Lm9ubGluZVN0b3JlVXJsXG4gICAgICAgICAgOiBgL3Byb2R1Y3RzLyR7cmF3UHJvZHVjdC5oYW5kbGV9YDtcbiAgICAgICAgcHJvZHVjdC5hZGRUb0NhcnRCdXR0b25UZXh0ID0gaHRtbGBTZWxlY3Qgb3B0aW9ucyAmbmJzcDsmbmJzcDsmbmJzcDs+PmA7XG4gICAgICB9IGVsc2UgaWYgKHJhd1Byb2R1Y3Q/LnZhcmlhbnRzPy5lZGdlcz8uWzBdPy5ub2RlPy5hdmFpbGFibGVGb3JTYWxlKSB7XG4gICAgICAgIHByb2R1Y3QuYWRkVG9DYXJ0QnV0dG9uVXJsID0gYC9jYXJ0L2FkZD9pZD0ke3Byb2R1Y3QudmFyaWFudElkLnJlcGxhY2UoXG4gICAgICAgICAgJ2dpZDovL3Nob3BpZnkvUHJvZHVjdC8nLFxuICAgICAgICAgICcnXG4gICAgICAgICl9JnF1YW50aXR5PTFgO1xuICAgICAgICBwcm9kdWN0LmFkZFRvQ2FydEJ1dHRvblRleHQgPSBodG1sYEFkZCB0byBjYXJ0ICZuYnNwOyZuYnNwOyZuYnNwOz4+YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3QuYWRkVG9DYXJ0QnV0dG9uVXJsID0gJyc7XG4gICAgICAgIHByb2R1Y3QuYWRkVG9DYXJ0QnV0dG9uVGV4dCA9ICdOb3QgYXZhaWxhYmxlJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb2R1Y3Q7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBnZXRQcm9kdWN0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHByb21pc2VBcnIgPSBwcm9kdWN0SGFuZGxlcy5tYXAoKGhhbmRsZSkgPT5cbiAgICAgICAgY2xpZW50XG4gICAgICAgICAgLnF1ZXJ5KHtcbiAgICAgICAgICAgIHF1ZXJ5OiBHRVRfUFJPRFVDVF9CWV9IQU5ETEUsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgICAgaGFuZGxlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCh7IGRhdGE6IHsgcHJvZHVjdEJ5SGFuZGxlOiByYXdQcm9kdWN0IH0gfSkgPT5cbiAgICAgICAgICAgIHRyYW5zZm9ybUZ1bmMocmF3UHJvZHVjdClcbiAgICAgICAgICApXG4gICAgICApO1xuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgY29uc3QgcHMgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlQXJyKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygncHJvZHVjdHMnLCBwcyk7XG4gICAgICBzZXRQcm9kdWN0cyhwcyk7XG4gICAgfTtcbiAgICBnZXRQcm9kdWN0cygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc29ydGVyID0gKGEsIGIpID0+IHtcbiAgICBzd2l0Y2ggKHNvcnRCeSkge1xuICAgICAgY2FzZSAnbmFtZSc6IHtcbiAgICAgICAgaWYgKHJldmVyc2UpIHtcbiAgICAgICAgICByZXR1cm4gYS5oYW5kbGUubG9jYWxlQ29tcGFyZShiLmhhbmRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGIuaGFuZGxlLmxvY2FsZUNvbXBhcmUoYS5oYW5kbGUpO1xuICAgICAgfVxuICAgICAgY2FzZSAncHJpY2UnOiB7XG4gICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgcmV0dXJuIE51bWJlcihhLnVuZm9ybWF0dGVkUHJpY2UpIC0gTnVtYmVyKGIudW5mb3JtYXR0ZWRQcmljZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE51bWJlcihiLnVuZm9ybWF0dGVkUHJpY2UpIC0gTnVtYmVyKGEudW5mb3JtYXR0ZWRQcmljZSk7XG4gICAgICB9XG4gICAgICBjYXNlICdhdmFpbGFiaWxpdHknOiB7XG4gICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgcmV0dXJuIE51bWJlcihhLmF2YWlsYWJpbGl0eSkgLSBOdW1iZXIoYi5hdmFpbGFiaWxpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOdW1iZXIoYi5hdmFpbGFiaWxpdHkpIC0gTnVtYmVyKGEuYXZhaWxhYmlsaXR5KTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfTtcblxuICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0cy5zb3J0KHNvcnRlcikpO1xuXG4gIC8vIGNvbnN0IGhhbmRsZUNoZWNrb3V0QnV0dG9uQ2xpY2tlZCA9IChlKSA9PiB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGNvbnN0IHByb2R1Y3RFbGVtZW50cyA9IEFycmF5LmZyb20oXG4gIC8vICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXByb2R1Y3QtdmFyaWFudC1pZF0nKVxuICAvLyAgICk7XG4gIC8vICAgaWYgKHByb2R1Y3RFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gIC8vICAgICBheGlvc1xuICAvLyAgICAgICAucG9zdCgnL2NhcnQvYWRkJywge1xuICAvLyAgICAgICAgIGl0ZW1zOiBwcm9kdWN0RWxlbWVudHMubWFwKCgpID0+IHtcbiAgLy8gICAgICAgICAgIGNvbnN0IHZhcmlhbnRJZCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtdmFyaWFudC1pZCcpO1xuICAvLyAgICAgICAgICAgcmV0dXJuIHtcbiAgLy8gICAgICAgICAgICAgaWQ6IHZhcmlhbnRJZCxcbiAgLy8gICAgICAgICAgICAgcXVhbnRpdHk6IDEsXG4gIC8vICAgICAgICAgICB9O1xuICAvLyAgICAgICAgIH0pLFxuICAvLyAgICAgICB9KVxuICAvLyAgICAgICAudGhlbigoKSA9PiB7XG4gIC8vICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2NoZWNrb3V0JztcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgfVxuICAvLyB9O1xuXG4gIGNvbnN0IGhhbmRsZVNvcnRlckNoYW5nZWQgPSAodHlwZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCd0eXBlJywgdHlwZSk7XG4gICAgaWYgKHNvcnRCeSA9PT0gdHlwZSkge1xuICAgICAgc2V0UmV2ZXJzZSgob2xkUmV2ZXJzZSkgPT4gIW9sZFJldmVyc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRTb3J0QnkodHlwZSk7XG4gICAgICBzZXRSZXZlcnNlKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cInJvdyBwdC01XCI+XG4gICAgICAkeyFpc0xvYWRpbmcgJiYgcHJvZHVjdHMubGVuZ3RoID4gMFxuICAgICAgICA/IGh0bWxgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiB3aXNobGlzdC1ncmlkIGZsZXhcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3aXNobGlzdC1ncmlkIGZsZXhcIj5cbiAgICAgICAgICAgICAgPHRhYmxlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZSBjYXJ0LXRhYmxlIHRhYmxlLXJlc3BvbnNpdmUteHMgd2lzaGxpc3RfdGFibGUgd2lzaGxpc3QtZ3JpZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJ0YWJsZS1oZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPkltYWdlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgUHJvZHVjdCBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgPGlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbi1zaGFuZ3hpYWppYW50b3UgaWNvbmZvbnQgdGV4dC1jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPSR7KCkgPT4gaGFuZGxlU29ydGVyQ2hhbmdlZCgnbmFtZScpfVxuICAgICAgICAgICAgICAgICAgICAgID48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFByaWNlXG4gICAgICAgICAgICAgICAgICAgICAgPGlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbi1zaGFuZ3hpYWppYW50b3UgaWNvbmZvbnQgdGV4dC1jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPSR7KCkgPT4gaGFuZGxlU29ydGVyQ2hhbmdlZCgncHJpY2UnKX1cbiAgICAgICAgICAgICAgICAgICAgICA+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICBBdmFsaWJpbGl0eVxuICAgICAgICAgICAgICAgICAgICAgIDxpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImljb24tc2hhbmd4aWFqaWFudG91IGljb25mb250IHRleHQtY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz0keygpID0+IGhhbmRsZVNvcnRlckNoYW5nZWQoJ2F2YWlsYWJpbGl0eScpfVxuICAgICAgICAgICAgICAgICAgICAgID48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPkFjdGlvbjwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgJHtwcm9kdWN0c1xuICAgICAgICAgICAgICAgICAgLnNvcnQoc29ydGVyKVxuICAgICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHByb2R1Y3QpID0+XG4gICAgICAgICAgICAgICAgICAgICAgaHRtbGAke1dpc2hsaXN0SXRlbSh7IHByb2R1Y3QsIHByb2R1Y3RIYW5kbGVzIH0pfWBcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgICAkeyFpc0xvYWRpbmcgJiYgcHJvZHVjdHMubGVuZ3RoID09PSAwXG4gICAgICA/IGh0bWxgPGRpdiBjbGFzcz1cInJvdyBjYXJ0LWJ1dHRvbnMgd2lzaGxpc3QtZ3JpZC0tZW1wdHktbGlzdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiXCIgc3JjPSR7ZW1wdHlTZWFyY2hJbWFnZX0gYWx0PVwiV2lzaGxpc3QgbG9hZGluZ1wiIC8+XG4gICAgICAgICAgICAgIDxoNSBjbGFzcz1cInRpdGxlLWZvbnQgbWItMyBlbXB0eS1saXN0LS10ZXh0IFwiPlxuICAgICAgICAgICAgICAgIFlvdXIgd2lzaCBsaXN0IGlzIGN1cnJlbnRseSBlbXB0eS5cbiAgICAgICAgICAgICAgPC9oNT5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIi9jb2xsZWN0aW9ucy9CYXJiZXF1ZXNcIiBjbGFzcz1cImJ0biBidG4tc29saWRcIlxuICAgICAgICAgICAgICAgID5TdGFydCBTaG9wcGluZzwvYVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgOiBudWxsfVxuICAgICR7aXNMb2FkaW5nXG4gICAgICA/IGh0bWxgIDxkaXYgY2xhc3M9XCJ3aXNobGlzdC1sb2FkZXJcIj5cbiAgICAgICAgICA8aDUgY2xhc3M9XCJ3aXNobGlzdC1sb2FkZXItLXRleHRcIj5cbiAgICAgICAgICAgIExvYWRpbmcgeW91ciBjdXN0b21pemVkIHdpc2hsaXN0Li4uXG4gICAgICAgICAgPC9oNT5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgOiBudWxsfWA7XG59XG5cbltcbiAgQ29tcGFyZVRhYmxlLFxuICB7XG4gICAgdGFnTmFtZTogJ3dpc2hsaXN0LWNvbnRhaW5lcicsXG4gICAgcmVuZGVyZXI6IFdpc2hsaXN0Q29udGFpbmVyLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG9ic2VydmVkQXR0cmlidXRlczogWydlbXB0eS1pbWFnZScsICdlbXB0eS1zZWFyY2gtaW1hZ2UnXSxcbiAgICAgIHVzZVNoYWRvd0RPTTogZmFsc2UsXG4gICAgfSxcbiAgfSxcbl0uZm9yRWFjaCgocENvbXBvbmVudCkgPT4ge1xuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXG4gICAgcENvbXBvbmVudC50YWdOYW1lLFxuICAgIGNvbXBvbmVudChwQ29tcG9uZW50LnJlbmRlcmVyLCBwQ29tcG9uZW50Lm9wdGlvbnMpXG4gICk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJrRkFHQSxHQUFNLEdBQWUsRUFBUSxDQUFDLENBQUUsVUFBUyxvQkFDdkMsR0FBVSxJQUFNLENBQ2QsQUFBSSxNQUFPLFFBQU8sR0FBTSxZQUFjLEdBQVcsRUFBUSxJQUN2RCxRQUFPLGlCQUNMLGFBQ0EsQUFBQyxHQUFNLENBQ0wsQUFBSSxHQUFHLFFBQVEsUUFBUSxrQkFFckIsR0FBRSxpQkFDRixFQUFFLDJCQUNGLEVBQUUsb0JBR04sSUFFRixPQUFPLGlCQUNMLFdBQ0EsQUFBQyxHQUFNLENBQ0wsQUFBSSxHQUFHLFFBQVEsUUFBUSxrQkFFckIsR0FBRSxpQkFDRixFQUFFLDJCQUNGLEVBQUUsb0JBR04sSUFFRixPQUFPLGlCQUNMLFlBQ0EsQUFBQyxHQUFNLENBQ0wsQUFBSSxHQUFHLFFBQVEsUUFBUSxrQkFFckIsR0FBRSxpQkFDRixFQUFFLDJCQUNGLEVBQUUsb0JBR04sS0FHSixPQUFPLEVBQUUsaUJBQWlCLEVBQVEsTUFBTSxRQUFRLENBQzlDLEtBQU0sR0FDTixNQUFPLElBQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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
