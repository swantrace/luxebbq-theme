import { html, useEffect, useReducer } from '@apollo-elements/haunted';
import {
  DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE,
  DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE,
  getSortValueFromDefaultSortBy,
  queryAllProducts,
} from '../helpers';
import { pageWrapper as perfectGrillWrapper } from '../context';
import TitleBanner from '../components/common/TitleBanner';

function PerfectGrill({
  cookTypesAndBrands,
  cookTypeLogos,
  priceRangeMinAndMax,
  grillCookingAreaMinAndMax,
  defaultSortBy,
  emptyCollectionImage,
}) {
  // console.log('cookTypeLogos', cookTypeLogos);
  const perfectGrillReducer = (previousState, action) => {
    switch (action.type) {
      case 'setAllProducts': {
        return {
          ...previousState,
          allProducts: action.payload,
          searchString: '',
          pageNumber: 1,
        };
      }
      case 'changeCookTypesAndBrands': {
        return {
          ...previousState,
          selectedCookTypesAndBrands: action.payload,
          pageNumber: 1,
        };
      }
      case 'changePriceRange': {
        return {
          ...previousState,
          currentPriceRange: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeGrillCookingAreaRange': {
        return {
          ...previousState,
          currentGrillCookingAreaRange: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeSortValue': {
        return {
          ...previousState,
          sortValue: action.payload,
          pageNumber: 1,
        };
      }
      case 'changeProductsPerPage': {
        return {
          ...previousState,
          productsPerPage: action.payload,
          pageNumber: 1,
        };
      }
      case 'changePageNumber': {
        return {
          ...previousState,
          pageNumber: action.payload,
        };
      }
      case 'changeViewMode': {
        return {
          ...previousState,
          viewMode: action.payload,
        };
      }
      case 'changeAvailability': {
        return {
          ...previousState,
          availability: action.payload,
        };
      }
      case 'changeSideBurner': {
        return {
          ...previousState,
          sideBurner: action.payload,
        };
      }
      case 'changeSearBurner': {
        return {
          ...previousState,
          searBurner: action.payload,
        };
      }
      case 'changeRearRotisserie': {
        return {
          ...previousState,
          rearRotisserie: action.payload,
        };
      }
      case 'changeGrillType': {
        return {
          ...previousState,
          grillType: action.payload,
        };
      }
      case 'changeOnlineStoreOnly': {
        return {
          ...previousState,
          onlineStoreOnly: action.payload,
        };
      }
      default:
        return { ...previousState };
    }
  };
  const [state, dispatch] = useReducer(perfectGrillReducer, {
    allProducts: [],
    availability: [],
    selectedCookTypesAndBrands: {},
    currentPriceRange: DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE,
    currentGrillCookingAreaRange: DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE,
    productsPerPage: 24,
    pageNumber: 1,
    viewMode: 'grid',
    sideBurner: false,
    searBurner: false,
    rearRotisserie: false,
    grillType: [],
    sortValue: 'BEST_SELLING_ASC',
    onlineStoreOnly: false,
  });

  useEffect(async () => {
    const products = await queryAllProducts({
      productTypes: ['Barbeques'],
    });
    dispatch({ type: 'setAllProducts', payload: products });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'changeSortValue',
      payload: getSortValueFromDefaultSortBy(defaultSortBy),
    });
  }, [defaultSortBy]);
  useEffect(() => {
    dispatch({
      type: 'changePriceRange',
      payload: JSON.parse(
        priceRangeMinAndMax ??
          `[${DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE.join(',')}]`
      ).map((p) => Math.floor(Number(p))),
    });
  }, [priceRangeMinAndMax]);
  useEffect(() => {
    dispatch({
      type: 'changeGrillCookingAreaRange',
      payload: JSON.parse(
        grillCookingAreaMinAndMax ??
          `[${DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE.join(',')}]`
      ).map((p) => Math.floor(Number(p))),
    });
  }, [grillCookingAreaMinAndMax]);

  return html`${perfectGrillWrapper({
    children: html`<section class="section-b-space">
      <div class="collection-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 perfect-grill-selectors-wrapper">
              ${TitleBanner({ title: "WHAT'S YOUR PERFECT GRILL?" })}
              <perfect-grill-selectors></perfect-grill-selectors>
            </div>
          </div>
          <div class="row">
            <div
              class="col-lg-8 offset-lg-2 perfect-grill-product-list-wrapper"
            >
              ${TitleBanner({ title: 'MATCHING GRILLS' })}
              <perfect-grill-top-controllers></perfect-grill-top-controllers>
              <perfect-grill-product-list></perfect-grill-product-list>
              <perfect-grill-pagination></perfect-grill-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    brandInfo: JSON.parse(
      cookTypesAndBrands ??
        '{"Gas Grill":[], "Charcoal Grill":[], "Smokers":[], "Pellet Grill":[], "Oven":[]}'
    ),
    cookTypeLogos: JSON.parse(
      cookTypeLogos ??
        '{"Gas Grill":"", "Charcoal Grill":"", "Smokers":"", "Pellet Grill":"", "Oven":""}'
    ),
    priceRangeMinAndMax: JSON.parse(
      priceRangeMinAndMax ??
        `[${DEFAULT_BARBEQUES_COLLECTION_PRICE_RANGE.join(',')}]`
    ).map((p) => Math.floor(Number(p))),
    grillCookingAreaMinAndMax: JSON.parse(
      grillCookingAreaMinAndMax ??
        `[${DEFAULT_BARBEQUES_COLLECTION_GRILL_COOKING_AREA_RANGE.join(',')}]`
    ).map((p) => Math.floor(Number(p))),
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
