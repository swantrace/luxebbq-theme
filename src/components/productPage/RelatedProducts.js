import { html, virtual } from '@apollo-elements/haunted';

const RelatedProducts = virtual(
  () => html`<div class="container">
    <div class="row">
      <div class="col">
        <div
          class="slick_carousel product-m slick-initialized slick-slider"
          data-slick='{"slidesToShow": 4,"slidesToScroll": 1, "autoplay": false, "autoplaySpeed": 1000, "infinite": false, "arrows": true,"dots": false, "responsive":[{"breakpoint": 1367,"settings":{"slidesToShow": 4 }},{"breakpoint": 1024,"settings":{"slidesToShow": 4 }},{"breakpoint": 767,"settings":{"slidesToShow": 2 }},{"breakpoint": 577,"settings":{"slidesToShow": 1 }} ]}'
        >
          <button
            class="slick-prev slick-arrow"
            aria-label="Previous"
            type="button"
            aria-disabled="false"
            style="display: block;"
          >
            Previous
          </button>
          <div class="slick-list draggable">
            <div
              class="slick-track"
              style="opacity: 1; width: 6174px; transform: translate3d(-4802px, 0px, 0px);"
            >
              <div
                class="slick-slide"
                data-slick-index="0"
                aria-hidden="true"
                style="width: 343px;"
                tabindex="-1"
              >
                <div>
                  <div
                    class="product-box qurox-feature-product p-md-3 mt-2"
                    data-pro-id="6626835038365"
                    style="width: 100%; display: inline-block;"
                  >
                    <div class="img-block">
                      <div class="img-effect">
                        <div class="lable-wrapper"></div>
                        <div class="front">
                          <a
                            href="/collections/new-arrival/products/broil-baron-420-pro"
                            tabindex="-1"
                          >
                            <img
                              src="//cdn.shopify.com/s/files/1/0549/1346/6525/products/BK_Baron-420_Front_01_340x555.jpg?v=1617255155"
                              class="blur-up  img-fluid lazyloaded"
                              alt="Broil King Baron 420 Pro"
                            />
                          </a>
                        </div>
                      </div>

                      <div class="cart-info">
                        <form
                          method="post"
                          enctype="multipart/form-data"
                          action="/cart/add"
                          class="product_grid_cart_form d-inline-block"
                          id="product_grid_id_39555688890525"
                        >
                          <input
                            type="hidden"
                            name="id"
                            value="39555688890525"
                            tabindex="-1"
                          />
                          <button
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            class="add_to_cart_btn_cls fly_addtocart"
                            data-original-title="Add to cart"
                            tabindex="-1"
                          >
                            <i class="ti-shopping-cart"></i>
                          </button>
                        </form>

                        <a
                          class="action--wishlist tile-actions--btn flex wishlist-btn"
                          href="javascript:void(0)"
                          data-product-handle="broil-baron-420-pro"
                          tabindex="-1"
                        >
                          <i class="ti-heart btn--main" aria-hidden="true"></i>
                        </a>

                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-pid="broil-baron-420-pro"
                          title=""
                          class="compare"
                          data-original-title="Compare"
                          tabindex="-1"
                          ><i class="ti-reload" aria-hidden="true"></i
                        ></a>
                      </div>
                    </div>
                    <div class="product-detail">
                      <a
                        href="/collections/new-arrival/products/broil-baron-420-pro"
                        tabindex="-1"
                      >
                        <h6 itemprop="name">Broil King Baron 420 Pro</h6>
                      </a>

                      <h4 data-id="6626835038365" data-price="84999">
                        $849.99
                      </h4>
                    </div>

                    <span id="pro_tags" style="display:none;"
                      >Brand_Broil King,dtm_cook-type_Gas
                      Grill,dtm_stand-type_Free Standing,Type_Free
                      Standing,Type_Gas Grills</span
                    >

                    <div class="hide">261875499165</div>

                    <script></script>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="slick-next slick-arrow slick-disabled"
            aria-label="Next"
            type="button"
            style="display: block;"
            aria-disabled="true"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>`
);

export default RelatedProducts;
