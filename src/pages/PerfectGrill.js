import { html, useEffect } from '@apollo-elements/haunted';
import slugify from 'slugify';

import { pageWrapper as perfectGrillWrapper } from '../context';
import TitleBanner from '../components/common/TitleBanner';
import useProductType from '../productTypes';

function PerfectGrill({
  cookTypesAndBrands,
  cookTypeLogos,
  priceRangeMinAndMax,
  grillCookingAreaMinAndMax,
  defaultSortBy,
  emptyCollectionImage,
}) {
  const {
    state,
    dispatch,
    queryAllProducts,
    queryFirstPageProducts,
    getFilteredSortedProducts,
    getFilteredSortedProductsOfCurrentPage,
    getPageCount,
    getDisplayedPageNumbers,
  } = new (useProductType(slugify('Barbeques', { lower: true })))({
    defaultSortBy,
    initiaValueFilterKeyPairs: {},
  });

  useEffect(async () => {
    const products = await queryAllProducts();
    console.log('products from queryAllProducts', products);
    dispatch({ type: 'setAllProducts', payload: products });
    dispatch({ type: 'setFetchIsFinished', payload: true });
  }, []);

  console.log('state', state);

  return html`${perfectGrillWrapper({
    children: html`<section class="section-b-space pt-0">
      <div class="collection-wrapper">
        <div class="container dtm">
          <div class="row">
            <div
              class="col-lg-10 mx-auto perfect-grill-selectors-wrapper pt-5 px-md-5 pb-md-5"
            >
              ${TitleBanner({ title: "WHAT'S YOUR PERFECT GRILL?" })}
              <perfect-grill-selectors></perfect-grill-selectors>
            </div>
          </div>
          <div class="row pt-5">
            <div
              class="col-lg-10 mx-auto perfect-grill-product-list-wrapper pt-md-5"
            >
              <product-type-main-content></product-type-main-content>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    brandInfo: JSON.parse(
      cookTypesAndBrands ??
        '[["Gas Grill",[]], ["Charcoal Grill",[]], ["Offset Smoker",[]], ["Pellet Grill",[]], ["Pizza Oven",[]]}'
    ),
    cookTypeLogos: JSON.parse(
      cookTypeLogos ??
        '{"Gas Grill":"", "Charcoal Grill":"", "Smokers":"", "Pellet Grill":"", "Oven":""}'
    ),
    currentPriceRange: JSON.parse(priceRangeMinAndMax),
    currentGrillCookingAreaRange: JSON.parse(grillCookingAreaMinAndMax),
    collectionTitle: 'Matching Grills',
    queryFirstPageProducts,
    getFilteredSortedProducts,
    getFilteredSortedProductsOfCurrentPage,
    getPageCount,
    getDisplayedPageNumbers,
    state,
    dispatch,
    emptyCollectionImage,
  })}`;
}

export default {
  tagName: 'perfect-grill',
  renderer: PerfectGrill,
  options: {
    observedAttributes: [
      'cook-types-and-brands',
      'cook-type-logos',
      'price-range-min-and-max',
      'grill-cooking-area-min-and-max',
      'default-sort-by',
      'empty-collection-image',
    ],
    useShadowDOM: false,
  },
};
